# Technical Notes

## Current architecture

The prototype is intentionally a single HTML file.

```text
index.html
 ├── HTML structure
 ├── CSS
 └── JavaScript
      └── localStorage
```

## Current authentication

The prototype checks:

```text
username: admin
password: admin
```

Authentication is client-side and therefore not secure.

## Current persistence

Data is saved under:

```text
homevault_mvp_v1
```

in browser localStorage.

## Production migration

The localStorage state should eventually map to database tables such as:

### users
- id
- email
- password_hash
- name
- created_at

### homes
- id
- user_id
- name
- address
- property_type
- purchase_date
- year_built
- notes
- photo_url
- tenure
- landlord
- landlord_contact
- tenancy_start
- tenancy_end
- rent
- deposit
- deposit_scheme
- rent_review
- gas_safety_expiry
- eicr_expiry
- inventory_date
- notice_period

### boilers
- id
- home_id
- manufacturer
- model
- serial_number
- installation_date
- installer
- installation_cost
- warranty_expiry
- last_service
- next_service
- notes

### vehicles
- id
- home_id
- registration
- make
- model
- year
- mileage
- mot_expiry
- insurance_expiry
- tax_renewal
- service_due

### appliances
- id
- home_id
- category
- name
- manufacturer
- model
- serial_number
- purchase_date
- purchase_price
- warranty_expiry

### documents
- id
- home_id
- category
- name
- file_url
- related_record_type
- related_record_id
- created_at

### reminders
- id
- home_id
- title
- due_date
- category
- notification_status
- created_at

## Phase 2 — Smart reminders

The prototype stores reminder preferences in `state.reminderSettings`.

Current supported intervals:
- 30 days
- 14 days
- 7 days
- 1 day

For production, reminders should be evaluated server-side using a scheduled job/queue. Email should be sent through a transactional email provider and browser/push notifications should use an appropriate notification service.

## Phase 3 — Document scanning

The current scanner demonstrates the user journey:

1. Capture/upload a document.
2. Extract structured fields.
3. Review the extracted information.
4. Save it to HomeVault.

The current extraction is simulated. Production should add:
- OCR
- Document classification
- Structured extraction
- Confidence scores
- User confirmation
- Record matching
- Secure original-file storage

## Phase 4 — Expenses

The prototype stores expense metadata in `state.expenses`.

Each expense currently contains:
- id
- title
- amount
- date
- category
- related record
- payment
- notes
- receipt filename

Production should store expense records in the database and actual receipts in private cloud storage. Expenses should reference the relevant home/vehicle/boiler/appliance IDs rather than relying on display names.

Future analytics can calculate:
- annual spend
- monthly spend
- spend by asset
- spend by category
- repair vs maintenance
- cost per year
- total ownership cost
- replacement cost trends

## Phase 5 — Home Timeline

The timeline is currently generated from existing records rather than requiring duplicate data entry. Manual timeline events are stored in `state.timelineEvents`.

Production should use a normalised event model or database view so the timeline can combine:
- home events
- asset events
- maintenance events
- purchases
- expenses
- documents
- reminders
- improvements
- tenancy events

Each event should reference its source record rather than duplicating display data.

## Expense recurring-cost model

Expenses now support:
- `One-off`
- `Monthly`
- `Yearly`

For production:
- Monthly recurring costs should contribute 12x to annual projections.
- Yearly recurring costs should contribute their full amount annually and one-twelfth to the monthly equivalent.
- One-off expenses should contribute only to the period in which they occur.
- Payment method supports Direct Debit and should eventually be linked to payment/renewal reminders.
- `nextDate` should drive future payment reminders for recurring costs.

A production database should also support:
- start date
- end date
- active/inactive status
- billing day
- payment provider/account reference where appropriate
- linked home/asset ID
- receipt storage ID
