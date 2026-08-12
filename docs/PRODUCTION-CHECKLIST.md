# HomeVault production checklist

## Authentication
- [ ] Email/password enabled
- [ ] Email verification implemented
- [ ] Password reset implemented
- [ ] Strong password policy communicated
- [ ] Admin claim assigned only from trusted Admin SDK
- [ ] Admin page protected by custom claim
- [ ] App Check enabled
- [ ] Unauthorised routes redirect to login

## Firestore
- [ ] Firestore rules deployed
- [ ] Test user A cannot read user B data
- [ ] Test user A cannot write user B data
- [ ] Test admin can access intended admin data
- [ ] Review indexes and query costs
- [ ] Configure backups before launch

## Storage
- [ ] Storage rules deployed
- [ ] Test user A cannot download user B files
- [ ] File size limits confirmed
- [ ] Allowed file types validated in production
- [ ] Upload/download metadata stored in Firestore
- [ ] Delete removes both Firestore record and Storage file

## Notifications
- [ ] Cloud Functions / server-side email provider
- [ ] Reminder scheduling
- [ ] Email verification
- [ ] Password reset
- [ ] Reminder unsubscribe/preferences

## Privacy
- [ ] Privacy policy
- [ ] Terms
- [ ] Data retention/deletion process
- [ ] Account deletion
- [ ] Export my data
- [ ] GDPR review for UK users
