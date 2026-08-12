# HomeVault V3 architecture

## Client
Static multi-page HTML/CSS/JS.

## Authentication
Firebase Authentication with Email/Password.

## Database
Cloud Firestore:

users/{uid}
  homes/
  boilers/
  vehicles/
  appliances/
  documents/
  reminders/
  expenses/
  timelineEvents/
  activity/

## Files
Cloud Storage:

users/{uid}/...

Firestore stores metadata and relationships; Storage stores binary files.

## Authorisation
Firestore and Storage rules check `request.auth.uid == userId`.

Admin access is granted using the Firebase Auth custom claim `admin: true`, set by the Firebase Admin SDK. Custom claims are for access control, not general profile data.

## Why this structure
Each user's records are isolated under their Firebase UID. It also gives us a clean path to add sharing later without rewriting the entire database.
