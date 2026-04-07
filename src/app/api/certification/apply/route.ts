import { supabase } from '@/lib/supabase';
import {
  evaluateCertification,
  generateCertificateNumber,
  type SelfAssessmentSection,
} from '@/lib/certification-engine';
import { generateCertificatePdf } from '@/lib/certificate-generator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      contactEmail,
      website,
      state,
      yearsOperating,
      documentTypesSupported,
      monthlyActiveUsers,
      selfAssessment,
      evidenceUrls,
      paymentToken,
    } = body;

    // Validate required fields
    if (!companyName || !contactName || !contactEmail || !website || !selfAssessment) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Process payment ($2,500 certification fee)
    const nmiSecurityKey = process.env.NMI_SECURITY_KEY;
    let paymentId: string | null = null;

    if (nmiSecurityKey && paymentToken) {
      const nmiParams = new URLSearchParams({
        security_key: nmiSecurityKey,
        type: 'sale',
        amount: '2500.00',
        payment_token: paymentToken,
        first_name: contactName.split(' ')[0] || contactName,
        last_name: contactName.split(' ').slice(1).join(' ') || '',
        email: contactEmail,
        order_description: 'UEDRA EDRS-1.0 Certification Application Fee',
      });

      const nmiResponse = await fetch('https://secure.nmi.com/api/transact.php', {
        method: 'POST',
        body: nmiParams,
      });

      const nmiText = await nmiResponse.text();
      const nmiResult = Object.fromEntries(new URLSearchParams(nmiText));

      if (nmiResult.response !== '1') {
        return Response.json(
          { error: `Payment failed: ${nmiResult.responsetext || 'Unknown error'}` },
          { status: 402 },
        );
      }

      paymentId = nmiResult.transactionid || null;
    }

    // Evaluate the self-assessment
    const sections = selfAssessment as SelfAssessmentSection[];
    const evaluation = evaluateCertification(sections);

    // Generate certificate number
    const certificateNumber = evaluation.status === 'approved'
      ? generateCertificateNumber()
      : null;

    // Generate certificate PDF if approved
    let certificateUrl: string | null = null;
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    if (evaluation.status === 'approved' && certificateNumber) {
      const pdfBuffer = await generateCertificatePdf({
        companyName,
        certificateNumber,
        certifiedDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        expiryDate: expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        score: evaluation.score,
        percentage: evaluation.percentage,
      });

      // Upload to Supabase Storage
      const fileName = `certificates/${certificateNumber}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from('uedra-certificates')
        .upload(fileName, pdfBuffer, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('uedra-certificates')
          .getPublicUrl(fileName);
        certificateUrl = urlData.publicUrl;
      }
    }

    // Save application
    const { data: application, error: insertError } = await supabase
      .from('certification_applications')
      .insert({
        company_name: companyName,
        contact_name: contactName,
        contact_email: contactEmail,
        website,
        state: state || null,
        years_operating: yearsOperating || 0,
        document_types_supported: documentTypesSupported || [],
        monthly_active_users: monthlyActiveUsers || 0,
        self_assessment: selfAssessment,
        score: evaluation.score,
        max_score: evaluation.maxScore,
        percentage: evaluation.percentage,
        status: evaluation.status === 'approved' ? 'approved' : evaluation.status === 'review' ? 'reviewing' : 'denied',
        mandatory_passed: evaluation.mandatoryPassed,
        failed_items: evaluation.failedItems,
        recommendations: evaluation.recommendations,
        evidence_urls: evidenceUrls || [],
        payment_id: paymentId,
        certificate_number: certificateNumber,
        certificate_url: certificateUrl,
        certified_at: evaluation.status === 'approved' ? now.toISOString() : null,
        expires_at: evaluation.status === 'approved' ? expiryDate.toISOString() : null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to save application:', insertError);
      return Response.json(
        { error: 'Failed to save application' },
        { status: 500 },
      );
    }

    // If approved, add to certified providers
    if (evaluation.status === 'approved' && application) {
      await supabase.from('certified_providers').insert({
        application_id: application.id,
        company_name: companyName,
        website,
        certified_date: now.toISOString(),
        expiry_date: expiryDate.toISOString(),
        certificate_url: certificateUrl,
        is_active: true,
      });
    }

    // Send email notification
    if (process.env.RESEND_API_KEY && contactEmail) {
      const statusMessage = evaluation.status === 'approved'
        ? `Congratulations! ${companyName} has been certified as EDRS-1.0 compliant with a score of ${evaluation.percentage}%. Your certificate number is ${certificateNumber}.`
        : evaluation.status === 'review'
          ? `Your application for ${companyName} is under review by the UEDRA Standards Council. We'll notify you within 5 business days.`
          : `Unfortunately, ${companyName} did not meet the minimum requirements for EDRS-1.0 certification at this time. Score: ${evaluation.percentage}%. ${evaluation.recommendations.join(' ')}`;

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'UEDRA Certification <certification@uedra.org>',
            to: [contactEmail],
            subject: `UEDRA Certification ${evaluation.status === 'approved' ? 'Approved' : evaluation.status === 'review' ? 'Under Review' : 'Update'} — ${companyName}`,
            text: statusMessage,
          }),
        });
      } catch {
        // Don't fail — application was saved
      }
    }

    return Response.json({
      success: true,
      data: {
        applicationId: application?.id,
        status: evaluation.status,
        score: evaluation.score,
        maxScore: evaluation.maxScore,
        percentage: evaluation.percentage,
        mandatoryPassed: evaluation.mandatoryPassed,
        failedItems: evaluation.failedItems,
        recommendations: evaluation.recommendations,
        certificateNumber,
        certificateUrl,
      },
    });
  } catch (err) {
    console.error('Certification application error:', err);
    return Response.json(
      { error: 'Invalid request' },
      { status: 400 },
    );
  }
}
