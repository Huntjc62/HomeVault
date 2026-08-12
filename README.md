# HomeVault V3 — Firebase Edition

HomeVault is now structured as a real authenticated web-app prototype.

## Backend
- Firebase Authentication — email/password accounts
- Cloud Firestore — user data
- Cloud Storage — private document storage foundation
- Firebase Security Rules — per-user access control
- Firebase custom claims — admin access

## Pages
Every navigation item remains a separate page:
dashboard.html
home.html
boiler.html
vehicle.html
appliances.html
documents.html
scanner.html
reminders.html
expenses.html
timeline.html
admin.html

## Authentication
The old hard-coded `admin / admin` login has intentionally been removed.

Create the real admin account in Firebase Authentication, then run `scripts/set-admin.js` to give that account the `admin: true` custom claim.

## Expenses
- Home or Personal
- One-off / Monthly / Yearly
- Direct Debit and other payment methods
- Edit/delete
- Home monthly cost
- Personal monthly cost
- Combined monthly cost
- Next-month projection
- Firestore persistence per authenticated user

## Data model
Each user gets a UID-owned Firestore namespace:

users/{uid}/{collection}/{recordId}

This means one user's home, expenses, documents, vehicles etc. are isolated from another user's data by Firestore Security Rules.

## Setup
Read **README-FIREBASE.md** before running the app.

The Firebase web config belongs in:
`assets/firebase-config.js`

Never commit a Firebase Admin service-account JSON file.

## Official Firebase references
- Authentication: https://firebase.google.com/docs/auth/web/start
- Firestore: https://firebase.google.com/docs/firestore
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security
- Storage Security Rules: https://firebase.google.com/docs/storage/security
- Custom claims: https://firebase.google.com/docs/auth/admin/custom-claims


## Firebase project

This package is preconfigured for the supplied Firebase project `homevault-40559`.
Before using authentication/database features, enable Email/Password Authentication,
create Firestore, create Storage, and deploy the included `firestore.rules` and
`storage.rules`.

For production, move the app to an npm/Vite build and use the modular Firebase SDK.


## Current backend status

HomeVault V4 is a Firebase-backed GitHub Pages application. Authentication uses Firebase Auth, records use Cloud Firestore, and document files use Firebase Storage. The app no longer depends on browser localStorage for its core records.

For the account you manually created in Firebase, set the Firestore profile `role` to `admin` to enable the Admin area in this build.
