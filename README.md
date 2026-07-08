# Cars 15 - Luxury Car Inventory & Finance Platform

A full-stack luxury car marketplace built with **Next.js, React, TypeScript, Spring Boot, Spring Security, JWT, MySQL, and Docker**. Cars 15 presents premium vehicle listings with advanced filtering, comparison, wishlist, buyer profile, test-drive booking, admin analytics, finance tools, and a production-style REST API.

## Live Demo

[cars15.vercel.app](https://cars15.vercel.app/)

## Features

- Responsive inventory browsing for desktop and mobile.
- Multi-field search, filtering, sorting, and compare up to 3 cars.
- Wishlist persistence and recently viewed vehicle tracking with local storage.
- JWT-ready buyer/admin authentication and profile workspace.
- Vehicle detail pages with image gallery, specification sheet printing, sharing, and enquiry actions.
- Test-drive booking flow with instant confirmation feedback.
- Booking status management and price alert tracking in the admin dashboard.
- Advanced EMI calculator with down payment, interest, tenure, salary-based eligibility, insurance, maintenance, and ownership estimate.
- Admin analytics dashboard for total cars, bookings, users, inventory views, most viewed cars, brand demand, and average listed price.
- Spring Boot REST API for cars, auth, bookings, wishlist, price alerts, and admin operations.
- H2 local development profile with MySQL-ready environment configuration.
- Docker Compose setup for frontend, backend, and MySQL.
- Contact and about pages for dealership-style presentation.
- WhatsApp contact entry point for quick enquiries.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 14, React, TypeScript |
| Styling | Tailwind CSS |
| UI | Framer Motion, Lucide React |
| API | Spring Boot 3, Spring Web, Spring Validation |
| Security | Spring Security, JWT, BCrypt, role-based access |
| Data | Spring Data JPA, H2, MySQL |
| Testing | Spring Boot Test, MockMvc |
| DevOps | Docker, Docker Compose, GitHub Actions |
| Deployment | Vercel |

## Run Locally

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd backend
mvn spring-boot:run
```

Default backend accounts:

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@cars15.local | admin123 |
| Buyer | buyer@cars15.local | buyer123 |

Build and test:

```bash
npm run build
mvn -f backend/pom.xml test
```

Run the full stack with Docker Compose:

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:8080`

## API Highlights

- `POST /api/auth/register` - create a buyer account.
- `POST /api/auth/login` - receive a JWT token.
- `GET /api/cars` and `GET /api/cars/{id}` - browse seeded luxury inventory.
- `POST /api/bookings` - request a test drive.
- `GET /api/bookings/me` - view authenticated buyer bookings.
- `POST /api/alerts` - create price-drop alerts.
- `GET /api/admin/bookings` - manage booking pipeline as admin.
- `GET /api/analytics` - view inventory and demand metrics.

## Project Structure

```text
app/            App Router pages and lightweight route handlers
backend/        Spring Boot REST API, security, data, and tests
components/     Reusable UI components
data/           Vehicle data used by the frontend demo
lib/            Local demo persistence helpers
types/          TypeScript models
```

## Author

Surya Prakash K S  
[GitHub](https://github.com/SURYAPRAKASH123671) · [LinkedIn](https://www.linkedin.com/in/surya-prakash-k-s-25b177242)
