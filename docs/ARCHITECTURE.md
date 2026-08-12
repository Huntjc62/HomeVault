# Architecture

Each navigation item has its own HTML page:
- dashboard.html
- home.html
- boiler.html
- vehicle.html
- appliances.html
- documents.html
- scanner.html
- reminders.html
- expenses.html
- timeline.html
- admin.html

Shared:
- assets/styles.css — visual system
- assets/app.js — authentication, persistence, common UI and expense engine

Data:
- localStorage key: `homevault_v2`
- sessionStorage key: `homevault_session`

The next production step is replacing localStorage with a real backend such as Firebase or Supabase, with per-user security rules and private file storage.
