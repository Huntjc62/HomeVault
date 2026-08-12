# Admin scripts

These scripts use the Firebase Admin SDK and must never be shipped to the browser.

## Set an admin claim

```bash
npm install
node set-admin.js admin@example.com
```

Before running, provide `FIREBASE_SERVICE_ACCOUNT_JSON` in your shell environment.

The service-account key must never be committed to GitHub.
