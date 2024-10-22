import React from 'react';

export default function ThankYou() {
  return (
    <div>
      <header className="sticky-top">
        <h1>Settings</h1>
        <div className="actions">
          <button className="button accent" type="button">
            <span className="icon icon-save"></span>Update settings
          </button>
        </div>
        <div role="tablist">
          <a role="tab" href="/settings" aria-selected="false">
            Settings
          </a>
          <a role="tab" href="/settings/profile" aria-selected="false">
            Profile
          </a>
          <a role="tab" href="/settings/team" aria-selected="false">
            Team
          </a>
          <a role="tab" href="/settings/payments" aria-selected="false">
            Payments
          </a>
          <a role="tab" href="/settings/llc" aria-selected="true">
            LLC
          </a>
          <a
            role="tab"
            href="/settings/authorized_applications"
            aria-selected="false"
          >
            Applications
          </a>
          <a role="tab" href="/settings/password" aria-selected="false">
            Password
          </a>
          <a
            role="tab"
            href="/settings/third_party_analytics"
            aria-selected="false"
          >
            Third-party analytics
          </a>
          <a role="tab" href="/settings/advanced" aria-selected="false">
            Advanced
          </a>
        </div>
      </header>

      <main>
        <section style={{ padding: '2rem', textAlign: 'center' }}>
          <header>
            <h2>Thank You!</h2>
          </header>
          <p>
            Your request has been submitted successfully. You will receive an email to confirm when it is completed.
          </p>
        </section>
      </main>
    </div>
  );
}