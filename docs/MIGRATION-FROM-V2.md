# Migration from HomeVault V2

V2 stored records in browser localStorage. V3 uses Firebase Authentication and Cloud Firestore.

The V3 package intentionally does not automatically copy V2 localStorage data into Firebase because doing that without an explicit user-authentication step could put the wrong browser data into the wrong account.

If you need to preserve V2 demo records:
1. Open the V2 app in the same browser.
2. Use Admin → Export data.
3. Sign into the V3 account.
4. Import the JSON through a future authenticated migration tool, or manually recreate the records.

A production migration tool should be built as an authenticated admin-only workflow.
