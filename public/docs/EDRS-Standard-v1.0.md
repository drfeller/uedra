# EDRS-1.0

## Estate Document Registry Standard

**Version 1.0**

Published by the **Estate Document Registry Standards Council**

**Publication Date:** March 2026

**Status:** Approved Standard

**Document Identifier:** EDRS-1.0-2026

---

**Copyright (c) 2026 Estate Document Registry Standards Council.**

Permission is granted to reproduce this document for the purpose of implementing the standard. All other rights reserved. No part of this publication may be modified, adapted, or used to create derivative works without written permission from the Estate Document Registry Standards Council.

---

## Notice

This document defines the Estate Document Registry Standard (EDRS), Version 1.0. The requirements herein establish minimum technical, security, and operational criteria for digital estate document registries operating within the United States. Compliance with this standard is voluntary unless mandated by applicable law or regulation.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 (BCP 14) and RFC 8174.

---

## Table of Contents

1. [Scope and Purpose](#1-scope-and-purpose)
2. [Normative References](#2-normative-references)
3. [Definitions and Terminology](#3-definitions-and-terminology)
4. [Section 1: Identity Verification Requirements](#4-section-1-identity-verification-requirements)
5. [Section 2: Document Registration Requirements](#5-section-2-document-registration-requirements)
6. [Section 3: Encryption and Data Security](#6-section-3-encryption-and-data-security)
7. [Section 4: Blockchain Verification](#7-section-4-blockchain-verification)
8. [Section 5: Attorney Attestation](#8-section-5-attorney-attestation)
9. [Section 6: Access Control and Release Protocols](#9-section-6-access-control-and-release-protocols)
10. [Section 7: Institutional Verification API](#10-section-7-institutional-verification-api)
11. [Section 8: Audit Trail Requirements](#11-section-8-audit-trail-requirements)
12. [Section 9: Physical Vault Integration](#12-section-9-physical-vault-integration)
13. [Section 10: Consumer Protections](#13-section-10-consumer-protections)
14. [Section 11: Interstate Recognition](#14-section-11-interstate-recognition)
15. [Section 12: Compliance and Certification](#15-section-12-compliance-and-certification)
16. [Annex A: Document Type Taxonomy](#annex-a-document-type-taxonomy)
17. [Annex B: API Schema Summary](#annex-b-api-schema-summary)
18. [Annex C: Self-Assessment Checklist](#annex-c-self-assessment-checklist)

---

## 1. Scope and Purpose

### 1.1 Scope

This standard specifies the minimum technical, security, and operational requirements for digital platforms that register, store, verify, and release estate planning documents. It applies to any organization, platform, or service (hereinafter "Registry Provider") that offers estate document registration services to individuals, attorneys, or institutions within the United States.

This standard addresses:

- Identity verification of registrants and authorized parties
- Secure registration and storage of estate documents
- Cryptographic integrity verification using blockchain technology
- Attorney attestation and professional verification
- Conditional access control and release protocols
- Institutional verification interfaces
- Audit trail and record-keeping requirements
- Physical vault integration for hybrid storage models
- Consumer protection obligations
- Interstate portability and recognition

This standard does not address the legal validity of underlying estate documents, which remains governed by applicable state and federal law. Compliance with this standard does not constitute legal advice and does not guarantee the enforceability of any registered document.

### 1.2 Purpose

The estate planning industry lacks a uniform technical standard for the digital registration, verification, and release of estate documents. As a result:

- There is no interoperable mechanism for verifying the existence, authenticity, or version currency of an individual's estate documents across institutions or jurisdictions.
- Healthcare providers, financial institutions, and courts have no standardized method for confirming that a document presented to them is the most current, properly executed version.
- Consumers have no assurance that digital estate document platforms meet minimum security, privacy, or operational standards.
- Proposed legislation such as the Uniform Estate Document Registry Act (UEDRA) requires a technical foundation upon which registry requirements can be built.

The purpose of this standard is to:

1. Define a minimum technical baseline that ensures security, integrity, and interoperability for estate document registries.
2. Enable consumers to identify registry providers that meet established quality and security criteria.
3. Provide legislators and regulators with a referenceable technical standard for statutory and regulatory frameworks.
4. Facilitate institutional adoption by providing predictable, well-documented interfaces for document verification.
5. Establish a certification framework that allows registry providers to demonstrate compliance.

### 1.3 Conformance

A Registry Provider claiming conformance with this standard MUST implement all requirements designated with the keywords "MUST", "REQUIRED", or "SHALL." Requirements designated with "SHOULD" or "RECOMMENDED" are strongly encouraged and their omission MUST be documented in the provider's compliance statement. Requirements designated with "MAY" or "OPTIONAL" are at the provider's discretion.

Partial conformance is not recognized. A provider either conforms to EDRS-1.0 in its entirety (excluding optional sections explicitly marked as such) or does not conform.

---

## 2. Normative References

The following referenced documents are indispensable for the application of this standard. For dated references, only the edition cited applies. For undated references, the latest edition of the referenced document applies.

| Reference | Title | Publisher |
|-----------|-------|-----------|
| NIST SP 800-63-3 | Digital Identity Guidelines | National Institute of Standards and Technology |
| NIST SP 800-63A | Enrollment and Identity Proofing | National Institute of Standards and Technology |
| NIST SP 800-63B | Authentication and Lifecycle Management | National Institute of Standards and Technology |
| NIST SP 800-88 Rev. 1 | Guidelines for Media Sanitization | National Institute of Standards and Technology |
| NIST SP 800-57 Part 1 | Recommendation for Key Management | National Institute of Standards and Technology |
| FIPS 197 | Advanced Encryption Standard (AES) | National Institute of Standards and Technology |
| FIPS 180-4 | Secure Hash Standard (SHS) | National Institute of Standards and Technology |
| RFC 2119 | Key Words for Use in RFCs | Internet Engineering Task Force |
| RFC 8174 | Ambiguity of Uppercase vs Lowercase in RFC 2119 | Internet Engineering Task Force |
| RFC 8446 | The Transport Layer Security (TLS) Protocol Version 1.3 | Internet Engineering Task Force |
| RFC 6749 | The OAuth 2.0 Authorization Framework | Internet Engineering Task Force |
| RFC 7519 | JSON Web Token (JWT) | Internet Engineering Task Force |
| RFC 5280 | Internet X.509 PKI Certificate and CRL Profile | Internet Engineering Task Force |
| RFC 3161 | Internet X.509 PKI Time-Stamp Protocol (TSP) | Internet Engineering Task Force |
| SOC 2 Type II | Trust Services Criteria | American Institute of Certified Public Accountants |
| HL7 FHIR R4 | Fast Healthcare Interoperability Resources | Health Level Seven International |
| EIP-155 | Simple Replay Attack Protection | Ethereum Improvement Proposals |
| ERC-721 | Non-Fungible Token Standard | Ethereum Request for Comments |
| ISO 27001:2022 | Information Security Management Systems | International Organization for Standardization |
| ISO 19005-3 | Document Management -- PDF/A-3 | International Organization for Standardization |

---

## 3. Definitions and Terminology

For the purposes of this standard, the following definitions apply:

**3.1 Registry**
A digital platform or system that registers, stores, verifies, and manages the release of estate planning documents on behalf of registrants.

**3.2 Registry Provider**
The organization, entity, or service that operates a Registry and offers registration services to registrants.

**3.3 Registered Document**
An estate planning document that has been submitted to and accepted by a Registry, and for which the Registry maintains a cryptographic hash, metadata record, and version history.

**3.4 Registrant**
A natural person who submits one or more estate planning documents to a Registry for registration. The Registrant is typically the principal, testator, or grantor identified in the document.

**3.5 Authorized Recipient**
A natural person, legal entity, or institution designated by the Registrant to receive access to one or more Registered Documents under specified conditions.

**3.6 Release Trigger**
A predefined condition or event that, when verified, causes the Registry to release one or more Registered Documents to designated Authorized Recipients. Examples include verified death, certified incapacity, medical emergency, or court order.

**3.7 Verification Query**
A request submitted to the Registry by an institution, attorney, or other authorized party to confirm the existence, authenticity, version status, or content of a Registered Document.

**3.8 Authority Chain**
The ordered record of all parties who have exercised authority over a Registered Document, including the Registrant, attesting attorneys, successor agents, and institutional verifiers.

**3.9 Attestation**
A digitally signed assertion by a qualified professional (typically a licensed attorney) regarding the identity of the Registrant, the capacity of the Registrant, the authenticity of a document, or the authoritative status of a document version.

**3.10 Authoritative Document**
A Registered Document that has been designated by the Registrant (or by an attesting attorney on behalf of the Registrant) as the current, governing version of a particular document type. Only one document of each type MAY be designated as Authoritative at any time.

**3.11 Document Hash**
A SHA-256 cryptographic hash computed over the binary content of a Registered Document, used to verify that the document has not been altered since registration.

**3.12 Metadata Hash**
A SHA-256 cryptographic hash computed over the structured metadata record associated with a Registered Document, including document type, execution date, registrant identity, and governance state.

**3.13 Blockchain Anchor**
A transaction recorded on a public blockchain that contains the Document Hash, Metadata Hash, timestamp, and version number of a Registered Document, providing independently verifiable proof of registration.

**3.14 Hardware Security Module (HSM)**
A dedicated cryptographic processor that manages digital keys and performs encryption and decryption operations within a tamper-resistant physical device.

**3.15 Identity Assurance Level (IAL)**
The degree of confidence in the identity proofing process, as defined by NIST SP 800-63A. This standard requires IAL2 or higher.

**3.16 Liveness Detection**
A biometric verification technique that determines whether the source of a biometric sample is a live human being, as opposed to a photograph, video, mask, or other spoofing artifact.

**3.17 Immutable Record**
A data record that, once written, cannot be modified, overwritten, or deleted by any party, including the Registry Provider.

**3.18 mTLS (Mutual Transport Layer Security)**
A security protocol in which both the client and server authenticate each other using digital certificates before establishing an encrypted connection.

**3.19 PKI (Public Key Infrastructure)**
A framework of policies, hardware, software, and procedures for creating, managing, distributing, using, storing, and revoking digital certificates and managing public-key encryption.

---

## 4. Section 1: Identity Verification Requirements

### 4.1 General Requirements

4.1.1 The Registry Provider MUST verify the identity of every Registrant prior to accepting any document for registration.

4.1.2 The identity verification process MUST meet or exceed Identity Assurance Level 2 (IAL2) as defined in NIST SP 800-63A.

4.1.3 Identity verification MUST be completed for each natural person who is a Registrant. The Registry Provider MUST NOT accept documents from unverified parties.

4.1.4 The Registry Provider MUST retain evidence of identity verification for the duration of the registration plus seven (7) years following the termination of the registration or the verified death of the Registrant, whichever is later.

### 4.2 Government-Issued Identification

4.2.1 The Registry Provider MUST verify the Registrant's identity using at least one government-issued photo identification document. Acceptable documents include:

- United States passport or passport card
- State-issued driver's license
- State-issued identification card
- United States military identification card
- Permanent Resident Card (Form I-551)

4.2.2 The Registry Provider MUST validate the authenticity of the presented identification document using automated document verification technology that examines security features, formatting, and encoding.

4.2.3 The Registry Provider SHOULD cross-reference presented identification against authoritative databases, including but not limited to:

- American Association of Motor Vehicle Administrators (AAMVA) database
- State Department of Motor Vehicles (DMV) records
- Social Security Administration (SSA) records (where authorized)

4.2.4 If cross-referencing is not available for a given document type, the Registry Provider MUST apply compensating controls, such as requiring a second form of identification or additional knowledge-based verification.

### 4.3 Liveness Detection

4.3.1 The Registry Provider MUST perform liveness detection as part of the identity verification process to confirm that the Registrant is a live human being and that the identification document belongs to the person presenting it.

4.3.2 Liveness detection MUST employ anti-spoofing measures capable of detecting at a minimum:

- Printed photographs presented to the camera
- Digital screen replay attacks
- Pre-recorded video presentations
- Three-dimensional masks or models

4.3.3 The liveness detection mechanism SHOULD be certified by an independent testing laboratory against ISO 30107-3 (Biometric Presentation Attack Detection) at Level 1 or higher.

4.3.4 Liveness detection results MUST be recorded in the audit trail, including the method used and the confidence score.

### 4.4 Biometric Verification

4.4.1 The Registry Provider SHOULD support biometric verification as an additional or alternative authentication factor for ongoing access.

4.4.2 If biometric verification is implemented, the Registry Provider MUST comply with applicable state biometric privacy laws, including but not limited to the Illinois Biometric Information Privacy Act (BIPA) and comparable state statutes.

4.4.3 Biometric templates MUST be stored using irreversible transformations (e.g., secure hash or cancelable biometrics). Raw biometric data (e.g., facial images used for verification) MUST be deleted within 24 hours of successful verification unless the Registrant provides explicit written consent for retention.

### 4.5 Ongoing Authentication

4.5.1 The Registry Provider MUST implement multi-factor authentication (MFA) for all Registrant accounts, meeting or exceeding Authenticator Assurance Level 2 (AAL2) as defined in NIST SP 800-63B.

4.5.2 Accepted second factors MUST include at least two of the following:

- FIDO2/WebAuthn hardware tokens
- Time-based one-time passwords (TOTP)
- Push-based authentication via registered mobile device
- Biometric verification (as described in 4.4)

4.5.3 The Registry Provider MUST NOT support SMS-only as a second authentication factor due to known vulnerabilities in the SS7 protocol.

---

## 5. Section 2: Document Registration Requirements

### 5.1 Cryptographic Integrity

5.1.1 Upon accepting a document for registration, the Registry Provider MUST compute a SHA-256 cryptographic hash (as defined in FIPS 180-4) over the complete binary content of the document.

5.1.2 The computed Document Hash MUST be recorded as part of the document's registration record and MUST be immutable once recorded.

5.1.3 The Registry Provider MUST compute a separate Metadata Hash over the structured metadata associated with the document (see 5.3).

5.1.4 Both hashes MUST be stored independently of the document content and MUST be available for verification without requiring access to the document itself.

### 5.2 Version History

5.2.1 The Registry Provider MUST maintain a complete, immutable version history for every Registered Document.

5.2.2 Each version record MUST contain:

- Version number (monotonically increasing integer)
- Document Hash
- Metadata Hash
- Timestamp of registration (UTC, ISO 8601 format)
- Registrant identity reference
- Reason for new version (initial registration, amendment, restatement, revocation)
- Blockchain Anchor reference (see Section 7)

5.2.3 Previous versions of a document MUST NOT be deleted or overwritten. Version history MUST be append-only.

5.2.4 The Registry Provider MUST clearly identify the current (most recent) version of each document and MUST provide mechanisms for Authorized Recipients to determine whether a document they possess is the current version.

### 5.3 Document Metadata

5.3.1 For each Registered Document, the Registry Provider MUST record and maintain the following metadata:

| Field | Description | Required |
|-------|-------------|----------|
| `document_id` | Unique identifier assigned by the Registry | REQUIRED |
| `document_type` | Classification per the Document Type Taxonomy (Annex A) | REQUIRED |
| `registrant_id` | Reference to the verified Registrant | REQUIRED |
| `execution_date` | Date the document was executed by the Registrant | REQUIRED |
| `registration_date` | Date and time the document was registered (UTC) | REQUIRED |
| `state_of_governance` | U.S. state whose law governs the document | REQUIRED |
| `document_hash` | SHA-256 hash of document content | REQUIRED |
| `version_number` | Current version number | REQUIRED |
| `is_authoritative` | Whether this is the designated Authoritative Document | REQUIRED |
| `notarization_date` | Date of notarization, if applicable | OPTIONAL |
| `notary_id` | Identity of notary, if applicable | OPTIONAL |
| `witness_count` | Number of witnesses, if applicable | OPTIONAL |
| `attorney_attestation_id` | Reference to attorney attestation, if any | OPTIONAL |
| `expiration_date` | Expiration date, if document is time-limited | OPTIONAL |

### 5.4 Supported Document Types

5.4.1 The Registry Provider MUST support registration of all document types enumerated in the Document Type Taxonomy (Annex A). At minimum, the following categories MUST be supported:

- Last Will and Testament
- Revocable Living Trust (and amendments/restatements)
- Irrevocable Trust
- Durable Power of Attorney (Financial)
- Power of Attorney (Healthcare / Medical)
- Advance Healthcare Directive / Living Will
- Do Not Resuscitate (DNR) Order
- POLST / MOLST (Physician/Medical Orders for Life-Sustaining Treatment)
- Guardian Nomination (for minor children)
- Guardian Nomination (for adult dependent)
- Beneficiary Designation
- Transfer on Death (TOD) Deed
- Community Property Agreement
- Prenuptial / Postnuptial Agreement (estate-related provisions)
- Letter of Intent / Letter of Instruction

5.4.2 The Registry Provider SHOULD support custom or jurisdiction-specific document types and MUST provide a mechanism for extending the taxonomy.

### 5.5 Authoritative Designation

5.5.1 The Registry Provider MUST provide a mechanism for the Registrant to designate one Registered Document of each type as the Authoritative Document.

5.5.2 When a new version is registered and designated as Authoritative, the previous Authoritative designation for that document type MUST be automatically revoked.

5.5.3 Authoritative designation SHOULD be confirmed by attorney attestation (see Section 8) but MAY be made by the Registrant alone with appropriate warnings.

5.5.4 The Authoritative status of a document MUST be verifiable via the Institutional Verification API (see Section 10).

---

## 6. Section 3: Encryption and Data Security

### 6.1 Encryption at Rest

6.1.1 All Registered Documents MUST be encrypted at rest using AES-256 (as defined in FIPS 197) or a cryptographic algorithm of equivalent or greater strength.

6.1.2 Encryption keys MUST be managed using a Hardware Security Module (HSM) that meets FIPS 140-2 Level 3 or FIPS 140-3 Level 3 certification.

6.1.3 Encryption keys MUST be rotated at least annually. Key rotation MUST NOT require re-upload of documents by the Registrant.

6.1.4 The Registry Provider SHOULD support customer-managed encryption keys (CMEK), allowing Registrants or their designated agents to maintain control of the master encryption key.

6.1.5 If CMEK is supported, the Registry Provider MUST document the key escrow and recovery procedures and MUST ensure that loss of the customer-managed key does not result in permanent document loss without explicit informed consent.

### 6.2 Encryption in Transit

6.2.1 All data transmitted between the Registrant's client and the Registry MUST be encrypted using TLS 1.3 (as defined in RFC 8446) or later.

6.2.2 The Registry Provider MUST NOT support TLS versions prior to 1.2 for any endpoint. TLS 1.2 MAY be supported for backward compatibility with institutional integrations, provided that only cipher suites offering forward secrecy are enabled.

6.2.3 Certificate pinning SHOULD be implemented for mobile applications.

### 6.3 Key Management

6.3.1 The Registry Provider MUST implement a key management policy consistent with NIST SP 800-57 Part 1.

6.3.2 Master keys MUST be stored exclusively within HSMs and MUST NOT be exportable in plaintext.

6.3.3 Key management procedures MUST support key ceremonies with split knowledge and dual control.

6.3.4 The Registry Provider MUST maintain a key inventory that records: key identifier, creation date, rotation schedule, associated resources, and custodians.

### 6.4 Security Certification

6.4.1 The Registry Provider MUST maintain a current SOC 2 Type II audit report covering the Trust Services Criteria of Security, Availability, Processing Integrity, Confidentiality, and Privacy.

6.4.2 The SOC 2 Type II audit MUST be performed by an independent CPA firm and MUST cover a minimum observation period of six (6) months.

6.4.3 The Registry Provider SHOULD pursue ISO 27001:2022 certification.

6.4.4 A summary of the most recent SOC 2 Type II audit results MUST be made available to Registrants upon request. The full report SHOULD be available under NDA to institutional partners.

### 6.5 Vulnerability Management

6.5.1 The Registry Provider MUST conduct penetration testing at least annually by an independent third party.

6.5.2 The Registry Provider MUST operate a vulnerability disclosure program and MUST respond to reported vulnerabilities within 72 hours.

6.5.3 Critical vulnerabilities (CVSS score >= 9.0) MUST be remediated within 48 hours of discovery. High vulnerabilities (CVSS score >= 7.0) MUST be remediated within 30 days.

---

## 7. Section 4: Blockchain Verification

### 7.1 Blockchain Anchoring

7.1.1 The Registry Provider MUST anchor the Document Hash and Metadata Hash of every Registered Document to a public, permissionless blockchain within 24 hours of registration.

7.1.2 Each Blockchain Anchor transaction MUST contain the following data:

| Field | Description |
|-------|-------------|
| `document_hash` | SHA-256 hash of the document content |
| `metadata_hash` | SHA-256 hash of the structured metadata |
| `timestamp` | UTC timestamp of the anchoring transaction |
| `version_number` | Document version number |
| `registry_id` | Identifier of the Registry Provider |

7.1.3 The Registry Provider MUST record the blockchain transaction identifier (transaction hash) in the document's registration record.

### 7.2 Supported Blockchains

7.2.1 The Registry Provider MUST anchor to at least one of the following public blockchains:

- Ethereum Mainnet
- Polygon PoS (Proof of Stake) Mainnet

7.2.2 The Registry Provider MAY additionally anchor to other public blockchains provided they meet the following criteria:

- Public and permissionless
- Operational for at least two (2) years
- Average block finality time of less than 15 minutes
- Publicly accessible block explorer

7.2.3 The Registry Provider SHOULD anchor to at least two independent blockchains for redundancy.

### 7.3 Independent Verification

7.3.1 Any party in possession of a document and its associated metadata MUST be able to independently verify the Blockchain Anchor without requiring access to the Registry or cooperation from the Registry Provider.

7.3.2 The Registry Provider MUST publish documentation sufficient for independent verification, including:

- The hashing algorithm used (SHA-256)
- The data serialization format used before hashing
- The blockchain(s) used and the contract addresses
- The method for locating the anchoring transaction

7.3.3 The Registry Provider SHOULD provide a public verification API endpoint that accepts a Document Hash and returns the corresponding Blockchain Anchor details (see Section 10).

### 7.4 Blockchain Continuity

7.4.1 If a supported blockchain undergoes a hard fork, the Registry Provider MUST anchor to the canonical (majority consensus) chain.

7.4.2 If a supported blockchain ceases operation, the Registry Provider MUST migrate anchoring to an alternative compliant blockchain within 90 days and MUST re-anchor all active Registered Documents to the new chain within 180 days.

7.4.3 The Registry Provider MUST maintain the ability to verify historical anchors on deprecated chains for a minimum of seven (7) years following migration.

---

## 8. Section 5: Attorney Attestation

### 8.1 Attestation Framework

8.1.1 The Registry Provider MUST support digital attestation by licensed attorneys.

8.1.2 The following attestation types MUST be supported:

| Attestation Type | Description |
|-----------------|-------------|
| `identity_verified` | The attesting attorney has personally verified the identity of the Registrant |
| `capacity_confirmed` | The attesting attorney has assessed and confirmed the Registrant's legal capacity to execute the document |
| `document_authentic` | The attesting attorney attests that the document is a true and accurate representation of the Registrant's intent |
| `final_version` | The attesting attorney confirms this is the final, executed version of the document |
| `authoritative_designation` | The attesting attorney supports the Registrant's designation of this document as Authoritative |

8.1.3 Multiple attestation types MAY be combined in a single attestation transaction.

### 8.2 Attorney Verification

8.2.1 The Registry Provider MUST verify that the attesting attorney is a member in good standing of at least one U.S. state bar at the time of attestation.

8.2.2 Verification MUST be performed against the official records of the relevant state bar association(s). Automated verification SHOULD be performed at the time of attestation; manual verification MUST be completed within 48 hours.

8.2.3 The Registry Provider MUST record the following for each attesting attorney:

- Full legal name
- State bar number(s) and jurisdiction(s)
- Bar verification status and date
- Law firm affiliation (if applicable)
- Digital certificate identifier

8.2.4 Attorney bar status SHOULD be re-verified at least quarterly for attorneys with active attestations.

### 8.3 Digital Signatures

8.3.1 Attorney attestations MUST be digitally signed using PKI certificates conforming to the X.509 v3 standard (RFC 5280).

8.3.2 Attorney PKI certificates MUST be issued by a Certificate Authority (CA) that is:

- Operated or approved by the Registry Provider, or
- A publicly trusted CA that verifies professional credentials, or
- Operated by a state bar association or legal credentialing body

8.3.3 Attorney certificates MUST include the following fields:

- Subject Distinguished Name (including attorney name and bar number)
- Key Usage: Digital Signature
- Extended Key Usage: Attorney Attestation (OID to be assigned)
- Validity period not exceeding three (3) years

8.3.4 The Registry Provider MUST maintain an Online Certificate Status Protocol (OCSP) responder or Certificate Revocation List (CRL) for attorney certificates.

8.3.5 Attestation signatures MUST include a trusted timestamp per RFC 3161 to establish the time of signing.

---

## 9. Section 6: Access Control and Release Protocols

### 9.1 Role-Based Access Control

9.1.1 The Registry Provider MUST implement role-based access control (RBAC) with at least the following roles:

| Role | Permissions |
|------|------------|
| Registrant | Full control over own documents; designate Authorized Recipients; set Release Triggers |
| Successor Agent | Manage documents on behalf of incapacitated Registrant (requires verified trigger) |
| Attorney | View and attest documents; manage documents with Registrant authorization |
| Authorized Recipient | View released documents; verify document status |
| Institutional Verifier | Submit Verification Queries; receive verification responses |
| Administrator | System administration (Registry Provider personnel only) |

9.1.2 The Registrant MUST have the ability to grant and revoke access to any party at any time, subject to the constraints of active Release Triggers.

9.1.3 Access grants MUST be logged in the audit trail (see Section 11).

### 9.2 Release Triggers

9.2.1 The Registry Provider MUST support the following Release Trigger types:

**9.2.1.1 Death-Triggered Release**

- MUST require verification of death through at least one of:
  - Certified death certificate submitted by an Authorized Recipient
  - Automated cross-reference with the Social Security Death Index (SSDI) or equivalent authoritative source
  - Court order confirming death
- MUST implement a mandatory waiting period of no less than forty-eight (48) hours between death verification and document release
- MUST notify all Authorized Recipients and designated attorneys when a death trigger is verified
- SHOULD provide mechanism for contesting a death-triggered release during the waiting period

**9.2.1.2 Incapacity-Triggered Release**

- MUST require certification of incapacity by at least two (2) licensed physicians, consistent with the incapacity determination standards specified in the Registrant's governing documents
- Physician certifications MUST be verified against state medical licensing databases
- The Registry Provider MUST notify the Registrant (at all registered contact methods) when an incapacity trigger is initiated, providing a minimum of seventy-two (72) hours before release, unless the governing documents specify otherwise
- If the Registrant responds to contest the incapacity determination, the release MUST be suspended pending resolution

**9.2.1.3 Medical Emergency Release**

- MUST support expedited release of healthcare-related documents (Advance Directive, Healthcare POA, DNR, POLST) to verified healthcare institutions
- Verification of requesting institution MUST be performed via mTLS certificate or equivalent institutional credential
- Release MUST occur within fifteen (15) minutes of a verified emergency request
- The Registry Provider MUST notify the Registrant and all designated parties of emergency releases within twenty-four (24) hours

**9.2.1.4 Court Order Release**

- MUST support release in response to a valid court order from a court of competent jurisdiction
- The Registry Provider MUST verify the authenticity of the court order before release
- The Registrant and designated attorneys MUST be notified of court-ordered releases

### 9.3 Notification Requirements

9.3.1 The Registry Provider MUST notify the Registrant of all access attempts, whether successful or unsuccessful, via at least two independent channels (e.g., email and mobile push notification).

9.3.2 Notifications MUST be sent within one (1) hour of the access attempt.

9.3.3 The notification MUST include: timestamp, identity of the requesting party (if known), type of access requested, and whether access was granted or denied.

---

## 10. Section 7: Institutional Verification API

### 10.1 API Requirements

10.1.1 The Registry Provider MUST expose a RESTful API for institutional verification of Registered Documents.

10.1.2 The API MUST support the following operations:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/verify/document` | POST | Verify a document by its hash |
| `/verify/registrant` | POST | Check whether a registrant has documents on file |
| `/verify/authoritative` | POST | Confirm that a specific document is the current Authoritative version |
| `/verify/status` | GET | Check the status of a previously submitted verification request |
| `/release/emergency` | POST | Request emergency release of healthcare documents |

10.1.3 The API MUST return responses in JSON format conforming to the schema defined in Annex B.

10.1.4 The API MUST respond to verification queries within two (2) seconds under normal operating conditions, measured as the time between receipt of the request and transmission of the response.

10.1.5 The API MUST support a minimum throughput of 100 verification requests per minute per institutional client.

### 10.2 Authentication and Authorization

10.2.1 All API endpoints MUST require authentication.

10.2.2 Institutional connections MUST be authenticated using mutual TLS (mTLS) with certificates issued by the Registry Provider or a mutually trusted CA.

10.2.3 API authorization MUST be implemented using OAuth 2.0 (RFC 6749) with scopes that limit access to specific operations and document types.

10.2.4 API access tokens MUST have a maximum lifetime of one (1) hour. Refresh tokens MUST have a maximum lifetime of twenty-four (24) hours.

### 10.3 Healthcare Integration

10.3.1 The Registry Provider SHOULD support HL7 FHIR R4 for integration with healthcare information systems.

10.3.2 If FHIR is supported, the Registry Provider MUST implement at minimum:

- `DocumentReference` resource for representing Registered Documents
- `Consent` resource for representing release authorizations
- `Patient` resource mapping for Registrant identification

10.3.3 FHIR endpoints MUST comply with SMART on FHIR authorization requirements.

### 10.4 Rate Limiting and Abuse Prevention

10.4.1 The Registry Provider MUST implement rate limiting on all API endpoints to prevent abuse.

10.4.2 Rate limit policies MUST be documented and communicated to institutional clients.

10.4.3 The API MUST return standard HTTP 429 (Too Many Requests) responses with a `Retry-After` header when rate limits are exceeded.

---

## 11. Section 8: Audit Trail Requirements

### 11.1 Audit Log Structure

11.1.1 The Registry Provider MUST maintain a comprehensive, append-only, immutable audit log of all system activities.

11.1.2 Each audit log entry MUST contain at minimum:

| Field | Description |
|-------|-------------|
| `entry_id` | Unique identifier for the audit entry |
| `timestamp` | UTC timestamp in ISO 8601 format with millisecond precision |
| `actor_id` | Identifier of the person or system performing the action |
| `actor_type` | Classification of the actor (registrant, attorney, institution, system, administrator) |
| `action` | The action performed (e.g., document_registered, document_viewed, attestation_created, release_triggered) |
| `resource_type` | The type of resource affected (document, attestation, access_grant, release_trigger) |
| `resource_id` | Identifier of the affected resource |
| `ip_address` | IP address of the requesting client |
| `user_agent` | User agent string of the requesting client |
| `result` | Outcome of the action (success, failure, denied) |
| `details` | Additional context (e.g., reason for failure, changed fields) |

### 11.2 Immutability

11.2.1 Audit log entries MUST be immutable. Once written, no entry SHALL be modified or deleted by any party, including the Registry Provider's administrators.

11.2.2 The Registry Provider MUST implement technical controls to enforce immutability, such as:

- Write-once storage media
- Append-only database structures with cryptographic chaining
- Independent tamper-detection mechanisms

11.2.3 The integrity of the audit log MUST be independently verifiable.

### 11.3 Retention

11.3.1 Audit log records MUST be retained for a minimum of seven (7) years from the date of the entry.

11.3.2 For records relating to a Registrant who is deceased, audit logs MUST be retained for a minimum of seven (7) years following the final distribution or closure of the estate, or ten (10) years from the date of death, whichever is longer.

11.3.3 Audit log records MUST survive the termination of a Registrant's account.

### 11.4 Blockchain Anchoring of Audit Trail

11.4.1 The Registry Provider SHOULD periodically anchor a cryptographic summary of the audit trail to a public blockchain.

11.4.2 If implemented, anchoring SHOULD occur at least daily and MUST include a Merkle root computed over all audit entries since the previous anchor.

11.4.3 The anchoring process MUST be documented and the methodology MUST be published to enable independent verification.

---

## 12. Section 9: Physical Vault Integration (Optional Enhanced Tier)

### 12.1 Applicability

12.1.1 This section applies only to Registry Providers that offer physical vault services for original paper documents in addition to digital registration. Compliance with this section is OPTIONAL for EDRS conformance.

12.1.2 Registry Providers that offer physical vault services and wish to advertise them as EDRS-compliant MUST comply with all requirements in this section.

### 12.2 Vault Facility Requirements

12.2.1 Physical vault facilities MUST be bonded and insured against loss, theft, or damage.

12.2.2 Insurance coverage MUST be adequate to cover the replacement cost of stored documents, including the cost of re-execution where applicable.

12.2.3 Vault facilities MUST meet or exceed the following environmental standards:

- Climate-controlled (temperature between 60-72 degrees F, relative humidity between 30-50%)
- Fire suppression systems rated for document storage
- 24/7 video surveillance with minimum 90-day retention
- Dual-person access controls

### 12.3 Chain of Custody

12.3.1 The Registry Provider MUST maintain a complete chain-of-custody record for every physical document received, stored, or released.

12.3.2 Physical documents MUST be scanned and digitally registered (per Section 5) upon receipt.

12.3.3 The digital registration MUST include a notation that a physical original is held in vault storage.

### 12.4 Digital Destruction Certification

12.4.1 When physical originals are destroyed at the Registrant's request, the destruction MUST be performed in accordance with NIST SP 800-88 Rev. 1 guidelines adapted for paper media.

12.4.2 Destruction MUST be performed by bonded personnel and witnessed by at least one independent party.

12.4.3 A destruction certificate MUST be generated and MUST include:

- Identity of the document destroyed
- Method of destruction
- Date and time of destruction
- Identity of the person performing destruction
- Identity of the witness(es)
- Cryptographic hash of the destruction certificate

12.4.4 The destruction certificate MUST be anchored to a public blockchain per Section 7.

### 12.5 Death-Triggered Physical Release

12.5.1 Physical vault contents MUST be subject to the same Release Trigger protocols defined in Section 9.

12.5.2 Upon verified death trigger, the Registry Provider MUST release physical originals to the Authorized Recipient(s) via bonded courier or registered mail with tracking.

12.5.3 The release process MUST include identity verification of the receiving party.

---

## 13. Section 10: Consumer Protections

### 13.1 Data Portability

13.1.1 The Registry Provider MUST provide the Registrant with the ability to export all Registered Documents and associated metadata at any time.

13.1.2 Exported data MUST include:

- All Registered Documents in their original file format
- All metadata in a machine-readable format (JSON or XML)
- Complete version history
- All attestation records
- Blockchain Anchor references

13.1.3 Export MUST be available in a documented, open format. Proprietary formats are prohibited as the sole export option.

13.1.4 The Registry Provider MUST complete export requests within five (5) business days.

### 13.2 Account Termination

13.2.1 The Registrant MUST have the right to terminate their account at any time.

13.2.2 Upon receiving a termination request, the Registry Provider MUST implement a grace period of no less than thirty (30) days during which:

- All Registered Documents remain accessible to the Registrant
- The Registrant may export all data
- The termination may be reversed

13.2.3 Following the grace period, if termination is not reversed, the Registry Provider MUST:

- Delete all Registered Documents from active storage within fourteen (14) days
- Retain audit logs per Section 11.3
- Retain Blockchain Anchors (which are inherently permanent)
- Provide written confirmation of deletion to the Registrant

### 13.3 Fee Transparency

13.3.1 The Registry Provider MUST publish a complete fee schedule that includes all charges associated with document registration, storage, verification, release, and export.

13.3.2 The Registry Provider MUST NOT impose hidden fees, undisclosed surcharges, or charges for services not explicitly agreed to by the Registrant.

13.3.3 Fee changes MUST be communicated to existing Registrants at least sixty (60) days before taking effect.

13.3.4 The Registry Provider MUST NOT charge fees for Verification Queries submitted by institutions if those queries are initiated for the benefit of the Registrant (e.g., a hospital verifying a patient's healthcare directive).

### 13.4 Data Privacy

13.4.1 The Registry Provider MUST NOT sell, license, share, or otherwise disclose Registrant data to third parties for any purpose other than the operation of the Registry, unless:

- The Registrant provides explicit written consent, or
- Disclosure is required by law or court order

13.4.2 The Registry Provider MUST publish a privacy policy that clearly describes data collection, use, storage, and disclosure practices.

13.4.3 The Registry Provider MUST comply with all applicable state and federal privacy laws.

### 13.5 Service Continuity

13.5.1 The Registry Provider MUST maintain a documented business continuity plan that addresses the disposition of Registered Documents in the event of provider insolvency, acquisition, or cessation of operations.

13.5.2 The continuity plan MUST include provisions for:

- Transfer of all Registered Documents to a successor EDRS-compliant provider
- Notification to all Registrants at least ninety (90) days before cessation of operations
- Export of all data to Registrants upon request during the transition period
- Maintenance of Blockchain Anchors, which are inherently persistent

---

## 14. Section 11: Interstate Recognition

### 14.1 Portability

14.1.1 Registered Documents MUST be portable across U.S. state lines. A document registered while the Registrant resides in one state MUST remain registered and verifiable if the Registrant changes state of residence.

14.1.2 The Registry Provider MUST NOT impose additional fees or requirements solely because the Registrant has changed state of residence.

14.1.3 The Registry Provider MUST provide mechanisms for updating the state of governance metadata when a Registrant re-executes a document under the law of a new state.

### 14.2 Cross-Jurisdictional Verification

14.2.1 Verification Queries MUST be serviceable regardless of the querying party's state of location.

14.2.2 The Registry Provider MUST NOT restrict Verification Query access based on the geographic location of the querying institution, provided the institution meets authentication and authorization requirements (see Section 10.2).

14.2.3 Verification responses MUST include the state of governance for the queried document, enabling the querying party to determine applicable law.

### 14.3 Multi-State Registration

14.3.1 The Registry Provider SHOULD support registration of documents that are executed under the law of one state but intended to be effective in multiple states.

14.3.2 When a document is registered with multiple states of governance, each state association MUST be recorded in the metadata and MUST be reflected in Verification Query responses.

---

## 15. Section 12: Compliance and Certification

### 15.1 Self-Assessment

15.1.1 Any Registry Provider seeking EDRS compliance MUST first complete the Self-Assessment Checklist provided in Annex C.

15.1.2 The self-assessment MUST be completed by qualified personnel with knowledge of the provider's technical architecture, security controls, and operational procedures.

15.1.3 The completed self-assessment MUST be submitted to the Estate Document Registry Standards Council as part of the certification application.

### 15.2 Third-Party Audit

15.2.1 Following successful self-assessment, the Registry Provider MUST engage an independent third-party auditor to verify compliance with this standard.

15.2.2 The auditor MUST be:

- Independent of the Registry Provider (no financial interest or corporate affiliation)
- Qualified in information security auditing (e.g., CISA, CISSP, or equivalent credential)
- Experienced in auditing systems that handle sensitive personal information

15.2.3 The audit MUST cover all mandatory requirements (MUST, REQUIRED, SHALL) in Sections 1 through 11.

15.2.4 The audit report MUST identify any non-conformities and classify them as:

- **Major Non-Conformity**: A mandatory requirement that is not implemented or is materially deficient
- **Minor Non-Conformity**: A mandatory requirement that is implemented but with deficiencies that do not materially compromise the requirement's objective
- **Observation**: A recommended requirement (SHOULD) that is not implemented

15.2.5 Certification MUST NOT be granted if any major non-conformities exist. Minor non-conformities MUST be remediated within ninety (90) days of the audit report.

### 15.3 Certification

15.3.1 Upon successful completion of the third-party audit with no unresolved major or minor non-conformities, the Estate Document Registry Standards Council SHALL grant EDRS-1.0 certification.

15.3.2 Certification is valid for a period of two (2) years from the date of issuance.

15.3.3 Certified providers MUST undergo a surveillance audit at the twelve (12) month midpoint of the certification period.

15.3.4 Certified providers MUST notify the Standards Council within thirty (30) days of any material change to their systems, security controls, or operational procedures that may affect compliance.

### 15.4 EDRS Compliant Mark

15.4.1 Certified providers are granted a license to display the "EDRS Compliant" certification mark in connection with their registered services.

15.4.2 The certification mark MUST be displayed with the version number (e.g., "EDRS 1.0 Compliant") and the year of certification.

15.4.3 The certification mark MUST NOT be used in a manner that implies endorsement of any product, service, or claim not covered by this standard.

15.4.4 The license to use the certification mark is automatically revoked upon expiration of certification, material non-compliance, or failure to complete recertification.

### 15.5 Recertification

15.5.1 Certified providers MUST undergo full recertification audit every two (2) years.

15.5.2 Recertification MUST be completed before the expiration of the current certification. A grace period of thirty (30) days is permitted.

15.5.3 If recertification is not completed within the grace period, certification is revoked and the provider MUST NOT use the EDRS Compliant mark until recertification is achieved.

---

## Annex A: Document Type Taxonomy

The following table defines the standard document type classifications for use in EDRS-compliant registries.

| Type Code | Document Type | Category |
|-----------|--------------|----------|
| `WILL-001` | Last Will and Testament | Testamentary |
| `WILL-002` | Codicil to Will | Testamentary |
| `TRUST-001` | Revocable Living Trust | Trust |
| `TRUST-002` | Trust Amendment | Trust |
| `TRUST-003` | Trust Restatement | Trust |
| `TRUST-004` | Irrevocable Trust | Trust |
| `TRUST-005` | Special Needs Trust | Trust |
| `POA-001` | Durable Power of Attorney (Financial) | Agency |
| `POA-002` | Limited Power of Attorney (Financial) | Agency |
| `POA-003` | Power of Attorney (Healthcare / Medical) | Healthcare |
| `POA-004` | Springing Power of Attorney | Agency |
| `HC-001` | Advance Healthcare Directive | Healthcare |
| `HC-002` | Living Will | Healthcare |
| `HC-003` | Do Not Resuscitate (DNR) Order | Healthcare |
| `HC-004` | POLST / MOLST | Healthcare |
| `HC-005` | Mental Health Advance Directive | Healthcare |
| `GUARD-001` | Guardian Nomination (Minor Children) | Guardianship |
| `GUARD-002` | Guardian Nomination (Adult Dependent) | Guardianship |
| `GUARD-003` | Conservatorship Nomination | Guardianship |
| `BEN-001` | Beneficiary Designation | Beneficiary |
| `BEN-002` | Transfer on Death (TOD) Deed | Beneficiary |
| `BEN-003` | Payable on Death (POD) Designation | Beneficiary |
| `FAM-001` | Community Property Agreement | Family |
| `FAM-002` | Prenuptial Agreement (Estate Provisions) | Family |
| `FAM-003` | Postnuptial Agreement (Estate Provisions) | Family |
| `MISC-001` | Letter of Intent / Instruction | Supplementary |
| `MISC-002` | Funeral / Burial Instructions | Supplementary |
| `MISC-003` | Digital Asset Inventory | Supplementary |
| `MISC-004` | Pet Trust / Care Instructions | Supplementary |
| `MISC-999` | Other (Jurisdiction-Specific) | Custom |

---

## Annex B: API Schema Summary

### B.1 Verification Request

```json
{
  "type": "object",
  "properties": {
    "query_type": {
      "type": "string",
      "enum": ["document_verify", "registrant_check", "authoritative_confirm"]
    },
    "document_hash": {
      "type": "string",
      "description": "SHA-256 hash of the document (hex-encoded)"
    },
    "registrant_identifier": {
      "type": "object",
      "properties": {
        "last_name": { "type": "string" },
        "date_of_birth": { "type": "string", "format": "date" },
        "last_four_ssn": { "type": "string", "pattern": "^[0-9]{4}$" }
      }
    },
    "document_type": {
      "type": "string",
      "description": "Document type code per Annex A"
    },
    "requesting_institution": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "type": { "type": "string", "enum": ["healthcare", "financial", "legal", "government"] },
        "identifier": { "type": "string" }
      }
    }
  }
}
```

### B.2 Verification Response

```json
{
  "type": "object",
  "properties": {
    "query_id": { "type": "string", "format": "uuid" },
    "status": {
      "type": "string",
      "enum": ["verified", "not_found", "version_superseded", "revoked", "pending"]
    },
    "document_info": {
      "type": "object",
      "properties": {
        "document_type": { "type": "string" },
        "is_authoritative": { "type": "boolean" },
        "version_number": { "type": "integer" },
        "registration_date": { "type": "string", "format": "date-time" },
        "state_of_governance": { "type": "string" },
        "has_attorney_attestation": { "type": "boolean" },
        "blockchain_anchor": {
          "type": "object",
          "properties": {
            "chain": { "type": "string" },
            "transaction_hash": { "type": "string" },
            "block_number": { "type": "integer" },
            "timestamp": { "type": "string", "format": "date-time" }
          }
        }
      }
    },
    "verification_timestamp": { "type": "string", "format": "date-time" }
  }
}
```

---

## Annex C: Self-Assessment Checklist

The following checklist MUST be completed by Registry Providers seeking EDRS-1.0 certification. Each item corresponds to a mandatory requirement in the standard.

### Identity Verification (Section 1)
- [ ] Registrant identity verified via government-issued photo ID
- [ ] Identity proofing meets or exceeds NIST IAL2
- [ ] Liveness detection implemented with anti-spoofing measures
- [ ] Multi-factor authentication at AAL2 or higher
- [ ] SMS-only second factor is not supported
- [ ] Identity verification evidence retained per policy

### Document Registration (Section 2)
- [ ] SHA-256 hash computed and stored for every registered document
- [ ] Immutable version history maintained
- [ ] All required metadata fields recorded
- [ ] All mandatory document types supported
- [ ] Authoritative document designation mechanism implemented

### Encryption and Security (Section 3)
- [ ] AES-256 encryption at rest
- [ ] TLS 1.3 for all data in transit
- [ ] HSM-backed key management (FIPS 140-2/3 Level 3)
- [ ] Annual key rotation implemented
- [ ] SOC 2 Type II certification current
- [ ] Annual penetration testing by independent third party
- [ ] Vulnerability disclosure program operational

### Blockchain Verification (Section 4)
- [ ] Document and metadata hashes anchored to public blockchain
- [ ] Anchoring within 24 hours of registration
- [ ] Independent verification documentation published
- [ ] Blockchain continuity plan documented

### Attorney Attestation (Section 5)
- [ ] Digital attestation by licensed attorneys supported
- [ ] All five attestation types supported
- [ ] Attorney bar status verified against state bar records
- [ ] X.509 v3 PKI certificates for attorney signatures
- [ ] Certificate revocation mechanism operational

### Access Control and Release (Section 6)
- [ ] Role-based access control with defined roles
- [ ] Death-triggered release with 48-hour waiting period
- [ ] Incapacity-triggered release with two-physician certification
- [ ] Medical emergency release within 15 minutes
- [ ] Court order release supported
- [ ] Notifications sent for all access attempts

### Institutional API (Section 7)
- [ ] RESTful verification API operational
- [ ] mTLS for institutional connections
- [ ] OAuth 2.0 authorization implemented
- [ ] Response time under 2 seconds
- [ ] Rate limiting implemented

### Audit Trail (Section 8)
- [ ] Append-only, immutable audit log
- [ ] All required fields recorded for each entry
- [ ] Minimum 7-year retention
- [ ] Tamper-detection mechanisms in place

### Consumer Protections (Section 10)
- [ ] Data portability / export mechanism available
- [ ] 30-day grace period before account deletion
- [ ] Transparent fee schedule published
- [ ] No sale or sharing of registrant data
- [ ] Business continuity plan documented

### Interstate Recognition (Section 11)
- [ ] Documents portable across state lines
- [ ] No restrictions on cross-jurisdictional verification
- [ ] State of governance metadata maintained

---

## Revision History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | March 2026 | Initial publication |

---

## Contact

**Estate Document Registry Standards Council**

Web: [https://uedra.org](https://uedra.org)

Email: standards@uedra.org

Comments and feedback on this standard may be submitted to standards@uedra.org or through the public comment portal at https://uedra.org/comments.

---

*End of EDRS-1.0*
