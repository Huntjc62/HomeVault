# HomeVault — Firebase setup

This version moves authentication and user data from browser localStorage to Firebase Authentication + Cloud Firestore. Cloud Storage is included for the production document-upload path.

Firebase's current web documentation recommends the modular API for new applications; this package uses the CDN **compat** API deliberately so the existing multi-page HTML prototype can be connected without adding a build system. Firebase documents CDN as a simple option for apps without a bundler. See the official docs linked in the main README.

## 1. Create the Firebase project

1. Open the Firebase console.
2. Create a new project, e.g. `homevault-production`.
3. Add a **Web app** to the project.
4. Copy the web config object.
5. Copy `assets/firebase-config.example.js` to `assets/firebase-config.js`.
6. Replace the placeholders with your web config.

Do not put a Firebase Admin SDK service-account JSON file in this website.

## 2. Enable Authentication

In Firebase Console:

Authentication → Sign-in method → Email/Password → Enable.

Then create your first account in Authentication → Users.

HomeVault no longer uses the old browser-only `admin / admin` login. Firebase email/password accounts are the real accounts now. Use a real email address and a password of at least 6 characters.

Recommended first admin account:
- Email: your admin email
- Password: a strong password you choose

## 3. Create Firestore

Firebase Console → Firestore Database → Create database.

Choose your production region carefully because it is difficult to change later.

Deploy `firestore.rules`.

The data structure is:

users/{uid}
  homes/{recordId}
  boilers/{recordId}
  vehicles/{recordId}
  appliances/{recordId}
  documents/{recordId}
  reminders/{recordId}
  expenses/{recordId}
  timelineEvents/{recordId}
  activity/{recordId}

This keeps each user's records under their Firebase Auth UID.

## 4. Set up Storage

Firebase Console → Storage → Get started.

Deploy `storage.rules`.

Files should eventually use paths such as:

users/{uid}/documents/{documentId}/{filename}
users/{uid}/property/{filename}

The rules restrict access to the owner UID or an admin claim and limit uploads to 10 MB.

## 5. Install Firebase CLI

Install Node.js first if it is not already installed.

Then:

```bash
npm install -g firebase-tools
firebase login
```

From the HomeVault project folder:

```bash
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes,storage
```

If Firebase asks for a project, select the HomeVault Firebase project you created.

## 6. Create the admin user

Create the admin user in Firebase Authentication first.

Then use the included Admin SDK script.

From `scripts/`:

```bash
npm install
```

Create a Firebase service account in:
Firebase Console → Project settings → Service accounts → Generate new private key.

Keep the downloaded JSON private.

Set it as an environment variable and run:

```bash
node set-admin.js admin@example.com
```

The script gives that Firebase Auth account the custom claim:

```text
admin: true
```

HomeVault's Admin page checks this claim. Do not try to make someone an admin by editing browser JavaScript or local storage.

After setting the claim, sign out and sign back in so the refreshed ID token contains the claim.

## 7. Deploy the website

For GitHub Pages, the simplest route is to upload the HomeVault folder to a repository and enable Pages.

For Firebase Hosting:

```bash
firebase init hosting
firebase deploy --only hosting
```

The included `firebase.json` already points Hosting at the project root.

## 8. Important security notes

- Firebase web config is not a password. It identifies your Firebase project. Real protection comes from Authentication and Security Rules.
- Never expose a Firebase Admin SDK service-account key in the website.
- Never use `allow read, write: if request.auth != null` for all users' data. HomeVault's rules restrict records by UID.
- Admin privileges use a Firebase custom claim, set only from a trusted Admin SDK environment.
- Consider enabling Firebase App Check before production launch.
- Before launch, test rules with Firebase's Rules Playground / Emulator Suite.
- Documents need Cloud Storage. Firestore should store document metadata and the Storage path/download URL, not the binary file itself.

## 9. Local development

Do not double-click HTML files if the browser blocks Firebase modules/resources. Run a local web server.

For example:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000/login.html

If using Firebase Authentication, add your local development domain/localhost to the authorised domains in Firebase Authentication settings if required.

## 10. Production roadmap

Next backend steps:
1. Firebase Authentication
2. Firestore per-user records
3. Cloud Storage for documents
4. Real document upload/download
5. Email verification and password reset
6. Admin user management
7. Firebase App Check
8. Cloud Functions for reminders/email
9. Subscription/billing
10. Automated backups/export
