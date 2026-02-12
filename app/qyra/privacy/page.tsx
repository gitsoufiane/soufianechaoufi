import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Qyra",
  description:
    "Privacy policy for Qyra, the QR code generator and scanner app.",
};

export default function QyraPrivacyPolicy() {
  return (
    <article className="prose prose-invert mx-auto max-w-3xl py-16">
      <h1>Privacy Policy — Qyra</h1>
      <p className="text-muted-foreground">Last updated: February 12, 2025</p>

      <p>
        Qyra is a QR code generator and scanner app built by Soufiane Chaoufi.
        This policy explains how the app handles your data.
      </p>

      <h2>Data Collection</h2>
      <p>
        <strong>Qyra does not collect, transmit, or store any personal data on
        external servers.</strong> All data stays on your device.
      </p>

      <h3>Data Stored Locally</h3>
      <ul>
        <li>
          <strong>QR History</strong> — Generated and scanned QR codes are saved
          to your device using AsyncStorage for convenience. This includes the QR
          content (URLs, text, WiFi network names, contact details) and your
          chosen color customization.
        </li>
        <li>
          <strong>WiFi Passwords</strong> — If you generate a WiFi QR code, the
          network password is stored locally in your QR history. It is not
          encrypted and is never sent to any server.
        </li>
      </ul>

      <h3>Data Not Collected</h3>
      <ul>
        <li>No analytics or tracking</li>
        <li>No advertising identifiers</li>
        <li>No crash reports sent externally</li>
        <li>No account creation required</li>
        <li>No server-side storage</li>
      </ul>

      <h2>Camera Access</h2>
      <p>
        Qyra requests camera permission solely to scan QR codes. Camera data is
        processed on-device and is never recorded, stored, or transmitted.
      </p>

      <h2>Photo Library Access</h2>
      <p>
        Qyra may request photo library access to save generated QR code images to
        your gallery. No photos are read from your library.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        Qyra does not integrate with any third-party analytics, advertising, or
        tracking services. The app operates entirely offline after installation.
      </p>

      <h2>Data Deletion</h2>
      <p>
        You can clear your QR history at any time from within the app. Uninstalling
        the app removes all locally stored data permanently.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Qyra does not knowingly collect information from children under 13. The
        app does not collect any personal information from any user.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        This policy may be updated occasionally. Changes will be reflected on this
        page with an updated date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach out at{" "}
        <a href="mailto:contact@soufianechaoufi.com">
          contact@soufianechaoufi.com
        </a>
        .
      </p>
    </article>
  );
}
