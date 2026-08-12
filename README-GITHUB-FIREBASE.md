# HomeVault — GitHub Pages + Firebase

## What is now live in this package

- Firebase Email/Password Authentication
- Firebase UID-based user profiles
- Cloud Firestore persistence for all HomeVault records
- Firebase Storage uploads for documents
- Home/Personal/Combined expense calculations from Firestore-backed data
- Owner/renter home profiles
- Boiler, vehicle, appliances, reminders and timeline data
- Firestore-backed Admin area
- Admin role enabled by `users/{YOUR_UID}.role = "admin"`
- Separate HTML page per navigation item

## Your current setup

Firebase project: `homevault-40559`

The supplied web configuration is already in:

`assets/firebase-config.js`

## 1. Firebase Authentication

In Firebase Console:

Authentication → Sign-in method → Email/Password → Enabled.

Create your own user under:

Authentication → Users → Add user.

## 2. Firestore user profile

For your admin account, create:

`users/{YOUR_FIREBASE_UID}`

Fields:

- `email` — string
- `displayName` — string
- `role` — string: `admin`
- `createdAt` — timestamp

Normal registrations automatically create their own profile with `role: "user"`.

## 3. Firestore rules

Deploy `firestore.rules`.

These rules allow a signed-in user to access only their own records under:

`users/{uid}/...`

The manually seeded `role: "admin"` profile is recognised as an admin by the rules. Normal users cannot change their own role from `user` to `admin`.

For maximum production security, migrate admin authorisation to Firebase custom claims before launch.

## 4. Storage

Create Firebase Storage and deploy `storage.rules`.

Documents are stored at:

`users/{uid}/documents/{documentId}/{filename}`

Firestore stores the document metadata and Storage path.

## 5. GitHub Pages

Push the entire package to your GitHub repository.

Then:

GitHub → Repository → Settings → Pages

Choose:

- Deploy from a branch
- Your main branch
- `/ (root)`

HomeVault can then be opened from the GitHub Pages URL.

## 6. Important GitHub rule

Never commit:

- Firebase Admin SDK service-account JSON
- Private keys
- API tokens
- passwords

The Firebase Web SDK configuration in `assets/firebase-config.js` is intended for the browser. Security comes from Firebase Authentication and the rules.

## 7. Test

1. Open the GitHub Pages URL.
2. Register a second test account.
3. Log in.
4. Add a home.
5. Add a boiler.
6. Add an appliance.
7. Add a vehicle.
8. Add a reminder.
9. Add home and personal expenses.
10. Refresh.
11. Log out.
12. Log back in.
13. Confirm the records are still present.
14. Upload a document.
15. Open it again from Documents.
16. Log in as another user and confirm they cannot see the first user's records.

## 8. If something does not save

Open browser Developer Tools → Console.

Common causes:
- Firestore rules have not been deployed.
- Storage has not been enabled.
- Authentication Email/Password is disabled.
- GitHub Pages is serving an old cached version.
- The Firebase project config does not match the Firebase project.

## 9. Recommended next production work

- Email verification
- Password reset
- Account deletion
- Firebase App Check
- Custom-claim admin roles
- Cloud Functions for email reminders
- Automated backups
- GDPR data export/deletion
- Subscription/billing
