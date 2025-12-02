import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
                    <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                    <p className="text-muted-foreground">
                        Last updated: November 29, 2025
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">1. Introduction</h2>
                        <p className="text-muted-foreground">
                            Welcome to HeyStack. These Terms of Service ("Terms") govern your access to and use of the HeyStack platform,
                            a student project marketplace designed to connect students at KTH with exciting projects and collaboration opportunities.
                        </p>
                        <p className="text-muted-foreground">
                            By accessing or using HeyStack, you agree to be bound by these Terms. If you do not agree to these Terms,
                            please do not use our platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">2. Eligibility</h2>
                        <p className="text-muted-foreground">
                            HeyStack is intended for use by students, faculty, and staff affiliated with KTH Royal Institute of Technology.
                            By using this platform, you represent that you are eligible to use the service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">3. User Accounts</h2>
                        <p className="text-muted-foreground">
                            To access certain features of HeyStack, you may be required to create an account. You are responsible for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Maintaining the confidentiality of your account credentials</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us immediately of any unauthorized use of your account</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">4. User Content</h2>
                        <p className="text-muted-foreground">
                            Users may post, upload, or submit content including project descriptions, profiles, and communications.
                            You retain ownership of your content, but grant HeyStack a license to use, display, and distribute your
                            content on the platform.
                        </p>
                        <p className="text-muted-foreground">
                            You agree not to post content that is illegal, offensive, discriminatory, or violates the rights of others.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">5. Prohibited Conduct</h2>
                        <p className="text-muted-foreground">
                            You agree not to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Use the platform for any illegal or unauthorized purpose</li>
                            <li>Harass, abuse, or harm other users</li>
                            <li>Attempt to gain unauthorized access to the platform or other users' accounts</li>
                            <li>Post spam, malware, or other malicious content</li>
                            <li>Impersonate another person or entity</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
                        <p className="text-muted-foreground">
                            The HeyStack platform, including its design, features, and functionality, is owned by HeyStack and is
                            protected by copyright, trademark, and other intellectual property laws.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">7. Disclaimer of Warranties</h2>
                        <p className="text-muted-foreground">
                            HeyStack is provided "as is" and "as available" without warranties of any kind, either express or implied.
                            We do not guarantee that the platform will be uninterrupted, secure, or error-free.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
                        <p className="text-muted-foreground">
                            To the fullest extent permitted by law, HeyStack shall not be liable for any indirect, incidental,
                            special, or consequential damages arising out of or in connection with your use of the platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
                        <p className="text-muted-foreground">
                            We reserve the right to modify these Terms at any time. We will notify users of any material changes
                            by posting the updated Terms on this page. Your continued use of HeyStack after such changes constitutes
                            your acceptance of the new Terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">10. Contact Information</h2>
                        <p className="text-muted-foreground">
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <p className="text-muted-foreground font-medium">
                            support@heystack.com
                        </p>
                    </section>

                    {/* Placeholder Notice */}
                    <div className="mt-12 p-6 border rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground text-center">
                            <strong>Note:</strong> This is a placeholder Terms of Service page.
                            The actual terms will be finalized and reviewed by legal counsel before the platform launch.
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
