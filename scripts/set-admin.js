// Run after creating a Firebase Auth user.
// Usage:
//   npm install firebase-admin
//   set FIREBASE_SERVICE_ACCOUNT_JSON to the contents of your service account JSON
//   node scripts/set-admin.js user@example.com
//
// NEVER put the service account JSON in the website folder or commit it to GitHub.
const admin = require("firebase-admin");
const email = process.argv[2];
if(!email){console.error("Usage: node scripts/set-admin.js user@example.com");process.exit(1)}
const raw=process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if(!raw){console.error("Missing FIREBASE_SERVICE_ACCOUNT_JSON environment variable.");process.exit(1)}
admin.initializeApp({credential:admin.credential.cert(JSON.parse(raw))});
(async()=>{
  const user=await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid,{admin:true});
  await admin.firestore().collection("users").doc(user.uid).set({
    email:user.email||email, displayName:user.displayName||"", role:"admin",
    updatedAt:admin.firestore.FieldValue.serverTimestamp()
  },{merge:true});
  console.log(`Admin claim set for ${email}. Sign out and back in to refresh the token.`);
  process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
