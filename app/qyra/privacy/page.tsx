import type { Metadata } from "next";
import {
  Shield,
  Smartphone,
  Eye,
  EyeOff,
  Camera,
  Image,
  Lock,
  Trash2,
  Globe,
  Baby,
  RefreshCw,
  Mail,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Qyra",
  description:
    "Privacy policy for Qyra, the QR code generator and scanner app. We believe in privacy by design — your data stays on your device.",
};

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
          <Icon className="text-muted-foreground size-[18px]" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="text-muted-foreground space-y-3 pl-12 text-[15px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function QyraPrivacyPolicy() {
  return (
    <div className="mx-auto max-w-2xl py-16">
      {/* Back link */}
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground mb-12 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Back
      </Link>

      {/* Header */}
      <header className="mt-8 mb-12">
        <div className="bg-muted mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm">
          <Shield className="size-3.5" />
          Privacy by design
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Qyra — QR Code Generator & Scanner
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          Effective February 12, 2025 · Updated February 12, 2026
        </p>
      </header>

      {/* Content */}
      <div className="space-y-10">
        <Section icon={Smartphone} title="Overview">
          <p>
            Qyra is a QR code generator and scanner built by Soufiane Chaoufi.
            Your data stays on your device — we don&apos;t collect, transmit, or
            store any personal data on external servers.
          </p>
        </Section>

        <Section icon={Eye} title="What stays on your device">
          <ul className="list-inside list-disc space-y-1.5">
            <li>QR codes you generate and scan</li>
            <li>Your history and preferences</li>
            <li>Custom colors and settings</li>
          </ul>
        </Section>

        <Section icon={EyeOff} title="What we don't collect">
          <ul className="list-inside list-disc space-y-1.5">
            <li>No analytics or tracking</li>
            <li>No advertising identifiers</li>
            <li>No crash reports sent externally</li>
            <li>No account creation required</li>
            <li>No server-side storage</li>
          </ul>
        </Section>

        <Section icon={Camera} title="Permissions">
          <ul className="space-y-3">
            <li>
              <span className="text-foreground font-medium">Camera</span> —
              Required to scan QR codes. Camera data is processed locally and
              never leaves your device.
            </li>
            <li className="flex items-start gap-0">
              <span>
                <span className="text-foreground font-medium">
                  <Image className="mr-1.5 -mt-0.5 inline size-3.5" />
                  Photo Library
                </span>{" "}
                — Optional. Only used when you save a QR code image. No photos
                are read from your library.
              </span>
            </li>
          </ul>
        </Section>

        {/* Divider */}
        <div className="border-border border-t" />

        <Section icon={Lock} title="Third-party services">
          <p>
            Qyra does not use analytics, advertising networks, cloud storage, or
            user authentication. The app operates entirely offline after
            installation.
          </p>
        </Section>

        <Section icon={Smartphone} title="Data storage & retention">
          <p>
            All data is stored locally using standard system storage. Data
            persists until you clear it or uninstall the app. There is no
            automatic expiration — you are in full control.
          </p>
        </Section>

        <Section icon={Trash2} title="Data deletion">
          <p>
            Clear your QR history anytime from within the app. Uninstalling
            permanently removes all data from your device. No data exists on any
            server.
          </p>
        </Section>

        <Section icon={Shield} title="Security">
          <p>
            Since Qyra never transmits data over the internet, your information
            is protected by your device&apos;s built-in security — encryption,
            lock screen, and biometrics. Keep your OS up to date for the best
            protection.
          </p>
        </Section>

        {/* Divider */}
        <div className="border-border border-t" />

        <Section icon={Globe} title="Your rights">
          <p>
            Because Qyra doesn&apos;t collect or process personal data on any
            server, most data protection rights are automatically satisfied:
          </p>
          <ul className="space-y-2">
            <li>
              <span className="text-foreground font-medium">
                Access & portability
              </span>{" "}
              — All your data is already on your device.
            </li>
            <li>
              <span className="text-foreground font-medium">Deletion</span> —
              Clear history in the app or uninstall.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Opt-out of data sharing
              </span>{" "}
              — No data is shared. Nothing to opt out of.
            </li>
          </ul>

          <div className="bg-muted/50 mt-4 space-y-4 rounded-lg p-4">
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                European Economic Area (GDPR)
              </p>
              <p className="text-sm">
                No personal data is collected, processed, or stored externally.
                No cross-border transfers occur. Should this change, this policy
                will be updated.
              </p>
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                California (CCPA/CPRA)
              </p>
              <p className="text-sm">
                No personal information is sold, shared, or disclosed to third
                parties. California residents retain all rights under CCPA/CPRA.
              </p>
            </div>
          </div>
        </Section>

        <Section icon={Globe} title="International users">
          <p>
            Qyra is available worldwide. Since all data remains on your device,
            there are no cross-border data transfers regardless of your location.
          </p>
        </Section>

        <Section icon={Baby} title="Children's privacy">
          <p>
            Qyra does not collect data from children under 13 (or the applicable
            age in your jurisdiction). The app collects no personal information
            from any user and contains no age-restricted content.
          </p>
        </Section>

        {/* Divider */}
        <div className="border-border border-t" />

        <Section icon={RefreshCw} title="Changes to this policy">
          <p>
            We may update this policy occasionally. Changes will be reflected in
            the &ldquo;Updated&rdquo; date above. Continued use of the app
            constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section icon={Mail} title="Contact">
          <p>
            Questions?{" "}
            <a
              href="mailto:soufiane.chaoufi@gmail.com"
              className="text-foreground underline underline-offset-4 transition-colors hover:no-underline"
            >
              soufiane.chaoufi@gmail.com
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
}
