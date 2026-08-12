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
