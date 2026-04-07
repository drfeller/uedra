import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import QRCode from 'qrcode';

export interface CertificateData {
  companyName: string;
  certificateNumber: string;
  certifiedDate: string;
  expiryDate: string;
  score: number;
  percentage: number;
}

/**
 * Generate a professional EDRS-1.0 Certification PDF.
 */
export async function generateCertificatePdf(
  data: CertificateData,
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([792, 612]); // Landscape letter

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const navy = rgb(15 / 255, 43 / 255, 91 / 255);
  const gold = rgb(184 / 255, 134 / 255, 11 / 255);
  const darkGray = rgb(0.3, 0.3, 0.3);
  const lightGold = rgb(0.95, 0.92, 0.85);

  const pageWidth = 792;
  const pageHeight = 612;
  const centerX = pageWidth / 2;

  // Background border
  page.drawRectangle({
    x: 20,
    y: 20,
    width: pageWidth - 40,
    height: pageHeight - 40,
    borderColor: gold,
    borderWidth: 3,
    color: rgb(1, 1, 1),
  });

  // Inner border
  page.drawRectangle({
    x: 30,
    y: 30,
    width: pageWidth - 60,
    height: pageHeight - 60,
    borderColor: navy,
    borderWidth: 1,
  });

  // Header
  let y = pageHeight - 80;
  const uedraText = 'UEDRA';
  const uedraWidth = helveticaBold.widthOfTextAtSize(uedraText, 32);
  page.drawText(uedraText, {
    x: centerX - uedraWidth / 2,
    y,
    size: 32,
    font: helveticaBold,
    color: navy,
  });
  y -= 20;

  const subText = 'Universal Estate Document Registry Association';
  const subWidth = helvetica.widthOfTextAtSize(subText, 11);
  page.drawText(subText, {
    x: centerX - subWidth / 2,
    y,
    size: 11,
    font: helvetica,
    color: darkGray,
  });
  y -= 40;

  // Certificate title
  const certTitle = 'Certificate of Compliance';
  const certWidth = timesRomanBold.widthOfTextAtSize(certTitle, 28);
  page.drawText(certTitle, {
    x: centerX - certWidth / 2,
    y,
    size: 28,
    font: timesRomanBold,
    color: gold,
  });
  y -= 22;

  const standardText = 'EDRS Standard Version 1.0';
  const stdWidth = timesRoman.widthOfTextAtSize(standardText, 14);
  page.drawText(standardText, {
    x: centerX - stdWidth / 2,
    y,
    size: 14,
    font: timesRoman,
    color: navy,
  });
  y -= 40;

  // Divider
  page.drawLine({
    start: { x: 100, y },
    end: { x: pageWidth - 100, y },
    thickness: 1,
    color: gold,
  });
  y -= 30;

  // "This certifies that"
  const certifiesText = 'This certifies that';
  const certifiesWidth = timesRoman.widthOfTextAtSize(certifiesText, 13);
  page.drawText(certifiesText, {
    x: centerX - certifiesWidth / 2,
    y,
    size: 13,
    font: timesRoman,
    color: darkGray,
  });
  y -= 32;

  // Company name
  const nameWidth = timesRomanBold.widthOfTextAtSize(data.companyName, 26);
  page.drawText(data.companyName, {
    x: centerX - nameWidth / 2,
    y,
    size: 26,
    font: timesRomanBold,
    color: navy,
  });
  y -= 30;

  // Compliance statement
  const complianceText = `has demonstrated compliance with the Estate Document Registry Standard (EDRS) v1.0`;
  const compWidth = timesRoman.widthOfTextAtSize(complianceText, 12);
  page.drawText(complianceText, {
    x: centerX - compWidth / 2,
    y,
    size: 12,
    font: timesRoman,
    color: darkGray,
  });
  y -= 16;

  const scoreText = `achieving a compliance score of ${data.percentage}%.`;
  const scoreWidth = timesRoman.widthOfTextAtSize(scoreText, 12);
  page.drawText(scoreText, {
    x: centerX - scoreWidth / 2,
    y,
    size: 12,
    font: timesRoman,
    color: darkGray,
  });
  y -= 40;

  // Dates
  const dateText = `Certified: ${data.certifiedDate}    |    Expires: ${data.expiryDate}    |    Certificate: ${data.certificateNumber}`;
  const dateWidth = helvetica.widthOfTextAtSize(dateText, 9);
  page.drawText(dateText, {
    x: centerX - dateWidth / 2,
    y,
    size: 9,
    font: helvetica,
    color: darkGray,
  });
  y -= 30;

  // QR Code
  try {
    const verifyUrl = `https://uedra.org/certification/verify/${data.certificateNumber}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 80, margin: 1 });
    const qrBase64 = qrDataUrl.split(',')[1];
    const qrBytes = Buffer.from(qrBase64, 'base64');
    const qrImage = await pdfDoc.embedPng(qrBytes);
    page.drawImage(qrImage, {
      x: centerX - 35,
      y: y - 70,
      width: 70,
      height: 70,
    });
    y -= 80;

    const verifyText = 'Scan to verify';
    const verifyWidth = helvetica.widthOfTextAtSize(verifyText, 8);
    page.drawText(verifyText, {
      x: centerX - verifyWidth / 2,
      y,
      size: 8,
      font: helvetica,
      color: darkGray,
    });
  } catch {
    // QR generation failed, skip it
  }

  // Footer hash
  const pdfBytes = await pdfDoc.save();
  const buffer = Buffer.from(pdfBytes);

  return buffer;
}
