# PawPal

PawPal is a pet care registration, reservation, and payment web application. It lets users submit a pet stay registration, continue to a reservation step, choose a package, and complete payment through Stripe in a controlled flow.

## Overview

The project currently supports:

- Multi-step pet stay registration.
- Reservation creation based on a submitted registration.
- Stripe payment flow for reservations.
- Duplicate-payment protection using `registration_id`.
- Local webhook testing with Stripe CLI.

## Tech Stack

### Frontend

- Angular
- TypeScript
- Angular Router
- Angular HttpClient
- Route guards for controlled access to reservation pages

### Backend

- Node.js
- Express.js
- CORS middleware
- REST API structure with routes, controllers, and services

### Database

- MySQL
- `reservations` table with payment state tracking
- `contact_messages` table with messages from customers

- Unique `registration_id` constraint to prevent duplicate reservation/payment creation

### Payments

- Stripe.js on the frontend
- Stripe backend integration for payment processing
- Stripe webhook endpoint for asynchronous payment confirmation
- Stripe CLI for local webhook forwarding and testing

## Main Flow

### Registration flow

Users first complete the registration form with:

- Owner information
- Pet information
- Stay information

After successful submission, the backend returns a generated `registrationId`.

### Prestoj / reservation flow

After registration succeeds, the user is allowed to access the reservation step.

In this step:

- The frontend uses `registrationId`.
- The backend loads the registration data.
- A reservation is created from the saved registration details.
- The user selects a package.

### Payment flow

After the reservation is prepared, the user proceeds to payment.

The payment flow uses Stripe in test mode during local development. Payment confirmation can be completed through the standard Stripe flow and finalized through the backend payment logic and webhook handling.

## Architecture

### Frontend responsibilities

The Angular frontend is responsible for:

- Handling the multi-step registration UI.
- Submitting registration data to the backend.
- Navigating to the reservation page using the returned `registrationId`.
- Preventing direct access to reservation pages unless the previous step is complete.
- Sending reservation creation requests.
- Starting the payment process.

### Backend responsibilities

The Express backend is responsible for:

- Accepting registration submissions.
- Generating and returning a `registrationId`.
- Storing registration data during development.
- Creating reservations in MySQL.
- Enforcing duplicate-payment prevention.
- Handling Stripe payment creation and webhook events.

## Duplicate-payment protection

A key improvement in this project is preventing multiple payments for the same registration.

This is done through:

- A `registration_id` column in the `reservations` table.
- A unique database constraint on `registration_id`.
- Backend checks before creating a new reservation/payment.
- Payment status tracking using values such as `pending` and `paid`.

### Why this matters

Without this protection, a user could potentially:

- Click multiple times,
- Reopen the page,
- Retry the flow,
- Or trigger repeated payment attempts for the same registration.

The database constraint acts as the final protection layer, while the backend returns a controlled response instead of allowing duplicate creation.

## Current project structure

A simplified logical structure looks like this:

```text
frontend/
  src/app/
    components/
    services/
    guards/

backend/
  routes/
    registration.routes.js
    reservation.routes.js
    payment.routes.js
    contact.routes.js
  controllers/
    registration.controller.js
    reservation.controller.js
    payment.controller.js
  services/
    reservation.service.js
    email.service.js
  stores/
    registration.store.js
  db.js
  server.js
```

## Important backend routes

### Registration

- `POST /api/registrations`
- `GET /api/registrations/:id`

### Reservations

- `POST /api/reservations/create`

### Payment

- `POST /api/payment/...`
- `POST /api/payment/webhook`

## Database notes

The `reservations` table stores reservation and payment-related data.

Important fields include:

- `id`
- `registration_id`
- `pet_name`
- `breed`
- `arrival_date`
- `departure_date`
- `package_name`
- `notes`
- `payment_status`

Recommended `payment_status` values:

- `pending`
- `paid`
- `failed`
- `cancelled`

## Development behavior

At the moment, registration data is stored in memory for development flow support. This means restarting the backend clears the temporary registration store.

Reservations, however, are saved in MySQL, so reservation records persist between backend restarts.

## Known limitation

The current in-memory registration storage is suitable for local development but not for production. A production-ready version should persist registrations in MySQL as well.

## Setup

### Prerequisites

- Node.js
- npm
- MySQL
- Stripe account
- Stripe CLI

### Backend environment variables

Typical environment variables may include:

```env
PORT=3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

### Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### Run the app

Frontend:

```bash
npm run dev
```

Backend:

```bash
node server.js
```

## Stripe local testing

To listen for Stripe webhook events locally, use:

```bash
stripe listen --forward-to localhost:3000/api/payment/webhook
```

To trigger a test event:

```bash
stripe trigger payment_intent.succeeded
```

The webhook signing secret returned by the Stripe CLI should be placed in your backend environment configuration.

## Main features implemented

- Multi-step registration form
- Reservation creation based on registration
- Guarded route access for reservation flow
- Stripe integration for payment
- Webhook handling for payment confirmation
- Duplicate reservation/payment prevention using `registration_id`
- MySQL persistence for reservations

## Options and future improvements

Possible next improvements include:

- Persist registrations in MySQL instead of memory
- Add admin dashboard for reservations and payments
- Add payment history and status view
- Add package management from the database
- Add cancellation and refund flow
- Add email confirmation after successful payment
- Add better error-state UI in Angular
- Add idempotency handling for Stripe request creation
- Add automated tests for registration, reservation, and payment flows

## Troubleshooting

### CORS or status 0 errors

If Angular shows `status: 0` or a CORS request failure, first verify the backend is actually running on port `3000`.

### Reservation 404

If reservation creation returns `404`, check that the frontend and backend paths match exactly, especially `/api/reservations/create`.

### Reservation 400

If reservation creation returns `400`, verify the backend is resolving the registration correctly and mapping stay and pet data properly.

### Duplicate payment protection issues

If duplicate-payment protection fails:

- Verify `registration_id` exists in the `reservations` table.
- Verify the unique constraint exists.
- Verify the backend sends `registrationId` during reservation creation.
- Verify payment status is updated correctly after successful payment.

## Summary of what has been used

This project uses Angular for the frontend user flow, Express and Node.js for backend APIs, MySQL for reservation persistence, and Stripe for payments and webhook-based confirmation.

It currently supports a complete registration-to-payment pipeline with protection against duplicate reservation/payment creation for the same registration.
