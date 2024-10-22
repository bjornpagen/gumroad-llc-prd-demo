import { useState } from 'react';

export default function Home() {
  const [entity, setEntity] = useState({
    state: '',
    name: '',
    email: '',
    phone: '',
  });

  const [address, setAddress] = useState({
    attn: '',
    address_line1: '',
    address_line2: '',
    city_town: '',
    state: '',
    zip5: '',
    zip4: '',
    country: 'United States',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { entity, address };

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Application submitted successfully!');
    } else {
      alert('Failed to submit application.');
    }
  };

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
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Entity Information Section */}
          <section>
            <header>
              <h2>Entity Information</h2>
            </header>

            {/* State Selection Field */}
            <fieldset>
              <legend>
                <label htmlFor="state-selection">State of LLC</label>
              </legend>
              <select
                id="state-selection"
                name="entity[state]"
                value={entity.state}
                onChange={(e) =>
                  setEntity({ ...entity, state: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Select State
                </option>
                {/* Add state options */}
                {[
                  'AL',
                  'AK',
                  'AZ',
                  'AR',
                  'CA',
                  'CO',
                  'CT',
                  'DE',
                  'FL',
                  'GA',
                  'HI',
                  'ID',
                  'IL',
                  'IN',
                  'IA',
                  'KS',
                  'KY',
                  'LA',
                  'ME',
                  'MD',
                  'MA',
                  'MI',
                  'MN',
                  'MS',
                  'MO',
                  'MT',
                  'NE',
                  'NV',
                  'NH',
                  'NJ',
                  'NM',
                  'NY',
                  'NC',
                  'ND',
                  'OH',
                  'OK',
                  'OR',
                  'PA',
                  'RI',
                  'SC',
                  'SD',
                  'TN',
                  'TX',
                  'UT',
                  'VT',
                  'VA',
                  'WA',
                  'WV',
                  'WI',
                  'WY',
                ].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Company Name Field */}
            <fieldset>
              <legend>
                <label htmlFor="entity-name">Company Name</label>
              </legend>
              <input
                type="text"
                id="entity-name"
                name="entity[name]"
                placeholder="Company Name"
                value={entity.name}
                onChange={(e) =>
                  setEntity({ ...entity, name: e.target.value })
                }
                required
              />
            </fieldset>

            {/* Existing fields */}
            <div className="form-row">
              <fieldset>
                <legend>
                  <label htmlFor="entity-email">Company Email</label>
                </legend>
                <input
                  type="email"
                  id="entity-email"
                  name="entity[email]"
                  placeholder="Company Email"
                  value={entity.email}
                  onChange={(e) =>
                    setEntity({ ...entity, email: e.target.value })
                  }
                  required
                />
              </fieldset>
              <fieldset>
                <legend>
                  <label htmlFor="entity-phone">Company Phone</label>
                </legend>
                <input
                  type="tel"
                  id="entity-phone"
                  name="entity[phone]"
                  placeholder="Company Phone"
                  value={entity.phone}
                  onChange={(e) =>
                    setEntity({ ...entity, phone: e.target.value })
                  }
                  required
                />
              </fieldset>
            </div>
          </section>

          {/* Principal Office Address Section */}
          <section>
            <header>
              <h2>Principal Office Address</h2>
            </header>
            <fieldset>
              <legend>
                <label htmlFor="address-attn">Attention (optional)</label>
              </legend>
              <input
                type="text"
                id="address-attn"
                name="address[attn]"
                placeholder="Attention"
                value={address.attn}
                onChange={(e) =>
                  setAddress({ ...address, attn: e.target.value })
                }
              />
            </fieldset>
            <fieldset>
              <legend>
                <label htmlFor="address-line1">Address Line 1</label>
              </legend>
              <input
                type="text"
                id="address-line1"
                name="address[address_line1]"
                placeholder="Address Line 1"
                value={address.address_line1}
                onChange={(e) =>
                  setAddress({ ...address, address_line1: e.target.value })
                }
                required
              />
            </fieldset>
            <fieldset>
              <legend>
                <label htmlFor="address-line2">Address Line 2 (optional)</label>
              </legend>
              <input
                type="text"
                id="address-line2"
                name="address[address_line2]"
                placeholder="Address Line 2"
                value={address.address_line2}
                onChange={(e) =>
                  setAddress({ ...address, address_line2: e.target.value })
                }
              />
            </fieldset>
            <div className="form-row">
              <fieldset>
                <legend>
                  <label htmlFor="address-city">City/Town</label>
                </legend>
                <input
                  type="text"
                  id="address-city"
                  name="address[city_town]"
                  placeholder="City/Town"
                  value={address.city_town}
                  onChange={(e) =>
                    setAddress({ ...address, city_town: e.target.value })
                  }
                  required
                />
              </fieldset>
              <fieldset>
                <legend>
                  <label htmlFor="address-state">State</label>
                </legend>
                <input
                  type="text"
                  id="address-state"
                  name="address[state]"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                />
              </fieldset>
            </div>
            <div className="form-row">
              <fieldset>
                <legend>
                  <label htmlFor="address-zip5">ZIP Code</label>
                </legend>
                <input
                  type="text"
                  id="address-zip5"
                  name="address[zip5]"
                  placeholder="ZIP Code"
                  pattern="\d{5}"
                  value={address.zip5}
                  onChange={(e) =>
                    setAddress({ ...address, zip5: e.target.value })
                  }
                  required
                />
              </fieldset>
              <fieldset>
                <legend>
                  <label htmlFor="address-zip4">ZIP+4 (optional)</label>
                </legend>
                <input
                  type="text"
                  id="address-zip4"
                  name="address[zip4]"
                  placeholder="ZIP+4"
                  pattern="\d{4}"
                  value={address.zip4}
                  onChange={(e) =>
                    setAddress({ ...address, zip4: e.target.value })
                  }
                />
              </fieldset>
            </div>
            <fieldset>
              <legend>
                <label htmlFor="address-country">Country</label>
              </legend>
              <input
                type="text"
                id="address-country"
                name="address[country]"
                placeholder="Country"
                value={address.country}
                readOnly
                required
              />
            </fieldset>
          </section>

          {/* Submit Button */}
          <button className="button accent" type="submit">
            Submit Application
          </button>
        </form>
      </main>
    </div>
  );
}