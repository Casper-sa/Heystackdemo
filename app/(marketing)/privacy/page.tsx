import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link className="flex items-center justify-center" href="/">
                    <span className="font-bold text-xl">HeyStack</span>
                </Link>
            </header>

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="space-y-4 mb-8">
                    <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="text-muted-foreground">
                        Last updated: November 29, 2025
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">1. Introduction</h2>
                        <p className="text-muted-foreground">
                            Welcome to HeyStack's Privacy Policy. This policy describes how HeyStack ("we", "us", or "our")
                            collects, uses, and protects your personal information when you use our student project marketplace platform.
                        </p>
                        <p className="text-muted-foreground">
                            We are committed to protecting your privacy and ensuring that your personal data is handled in a safe
                            and responsible manner in accordance with applicable data protection laws, including GDPR.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                        <p className="text-muted-foreground">
                            We collect several types of information to provide and improve our services:
                        </p>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold">2.1 Personal Information</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                <li>Name and contact information (email address)</li>
                                <li>KTH affiliation and student/staff status</li>
                                <li>Profile information (bio, skills, interests)</li>
                                <li>Academic information (program, year of study)</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold">2.2 Usage Information</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                <li>Log data (IP address, browser type, pages visited)</li>
                                <li>Device information</li>
                                <li>Cookies and similar tracking technologies</li>
                                <li>Interaction with projects and other users</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold">2.3 Content You Provide</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                <li>Project descriptions and details</li>
                                <li>Messages and communications</li>
                                <li>Comments and feedback</li>
                                <li>Uploaded files and documents</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                        <p className="text-muted-foreground">
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>To provide, maintain, and improve our services</li>
                            <li>To create and manage your account</li>
                            <li>To facilitate connections between students and projects</li>
                            <li>To send you notifications and updates about the platform</li>
                            <li>To respond to your inquiries and provide customer support</li>
                            <li>To analyze usage patterns and improve user experience</li>
                            <li>To detect, prevent, and address technical issues and security threats</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">4. Information Sharing and Disclosure</h2>
                        <p className="text-muted-foreground">
                            We do not sell your personal information. We may share your information in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li><strong>With other users:</strong> Your profile information and project details are visible to other platform users</li>
                            <li><strong>With KTH:</strong> We may share aggregated, non-personal data with KTH for research and improvement purposes</li>
                            <li><strong>Service providers:</strong> We may share data with third-party service providers who assist in operating our platform</li>
                            <li><strong>Legal requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">5. Data Security</h2>
                        <p className="text-muted-foreground">
                            We implement appropriate technical and organizational measures to protect your personal information against
                            unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments and updates</li>
                            <li>Access controls and authentication mechanisms</li>
                            <li>Employee training on data protection</li>
                        </ul>
                        <p className="text-muted-foreground">
                            However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">6. Your Rights</h2>
                        <p className="text-muted-foreground">
                            Under GDPR and other applicable laws, you have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li><strong>Right to access:</strong> Request a copy of your personal data</li>
                            <li><strong>Right to rectification:</strong> Correct inaccurate or incomplete data</li>
                            <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
                            <li><strong>Right to restrict processing:</strong> Limit how we use your data</li>
                            <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
                            <li><strong>Right to object:</strong> Object to certain types of processing</li>
                            <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                        </ul>
                        <p className="text-muted-foreground">
                            To exercise these rights, please contact us at privacy@heystack.com.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">7. Cookies and Tracking Technologies</h2>
                        <p className="text-muted-foreground">
                            We use cookies and similar tracking technologies to enhance your experience on our platform.
                            Cookies are small data files stored on your device. You can control cookie settings through your browser,
                            but disabling cookies may affect platform functionality.
                        </p>
                        <p className="text-muted-foreground">
                            We use the following types of cookies:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li><strong>Essential cookies:</strong> Required for basic platform functionality</li>
                            <li><strong>Performance cookies:</strong> Help us understand how users interact with the platform</li>
                            <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">8. Data Retention</h2>
                        <p className="text-muted-foreground">
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                            Privacy Policy, unless a longer retention period is required or permitted by law. When you delete your
                            account, we will delete or anonymize your personal data, except where we are required to retain it for
                            legal or legitimate business purposes.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">9. Children's Privacy</h2>
                        <p className="text-muted-foreground">
                            HeyStack is intended for use by university students and staff. We do not knowingly collect personal
                            information from individuals under the age of 16. If we become aware that we have collected such
                            information, we will take steps to delete it.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">10. International Data Transfers</h2>
                        <p className="text-muted-foreground">
                            Your information may be transferred to and processed in countries other than your country of residence.
                            We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy
                            and applicable data protection laws.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">11. Changes to This Privacy Policy</h2>
                        <p className="text-muted-foreground">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                            We will notify you of any material changes by posting the updated policy on this page and updating the
                            "Last updated" date. We encourage you to review this Privacy Policy periodically.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">12. Contact Us</h2>
                        <p className="text-muted-foreground">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                            please contact us at:
                        </p>
                        <div className="text-muted-foreground space-y-1">
                            <p className="font-medium">Email: privacy@heystack.com</p>
                            <p className="font-medium">Data Protection Officer: dpo@heystack.com</p>
                        </div>
                    </section>

                    {/* Placeholder Notice */}
                    <div className="mt-12 p-6 border rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground text-center">
                            <strong>Note:</strong> This is a placeholder Privacy Policy page.
                            The actual privacy policy will be finalized and reviewed by legal counsel and data protection
                            experts before the platform launch to ensure full compliance with GDPR and other applicable regulations.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 HeyStack. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="/terms">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
