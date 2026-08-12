# HomeVault V2

A multi-page HomeVault MVP prototype.

## Included
- Separate HTML page for every navigation item
- Shared visual system in `assets/styles.css`
- Shared data/auth logic in `assets/app.js`
- Admin account: `admin` / `admin`
- User registration
- Browser-local persistence with localStorage
- Home ownership/rental profile
- Boiler and service history
- Vehicle and history
- Appliances
- Documents/scanner prototype
- Reminders
- Home + Personal expenses
- One-off / Monthly / Yearly expenses
- Direct Debit payment method
- Home monthly cost
- Personal monthly cost
- Combined monthly cost
- Next-month projection
- Editable/deletable expenses
- Home timeline
- Admin dashboard and JSON export

## Run
Open `login.html` in a browser. For a hosted version, deploy the folder to GitHub Pages or another static host.

## Demo login
Username: `admin`
Password: `admin`

## Important
This is a functional browser prototype, not a production SaaS backend. Data is stored locally in the browser. Documents currently store document metadata/filename only. Production should use authenticated database storage, private cloud file storage, real email/browser notifications, and server-side security.
