# HomeVault V1 MVP

**Your home, organised.**

HomeVault is a first-version digital home records system designed to prove whether people want one place to store their home's important information, documents and reminders.

## V1 objective

The purpose of this MVP is to validate the core proposition:

> **HomeVault tells you what you need to remember about your home.**

This package is intentionally front-end focused. It can be opened locally or deployed as a static website.

## What's included

### Dashboard
- Home overview
- Needs attention alerts
- Upcoming reminders
- Boiler, vehicle, appliance and document summaries
- Quick-add action

### Home
- Property name
- Address
- Property type
- Purchase date
- Year built
- Bedrooms
- Home insurance expiry
- Notes
- Property photo
- Owned or rented status
- Renter-specific tenancy information

### Boiler
- Manufacturer
- Model
- Serial number
- Installation date
- Installer
- Installation cost
- Warranty expiry
- Last service
- Next service
- Notes
- Service history
- Service costs

### Vehicle
- Registration
- Make
- Model
- Year
- Mileage
- MOT expiry
- Insurance expiry
- Tax renewal
- Service due
- Service, repair and MOT history

### Appliances
- Fridge
- Freezer
- Washing machine
- Dishwasher
- Oven
- Tumble dryer
- Boiler
- TV
- Other
- Purchase information
- Warranty information
- Receipt/warranty upload field

### Documents
- Home insurance
- Tenancy agreements
- Deposit certificates
- Inventory / check-in reports
- Landlord correspondence
- Mortgage
- Boiler documents
- Electrical certificates
- Gas certificates
- EPC
- Property documents
- Receipts
- Warranties
- Manuals
- Other

### Home Timeline
- Automatically builds a property history from home, boiler, vehicle, appliance, document and expense records
- Year-by-year timeline
- Manual timeline events
- Purchases, servicing, repairs, renewals and improvements
- Timeline detail and related-record information

### Expenses
- Home cost tracking
- Vehicle costs
- Boiler costs
- Appliance costs
- Repairs
- Home monthly cost
- Personal monthly cost
- Combined monthly cost
- Estimated annual total
- Regular monthly cost calculation
- Current-month one-off spend
- Monthly and yearly recurring costs
- Category breakdown
- Expense history
- Direct Debit payment method
- Receipt filename capture

### Smart reminders
- Automatic reminders from stored dates
- Customisable 30 / 14 / 7 / 1 day intervals
- Manual reminders
- Dashboard alerts
- Notification preview
- Email/browser notification settings ready for production integration

### Admin
- Basic user count
- Home count
- Record count
- Document count
- Activity log
- Demo-data reset

## Demo login

Username:

`admin`

Password:

`admin`

**Important:** this login is deliberately hard-coded for the V1 prototype. It is NOT suitable for production authentication.

## How to run

### Option 1 — Open locally

Double-click:

`index.html`

The app will run in your browser.

### Option 2 — VS Code

1. Open the `HomeVault-V1` folder in VS Code.
2. Open `index.html`.
3. Use a local server extension such as Live Server, or open the file directly in your browser.

### Option 3 — GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this folder.
3. Make sure `index.html` is in the repository root.
4. Enable GitHub Pages from the repository settings.
5. Select the main branch/root folder.
6. Open the generated Pages URL.

## Current data architecture

The V1 prototype uses browser `localStorage`.

That means:
- Data survives browser refreshes.
- Data is stored locally on the device/browser.
- Different browsers/devices do not share data.
- There is no real user database.
- There is no real cloud document storage.
- There is no secure production authentication.

This is intentional for the first prototype.

## Recommended V2 architecture

When the MVP is validated, replace local browser storage with a proper backend.

Recommended structure:

```text
HomeVault
│
├── Frontend
│   ├── Dashboard
│   ├── Home
│   ├── Boiler
│   ├── Vehicles
│   ├── Appliances
│   ├── Documents
│   ├── Reminders
│   └── Account
│
├── Authentication
│   ├── Registration
│   ├── Login
│   ├── Password reset
│   └── Email verification
│
├── Database
│   ├── Users
│   ├── Homes
│   ├── Boilers
│   ├── Vehicles
│   ├── Appliances
│   ├── Documents
│   ├── Reminders
│   └── Activity
│
├── Storage
│   └── Uploaded documents/photos
│
└── Notifications
    ├── Email
    ├── Push notifications
    └── Reminder engine
```

