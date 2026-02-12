import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Qyra",
  description:
    "Privacy policy for Qyra, the QR code generator and scanner app. We believe in privacy by design — your data stays on your device.",
};

export default function QyraPrivacyPolicy() {
  return (
    <article className="prose prose-invert mx-auto max-w-3xl py-16">
      <h1>Privacy Policy — Qyra</h1>
      <p className="text-muted-foreground">
        Effective: February 12, 2025 · Last updated: February 12, 2026
      </p>

      <h2>Overview</h2>
      <p>
        Qyra is a QR code generator and scanner app built by Soufiane Chaoufi.
        We believe in privacy by design — your data stays on your device. This
        policy explains how the app handles your information.
      </p>

      <h2>Data collection</h2>
      <p>
        <strong>
          We do not collect, transmit, or store any personal data on external
          servers.
        </strong>
      </p>

      <h3>What stays on your device</h3>
      <ul>
        <li>QR codes you generate and scan</li>
        <li>Your history and preferences</li>
        <li>Custom colors and settings</li>
      </ul>

      <h3>What we do not collect</h3>
      <ul>
        <li>No analytics or tracking</li>
        <li>No advertising identifiers</li>
        <li>No crash reports sent externally</li>
        <li>No account creation required</li>
        <li>No server-side storage</li>
      </ul>

      <h2>Permissions</h2>
      <ul>
        <li>
          <strong>Camera</strong> — Required to scan QR codes. Camera data is
          processed locally and never leaves your device.
        </li>
        <li>
          <strong>Photo Library</strong> — Optional. Only used when you choose
          to save a QR code image. No photos are read from your library.
        </li>
      </ul>

      <h2>Third-party services</h2>
      <p>Qyra does not use:</p>
      <ul>
        <li>Analytics or tracking services</li>
        <li>Advertising networks</li>
        <li>Cloud storage or sync</li>
        <li>User accounts or authentication</li>
      </ul>
      <p>The app operates entirely offline after installation.</p>

      <h2>Data storage and retention</h2>
      <p>
        All app data is stored locally on your device using standard system
        storage. Data persists until you manually clear it or uninstall the app.
        There is no automatic expiration — you are in full control.
      </p>

      <h2>Data deletion</h2>
      <p>
        You can clear your QR history at any time from within the app.
        Uninstalling the app permanently removes all associated data from your
        device. No data exists on any server, so there is nothing to delete
        remotely.
      </p>

      <h2>Security</h2>
      <p>
        Since Qyra never transmits data over the internet, your information is
        protected by your device&apos;s built-in security (device encryption,
        lock screen, biometrics). We recommend keeping your device&apos;s
        operating system up to date for the best protection.
      </p>

      <h2>Your rights</h2>
      <p>
        Because Qyra does not collect or process personal data on any server,
        most data protection rights are automatically satisfied:
      </p>
      <ul>
        <li>
          <strong>Access and portability</strong> — All your data is already on
          your device and accessible to you.
        </li>
        <li>
          <strong>Deletion</strong> — Clear your history in the app or uninstall
          to remove all data.
        </li>
        <li>
          <strong>Opt-out of data sharing</strong> — No data is shared with
          anyone. There is nothing to opt out of.
        </li>
      </ul>

      <h3>For users in the European Economic Area (GDPR)</h3>
      <p>
        Qyra does not collect, process, or store personal data on external
        servers. No data is transferred outside your device. As a result, GDPR
        obligations related to data processing, legal bases for processing, and
        cross-border data transfers do not apply. Should this change in the
        future, this policy will be updated accordingly.
      </p>

      <h3>For users in California (CCPA/CPRA)</h3>
      <p>
        Qyra does not sell, share, or disclose personal information to third
        parties. No personal information is collected for commercial purposes.
        California residents retain all rights under the CCPA/CPRA, though no
        action is required since no personal data is collected or processed
        externally.
      </p>

      <h2>International users</h2>
      <p>
        Qyra is available worldwide. Since all data remains on your device and
        no information is transferred to any server, there are no cross-border
        data transfers regardless of your location.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Qyra does not knowingly collect data from children under 13 (or the
        applicable age in your jurisdiction). The app does not collect personal
        information from any user and contains no age-restricted content.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy occasionally. Changes will be reflected in the
        &ldquo;Last updated&rdquo; date above. Continued use of the app after
        changes constitutes acceptance of the revised policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this privacy policy? Contact us at{" "}
        <a href="mailto:soufiane.chaoufi@gmail.com">
          soufiane.chaoufi@gmail.com
        </a>
        .
      </p>
    </article>
  );
}