## Suggested production stack

A practical next step would be:

- Frontend: React / Next.js
- Authentication: Supabase Auth or equivalent
- Database: PostgreSQL
- File storage: Supabase Storage or equivalent
- Hosting: Vercel
- Email: Resend or equivalent
- Analytics: PostHog / GA4
- Error monitoring: Sentry

The exact stack can be changed once the MVP has been tested.

## Security warning

Do not use the V1 admin credentials for a real public service.

Before launch, the application needs:
- Server-side authentication
- Password hashing
- User sessions
- Authorisation rules
- Database security policies
- Private document storage
- Secure file upload validation
- HTTPS
- Rate limiting
- Account recovery
- Privacy policy
- Terms and conditions
- GDPR controls
- Data deletion/export
- Audit logging

## V1 validation

Before investing heavily in V2, test:

1. Do people understand the product immediately?
2. Will they create their home?
3. Which record type do they add first?
4. Do they add a boiler?
5. Do they add their vehicle?
6. Do they upload documents?
7. Do reminders make the product more useful?
8. Do users return after the first setup?
9. Which feature would make them pay?
10. Would they recommend HomeVault?

## Suggested V1 success metrics

Track:

- Registrations
- Homes created
- Boiler records created
- Vehicle records created
- Appliances added
- Documents uploaded
- Reminders created
- Returning users
- 7-day retention
- 30-day retention
- Free-to-paid conversion once subscriptions exist

## Roadmap

### Phase 5 — Home Timeline
- [x] Automatic timeline generation
- [x] Year-by-year history
- [x] Manual timeline events
- [x] Related record and cost information
- [x] Dashboard timeline summary
- [ ] Timeline filters
- [ ] Property milestone view
- [ ] Export property history

### Phase 4 — Expenses
- [x] Expense records
- [x] Annual home cost total
- [x] Category breakdown
- [x] Expense history
- [x] Receipt upload field
- [ ] Receipt storage in cloud
- [ ] Charts and long-term cost analysis

### Phase 2 — Make it genuinely useful
- [x] Smart reminder intervals
- [x] Customisable reminder settings
- [x] Notification preview
- [x] Email/browser notification preferences
- [x] Document scanning workflow prototype

### Phase 3 — Document scanning
- [x] Scan/upload document interface
- [x] OCR/AI extraction workflow prototype
- [x] Extracted-field confirmation flow
- [ ] Connect production OCR
- [ ] Connect production AI extraction
- [ ] Automatic record matching

### V1 — Prototype
- [x] Dashboard
- [x] Home
- [x] Boiler
- [x] Vehicle
- [x] Appliances
- [x] Documents
- [x] Reminders
- [x] Admin prototype
- [x] Owned/rented home profiles
- [x] Renter-specific reminders and documents
- [x] Local data storage

### V1.1 — User testing
- [ ] Improve onboarding
- [ ] Improve mobile experience
- [ ] Add sample/demo data
- [ ] Test with real households
- [ ] Capture feedback
- [ ] Measure feature usage

### V2 — Real application
- [ ] Real registration
- [ ] Secure login
- [ ] Cloud database
- [ ] Cloud document storage
- [ ] Multiple users
- [ ] Email verification
- [ ] Password reset
- [ ] User accounts
- [ ] Proper reminders
- [ ] Email notifications
- [ ] Push notifications

### V3 — Commercial product
- [ ] Subscription system
- [ ] Free plan
- [ ] Premium plan
- [ ] Payment processing
- [ ] Advanced document organisation
- [ ] Household sharing
- [ ] More asset types
- [ ] Reporting
- [ ] Analytics
- [ ] Production admin dashboard

## File structure

```text
HomeVault-V1/
│
├── index.html
├── README.md
├── CHANGELOG.md
├── LICENSE.txt
├── .gitignore
│
├── assets/
│   └── README.md
│
└── docs/
    ├── PRODUCT-ROADMAP.md
    ├── TECHNICAL-NOTES.md
    └── TESTING-CHECKLIST.md
```

## Ownership

HomeVault is the working product concept represented by this prototype.

This package is intended as an MVP starting point and should be treated as prototype software rather than production-ready infrastructure.
