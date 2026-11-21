<div align="center">

<img src="frontend/public/logo.svg" alt="Expense Tracker Logo" width="80" height="80" />

# Expense Tracker

**A production-ready, full-stack personal finance web application built with ASP.NET Core Web API on .NET 10, Microsoft SQL Server, and a bilingual (English LTR / Arabic RTL) React 19 Single Page Application.**

[![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?style=flat&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-512BD4?style=flat&logo=dotnet&logoColor=white)](https://learn.microsoft.com/aspnet/core)
[![Entity Framework Core](https://img.shields.io/badge/EF%20Core-10.0-512BD4?style=flat&logo=dotnet&logoColor=white)](https://learn.microsoft.com/ef/core)
[![SQL Server](https://img.shields.io/badge/Database-SQL%20Server-CC292B?style=flat&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server)
[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-64_Passed-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-Clean-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
[![API Hosting](https://img.shields.io/badge/API%20Hosting-MonsterASP.NET-008080?style=flat&logo=windows&logoColor=white)](https://www.monsterasp.net/)
[![Web Hosting](https://img.shields.io/badge/Web%20Hosting-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![API Health](https://img.shields.io/badge/API%20Health-healthy-22c55e?style=flat)](https://expensetracker.tryasp.net/health)

---

### Quick Links

| Resource | URL | Details |
| :--- | :--- | :--- |
| **Live Web Application** | [expense-tracker-almaghrabyali.vercel.app](https://expense-tracker-almaghrabyali.vercel.app) | Bilingual SPA hosted on Vercel |
| **Live Production API** | [expensetracker.tryasp.net](https://expensetracker.tryasp.net) | ASP.NET Core API hosted on MonsterASP.NET |
| **API Health Check** | [expensetracker.tryasp.net/health](https://expensetracker.tryasp.net/health) | Returns `{"status":"healthy"}` (HTTP 200) |
| **Public Demo Account** | `demo@example.com` / `Demo12345` | Sample data loaded (Aug–Nov 2026) |
| **Backend Reference Guide** | [backend/README.md](backend/README.md) | Exhaustive API contracts, schemas, and diagnostics |
| **Frontend Reference Guide** | [frontend/README.md](frontend/README.md) | Component architecture, state, and client tests |

> **Internship Context:** Built as **Task 3** of the Full Stack Development Internship at **Auspify Technologies** (October–November 2026).

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Demo & Public Credentials](#live-demo--public-credentials)
- [Screenshots](#screenshots)
- [Features](#features)
  - [Authentication & Session Lifecycle](#authentication--session-lifecycle)
  - [Dashboard & Analytics](#dashboard--analytics)
  - [Transactions Management](#transactions-management)
  - [Category Management](#category-management)
  - [UX & Responsive Layout](#ux--responsive-layout)
  - [Internationalization & Localization](#internationalization--localization)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
  - [End-to-End System Pipeline](#end-to-end-system-pipeline)
  - [Backend Layering Strategy](#backend-layering-strategy)
  - [Frontend Data Flow](#frontend-data-flow)
- [Project Structure](#project-structure)
- [Database Design & Data Model](#database-design--data-model)
  - [Entity-Relationship Diagram](#entity-relationship-diagram)
  - [Indexes & Constraints](#indexes--constraints)
  - [Seeded System Categories](#seeded-system-categories)
- [API Overview](#api-overview)
  - [Endpoint Directory](#endpoint-directory)
  - [Request & Response Samples](#request--response-samples)
- [Authentication & Security](#authentication--security)
  - [Authentication Flow](#authentication-flow)
  - [Multi-Tenant Data Isolation](#multi-tenant-data-isolation)
  - [Security Hardening Matrix](#security-hardening-matrix)
  - [Token Storage Security Trade-Off: LocalStorage vs. HttpOnly Cookies](#token-storage-security-trade-off-localstorage-vs-httponly-cookies)
- [Error Handling Strategy](#error-handling-strategy)
- [Getting Started Locally](#getting-started-locally)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Windows PowerShell)](#backend-setup-windows-powershell)
  - [Frontend Setup](#frontend-setup)
  - [Local Troubleshooting Guide](#local-troubleshooting-guide)
- [Configuration Reference](#configuration-reference)
- [Testing & Quality Assurance](#testing--quality-assurance)
  - [Frontend Vitest Suite & Linting](#frontend-vitest-suite--linting)
  - [Backend Automated Smoke Test & Verification](#backend-automated-smoke-test--verification)
  - [Automated Smoke Test Script](#automated-smoke-test-script)
- [Deployment Architecture](#deployment-architecture)
  - [Production Topology](#production-topology)
  - [Continuous Deployment Workflow](#continuous-deployment-workflow)
- [Roadmap & Future Enhancements](#roadmap--future-enhancements)
- [Author & Attribution](#author--attribution)

---

## Overview

**Expense Tracker** is a full-stack personal finance web application designed to help individuals, freelancers, and students track incomes and expenses, organize budgets into customizable categories, and visualize cash flow patterns.

### Why This Project?
Personal accounting tools often suffer from bloated interfaces, slow data entry, or lack of native localization for regional currencies and right-to-left (RTL) scripts. Expense Tracker solves these pain points by offering:
- **Zero-Friction Tracking:** Minimal steps to log expenses and incomes with date selection, notes, and instant type matching.
- **Deep Localization:** First-class bilingual experience in English (LTR) and Arabic (RTL) with native Cairo typography, Arabic category labels, Western digits, and strict Egyptian Pound (`EGP` / `ج.م`) currency formatting.
- **Enterprise-Grade Security:** Complete per-user data isolation, password hashing with BCrypt, stateless JWT authentication, and RFC 7807 problem details error handling.
- **Real-Time Financial Intelligence:** Interactive Recharts data visualizations, spending burn rates, and historical cash flow analysis powered by database-level SQL aggregations.

---

## Live Demo & Public Credentials

The application is deployed live with a shared demonstration account containing realistic transaction history:

- **Web Application URL:** [https://expense-tracker-almaghrabyali.vercel.app](https://expense-tracker-almaghrabyali.vercel.app)
- **API Health Check:** [https://expensetracker.tryasp.net/health](https://expensetracker.tryasp.net/health)

### Public Demo Credentials
| Field | Value | Notes |
| :--- | :--- | :--- |
| **Email** | `demo@example.com` | Public sandbox account |
| **Password** | `Demo12345` | Pre-populated with transactions across Aug–Nov 2026 |

### Suggested Walkthrough
1. **Explore the Dashboard:** Toggle date presets (*This Month*, *Last 30 Days*, *This Year*, or *Custom*) to view dynamic recalculations of Net Balance, Income, Expense, Burn Rate, and category distributions.
2. **Switch Languages:** Click the language switcher in the header to switch to Arabic (`العربية`) and observe the mirrored RTL layout, Cairo typography, and localized category names.
3. **Filter & Search Transactions:** Navigate to *Transactions*, type into the note search bar (debounced by 300ms), filter by category or type, sort by date or amount, and change pagination page size.
4. **Test Category Protection:** Navigate to *Categories*. Notice that the 12 default system categories are locked from editing or deletion. Create a custom category with the hex color picker, then attempt to delete a category with active transactions to verify the conflict rejection (`HTTP 409`).

---

## Screenshots

The screenshots below illustrate key application flows across desktop, mobile, and localized views:

| View | Screenshot | Description |
| :--- | :---: | :--- |
| **Authentication** | ![Login (English)](docs/screenshots/01-login-en.png) | Centered glass card layout with ambient CSS/SVG mesh glows and validated credentials form. |
| **Dashboard (English LTR)** | ![Dashboard English](docs/screenshots/02-dashboard-en.png) | Hero Net Balance card with period delta, metric stat cards, Recharts donut breakdown, and 12-month bar chart. |
| **Dashboard (Arabic RTL)** | ![Dashboard Arabic](docs/screenshots/03-dashboard-ar.png) | Complete RTL layout mirror, Cairo typography, Arabic category labels, and Egyptian Pound (`ج.م`) formatting. |
| **Transactions Management** | ![Transactions List](docs/screenshots/04-transactions-en.png) | Searchable data table with type filters, date pickers, column sorting, and pagination controls. |
| **Transaction Modal** | ![Transaction Modal](docs/screenshots/05-add-transaction-modal.png) | Modal form with Income/Expense segmented toggle, category selector, decimal validation, and date picker. |
| **Category Management** | ![Categories](docs/screenshots/06-categories-en.png) | Visual grid of locked default categories and custom user categories with 10-color hex palette picker. |
| **Mobile Experience** | ![Mobile Dashboard](docs/screenshots/07-mobile-dashboard.png) | Compact responsive mobile layout featuring bottom dock navigation and one-tap quick-add shortcut. |
| **OpenAPI / Swagger UI** | ![Swagger UI](docs/screenshots/08-swagger.png) | Interactive Swagger documentation available in local development with JWT Bearer authorization support. |

---

## Features

### Authentication & Session Lifecycle
- **Stateless JWT Authentication:** HMAC-SHA256 tokens signed with a 32+ character secret, featuring a strict 60-minute lifespan with `ClockSkew = TimeSpan.Zero`.
- **BCrypt Password Hashing:** Salted Blowfish hashing via `BCrypt.Net-Next` with strict 72-byte truncation boundary checks to prevent long-password DoS exploits.
- **Session Restoration & Verification:** On page reload, the client transparently restores the user profile via `GET /api/auth/me`.
- **Automatic Client-Side Logout:** Active timer logs out the user when their token expires. Axios response interceptors capture unexpected `401 Unauthorized` responses and trigger clean session teardown via custom DOM events (`et:session-expired`).

### Dashboard & Analytics
- **Dynamic Period Presets:** Instantly filter financial statistics by *This Month*, *Last 30 Days*, *This Year*, or arbitrary *Custom* date intervals.
- **Hero Net Balance Card:** Calculates net savings (`Total Income - Total Expense`) alongside percentage delta comparisons against the prior period of identical length.
- **Financial Metric Cards:** Real-time visibility into Total Income, Total Expenses, and Spending/Burn Rate percentage (`(Expense / Income) * 100`).
- **Category Spending Donut:** Interactive Recharts SVG donut chart showing proportional category expenses with synchronized color keys.
- **12-Month Inflow vs. Outflow Bar Chart:** Visual cash flow comparison across all 12 calendar months of the selected year.
- **Recent Transactions Feed:** Displays the 5 most recent transactions with immediate "Add Expense" modal shortcuts.

### Transactions Management
- **Multi-Criteria Filtering:** Filter transactions by transaction type (`Income` or `Expense`), specific category ID, date range (`from` / `to`), and debounced keyword search on transaction notes.
- **Server-Driven Pagination & Sorting:** Whitelisted sorting by `date`, `amount`, or `createdAt` in ascending or descending order, with customizable page limits (`1..100`).
- **Atomic Modals:** Modals for adding, editing, and deleting transactions with validation and automatic category-type synchronization.

### Category Management
- **12 Locked Default Categories:** Pre-seeded categories (8 Expense, 4 Income) available to all users with locked names and colors.
- **Custom User Categories:** Create custom categories with arbitrary names and a curated 10-color hex picker (`#F97316`, `#3B82F6`, `#EF4444`, etc.).
- **Deletion Safety Protection:** Deleting a category with active transactions is blocked by database foreign keys and application logic (`HTTP 409 Conflict`), prompting the user to reassign or remove existing transactions first.

### UX & Responsive Layout
- **Modern Fintech Aesthetics:** Designed with an emerald $\to$ teal $\to$ indigo gradient motif, glassmorphic cards, and subtle background glow meshes.
- **Responsive Navigation:**
  - **Desktop ($\ge 1024\text{px}$):** Persistent sidebar navigation with active route highlights.
  - **Tablet ($768\text{px} - 1023\text{px}$):** Collapsible icon rail navigation.
  - **Mobile ($< 768\text{px}$):** Bottom dock navigation bar with an elevated quick-add transaction button.
- **Accessibility & Feedback:** Accessible dialogs, focus trapping, ESC key dismissals, skeleton loaders, and non-blocking toast notifications (`react-hot-toast`).

### Internationalization & Localization
- **Complete RTL Mirroring:** Bidirectional interface switching between English (LTR) and Arabic (RTL) via `i18next` and `react-i18next`.
- **Custom Font Typography:** Uses **Inter** for clean English typography and **Cairo** for Arabic readability.
- **Strict Currency Formatting:** Standardized formatting in Egyptian Pounds (`EGP 14,519.50` in English, `14,519.50 ج.م` with Western digits in Arabic).
- **Localized Server Errors:** Backend RFC 7807 `ProblemDetails` error codes are normalized into localized Arabic and English user error messages.

---

## Tech Stack

The application uses modern frameworks, libraries, and hosting environments:

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | ASP.NET Core Web API | `.NET 10.0` (C# 14) | High-performance RESTful Web API and service layer |
| **Database & ORM** | Microsoft SQL Server & EF Core | `10.0.14` | Relational persistence, code-first migrations, and LINQ projections |
| **Authentication** | JWT Bearer (`Microsoft.AspNetCore.Authentication.JwtBearer`) | `10.0.14` | Stateless Bearer token verification and claim processing |
| **Password Hashing** | `BCrypt.Net-Next` | `4.2.0` | Salted Blowfish hashing for user password credentials |
| **API Documentation** | `Swashbuckle.AspNetCore` & `OpenApi` | `10.3.1` / `10.0.11` | Interactive OpenAPI / Swagger UI documentation (Dev only) |
| **Frontend Framework** | React | `^19.0.1` | Modern component architecture with JSX |
| **Build Tooling** | Vite | `^8.3.0` | Lightning-fast HMR and production bundle optimization |
| **Styling** | Tailwind CSS | `^4.3.3` | Utility-first CSS styling via `@tailwindcss/vite` |
| **Server State** | TanStack React Query | `^5.106.1` | Asynchronous caching, query invalidation, and background updates |
| **HTTP Client** | Axios | `^1.21.0` | Promise-based HTTP client with request and response interceptors |
| **Routing** | React Router | `^7.18.5` | Declarative client-side routing with protected route guards |
| **Form Handling** | React Hook Form | `^7.91.0` | Lightweight form state management and input validation |
| **Charts** | Recharts | `^3.10.1` | Responsive SVG charts (Donut category share and Monthly bar cashflow) |
| **Localization** | i18next & react-i18next | `^26.7.1` / `^17.1.12` | Internationalization runtime with English LTR and Arabic RTL support |
| **Icons & Alerts** | Lucide React & React Hot Toast | `^0.546.0` / `^2.6.1` | Clean SVG iconography and non-blocking toast notifications |
| **Testing** | Vitest & React Testing Library | `^5.1.0` / `^16.3.3` | Fast unit and component test runner (64 tests passing) |
| **Code Quality** | ESLint | `^9.39.5` | Flat Config JavaScript and React linting rules |
| **Backend Hosting** | MonsterASP.NET | Windows Server / IIS | Free ASP.NET Core in-process hosting with managed SQL Server |
| **Frontend Hosting** | Vercel | Hobby Plan | Edge-deployed static Single Page Application hosting |

---

## System Architecture

### End-to-End System Pipeline

```mermaid
flowchart LR
    subgraph ClientDevice ["Client Device (Desktop / Tablet / Mobile)"]
        Browser["Web Browser (React 19 SPA)"]
    end

    subgraph VercelEdge ["Vercel Edge Network"]
        StaticCDN["Static Asset CDN & vercel.json Rewrite Rule"]
    end

    subgraph HostingProvider ["MonsterASP.NET (Windows Server / IIS)"]
        IIS["IIS Web Server (In-Process ASP.NET Core Module)"]
        subgraph AspNetApp ["ASP.NET Core Web API (.NET 10)"]
            MW["Middleware Pipeline<br/>(ExceptionHandling ➔ Swagger ➔ HTTPS ➔ CORS ➔ AuthN ➔ AuthZ)"]
            Controllers["Controllers Layer<br/>(Auth, Categories, Transactions, Reports)"]
            Services["Service Layer<br/>(Business Logic & Tenant Isolation)"]
            EF["Entity Framework Core (AppDbContext)"]
        end
        SqlServer[("Microsoft SQL Server<br/>(Tables, Indexes, Seed Data)")]
    end

    Browser -->|1. Fetch HTML/JS/CSS| StaticCDN
    Browser -->|2. HTTPS REST Requests (Bearer JWT)| IIS
    IIS --> MW
    MW --> Controllers
    Controllers --> Services
    Services --> EF
    EF -->|3. Parameterized SQL Queries & Aggregations| SqlServer
```

### Backend Layering Strategy

The backend follows an explicit, decoupled architecture that avoids artificial complexity:

```
Controllers  ──▶  Services (Interfaces + Scoped DI)  ──▶  AppDbContext (EF Core)  ──▶  SQL Server
     ▲                                                         │
     │                                                         │
  Input DTOs (DataAnnotations)                         Domain Entities
```

1. **Controllers (`src/ExpenseTracker.Api/Controllers/`):** Handle HTTP transport, parse query strings and route parameters, trigger automatic DataAnnotations model validation (`[ApiController]`), and return status-specific responses (`200 OK`, `201 Created`, `204 No Content`).
2. **Services (`src/ExpenseTracker.Api/Services/`):** Registered with scoped lifetime (`IAuthService`, `ICategoryService`, `ITransactionService`, `IReportService`). Encapsulate all business validation rules, referential checks, and cryptographic password verification.
3. **No Redundant Repository Layer:** Entity Framework Core natively implements both the Repository (`DbSet<T>`) and Unit of Work (`DbContext`) patterns. Adding an `IRepository<T>` on top of EF Core would hide compile-time LINQ translation, hinder `.Select()` projections, and add boilerplate without providing value.
4. **Strict Separation of DTOs and Entities:** Domain entities are never exposed across the network. Specialized input and output DTOs prevent over-posting, mass-assignment vulnerabilities, and object graph exposure.
5. **Database-Level SQL Aggregations:** Report calculations (`/api/reports/*`) are executed in the database engine via SQL `GROUP BY` and `SUM` clauses, guaranteeing $O(1)$ memory consumption on the server regardless of transaction volume.

### Frontend Data Flow

```
UI Pages & Components  ──▶  TanStack React Query Hooks  ──▶  API Modules  ──▶  Axios Instance  ──▶  Backend API
```

- **Custom Hooks (`src/hooks/`):** Encapsulate data-fetching logic (`useTransactions`, `useCategories`, `useReports`). React Query handles deduplication, caching, and mutation-based cache invalidation.
- **Centralized Axios Client (`src/api/client.js`):** Intercepts outgoing requests to append `Authorization: Bearer <token>`, and intercepts incoming responses to detect `401 Unauthorized` errors and dispatch `et:session-expired` events for auto-logout.

---

## Project Structure

```
expense-tracker/
├── .gitignore                                  # Root git ignore rules
├── README.md                                   # Root project documentation (this file)
│
├── docs/
│   └── screenshots/                            # Application walkthrough images
│       └── .gitkeep                            # Keeps screenshot directory tracked in git
│
├── backend/                                    # ASP.NET Core Web API Solution (.NET 10)
│   ├── ExpenseTracker.slnx                     # Visual Studio XML solution file
│   ├── README.md                               # Dedicated backend engineering reference
│   └── src/
│       └── ExpenseTracker.Api/
│           ├── ExpenseTracker.Api.csproj       # Dependencies, SDK target & UserSecretsId
│           ├── Program.cs                      # DI configuration & middleware pipeline
│           ├── appsettings.json                # Base configuration (Connection strings, JWT, CORS)
│           ├── appsettings.Development.json    # Development logging overrides
│           ├── Controllers/                    # API endpoints (Auth, Categories, Transactions, Reports)
│           ├── Data/                           # AppDbContext, Fluent API mappings & Migrations/
│           ├── Dtos/                           # Input requests, query objects, and response DTOs
│           ├── Entities/                       # Domain entities (User, Category, Transaction, Enum)
│           ├── Exceptions/                     # Domain exceptions (NotFound, Conflict, BadRequest, etc.)
│           ├── Extensions/                     # Extension helpers (ClaimsPrincipalExtensions)
│           ├── Middleware/                     # Centralized RFC 7807 ExceptionHandlingMiddleware
│           ├── Properties/                     # launchSettings.json (Ports 5041 HTTP, 7105 HTTPS)
│           ├── Services/                       # Business logic services & interfaces
│           └── Validation/                     # Custom validation attributes (MaxDecimalPlacesAttribute)
│
└── frontend/                                   # React 19 Single Page Application (Vite 8)
    ├── index.html                              # SPA entry point with viewport & font configurations
    ├── package.json                            # Scripts, dependencies, devDependencies
    ├── vite.config.js                          # Vite plugins, port 5173 (strictPort), Vitest configuration
    ├── vercel.json                             # SPA routing rewrite rule: /(.*) -> /index.html
    ├── eslint.config.js                        # ESLint flat configuration for React
    ├── .env.example                            # Example environment variables template
    ├── README.md                               # Dedicated frontend documentation
    ├── public/                                 # Static assets (logo.svg, favicon)
    └── src/
        ├── main.jsx                            # Application bootstrapping & provider tree
        ├── index.css                           # Tailwind CSS v4 directives & theme styles
        ├── api/                                # Axios client & modular API endpoints
        ├── components/                         # UI components (dashboard, transactions, categories, charts)
        ├── context/                            # AuthContext (token storage, login/logout, session timers)
        ├── hooks/                              # Custom TanStack React Query hooks
        ├── i18n/                               # i18next configuration and EN/AR locale JSON dictionaries
        ├── pages/                              # Routed page views (Login, Register, Dashboard, etc.)
        ├── routes/                             # Route configurations, ProtectedRoute, PublicRoute
        ├── test/                               # 64 Vitest unit and integration test specs
        └── utils/                              # Currency formatting, date calculations, error normalization
```

---

## Database Design & Data Model

### Entity-Relationship Diagram

```mermaid
erDiagram
    Users ||--o{ Categories : "creates (UserId)"
    Users ||--o{ Transactions : "owns (UserId)"
    Categories ||--o{ Transactions : "classifies (CategoryId)"

    Users {
        int Id PK "IDENTITY(1,1)"
        nvarchar(100) FullName "NOT NULL"
        nvarchar(256) Email "NOT NULL, UNIQUE"
        nvarchar(100) PasswordHash "NOT NULL"
        datetime2 CreatedAt "NOT NULL (UTC)"
    }

    Categories {
        int Id PK "IDENTITY(1,1)"
        int UserId FK "NULLable (NULL = System Default)"
        nvarchar(50) Name "NOT NULL"
        nvarchar(10) Type "Income | Expense"
        nvarchar(7) Color "Format: #RRGGBB"
        datetime2 CreatedAt "NOT NULL (UTC)"
    }

    Transactions {
        int Id PK "IDENTITY(1,1)"
        int UserId FK "NOT NULL"
        int CategoryId FK "NOT NULL"
        nvarchar(10) Type "Income | Expense"
        decimal Amount "decimal(18,2)"
        date Date "date (yyyy-MM-dd)"
        nvarchar(250) Note "NULLable"
        datetime2 CreatedAt "NOT NULL (UTC)"
        datetime2 UpdatedAt "NOT NULL (UTC)"
    }
```

### Indexes & Constraints

1. **`Users` Table:**
   - Primary Key: `Id` (`IDENTITY(1,1)`).
   - Unique Index: `IX_Users_Email` on `Email`. Prevents duplicate registrations.
2. **`Categories` Table:**
   - Primary Key: `Id` (`IDENTITY(1,1)`).
   - Foreign Key: `UserId` referencing `Users(Id)` with `OnDelete(DeleteBehavior.Cascade)`. `UserId = NULL` represents shared default categories.
   - Index: `IX_Categories_UserId` on `UserId`.
3. **`Transactions` Table:**
   - Primary Key: `Id` (`IDENTITY(1,1)`).
   - Foreign Key: `UserId` referencing `Users(Id)` with `OnDelete(DeleteBehavior.Cascade)`.
   - Foreign Key: `CategoryId` referencing `Categories(Id)` with `OnDelete(DeleteBehavior.Restrict)` (`NO ACTION` in SQL Server). Ensures a category referenced by transactions cannot be dropped.
   - Composite Index: `IX_Transactions_UserId_Date` on `(UserId, Date)`. Optimizes date-filtered transaction lookups and reporting queries partitioned per user.
   - Index: `IX_Transactions_CategoryId` on `CategoryId`.

### Seeded System Categories

The initial database migration seeds 12 system categories with fixed IDs `1` through `12` (`UserId = NULL`):

| ID | Name | Type | Hex Color | Category Purpose |
| :---: | :--- | :---: | :---: | :--- |
| **1** | Food | `Expense` | `#F97316` | Groceries, dining out, supermarkets, coffee shops |
| **2** | Transport | `Expense` | `#3B82F6` | Public transit, fuel, vehicle maintenance, ride-sharing |
| **3** | Bills | `Expense` | `#EF4444` | Utilities, electric, water, home internet, rent |
| **4** | Shopping | `Expense` | `#EC4899` | Clothing, home goods, electronics, personal accessories |
| **5** | Health | `Expense` | `#10B981` | Medical consultations, pharmacy, health insurance |
| **6** | Entertainment | `Expense` | `#8B5CF6` | Streaming subscriptions, events, gaming, social outings |
| **7** | Education | `Expense` | `#06B6D4` | Tuition fees, textbooks, online courses, training |
| **8** | Other | `Expense` | `#64748B` | Miscellaneous everyday expenses |
| **9** | Salary | `Income` | `#22C55E` | Primary employment compensation |
| **10** | Freelance | `Income` | `#14B8A6` | Freelancing, client projects, side ventures |
| **11** | Gift | `Income` | `#F59E0B` | Cash gifts, bonuses, monetary awards |
| **12** | Other | `Income` | `#64748B` | Miscellaneous income sources |

---

## API Overview

### Endpoint Directory

All endpoints (except `/health`) are prefixed with `/api`. Dates follow ISO-8601 (`yyyy-MM-dd`), enums serialize as strings, and amounts have at most 2 decimal places.

| HTTP Method | Endpoint Path | Authentication | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/health` | Anonymous | Health check probe; returns `{"status":"healthy"}` |
| `POST` | `/api/auth/register` | Anonymous | Register a new user account and receive a JWT token |
| `POST` | `/api/auth/login` | Anonymous | Authenticate with email/password and receive a JWT token |
| `GET` | `/api/auth/me` | Bearer Token | Retrieve the authenticated user's profile |
| `GET` | `/api/categories` | Bearer Token | List all system categories and custom user categories (optional `?type=`) |
| `POST` | `/api/categories` | Bearer Token | Create a custom category with name, type, and hex color |
| `PUT` | `/api/categories/{id}` | Bearer Token | Update a custom category's name and color (type cannot be modified) |
| `DELETE` | `/api/categories/{id}` | Bearer Token | Delete a custom category (blocked if transactions exist) |
| `GET` | `/api/transactions` | Bearer Token | Paged, filtered, and sorted list of transactions |
| `GET` | `/api/transactions/{id}` | Bearer Token | Retrieve single transaction details by ID |
| `POST` | `/api/transactions` | Bearer Token | Create a transaction (verifies category type compatibility) |
| `PUT` | `/api/transactions/{id}` | Bearer Token | Full replacement update of a transaction |
| `DELETE` | `/api/transactions/{id}` | Bearer Token | Permanently remove a transaction |
| `GET` | `/api/reports/summary` | Bearer Token | Income, expense, balance, and count for a date range |
| `GET` | `/api/reports/by-category` | Bearer Token | Aggregated totals and percentage distribution by category |
| `GET` | `/api/reports/monthly` | Bearer Token | 12-month annual cash flow breakdown for a given year |

> For comprehensive endpoint schemas, query parameters, and error status code mappings, refer to [backend/README.md](backend/README.md#7-api-reference).

### Request & Response Samples

<details>
<summary><b>1. User Login: <code>POST /api/auth/login</code></b></summary>

**Request:**
```http
POST /api/auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "demo@example.com",
  "password": "Demo12345"
}
```

**Response (`200 OK`):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNSIsImVtYWlsIjoiZGVtb0BleGFtcGxlLmNvbSIsIm5hbWUiOiJEZW1vIFVzZXIiLCJleHAiOjE3NjM3MDk2MDB9...",
  "expiresAt": "2026-11-21T03:58:00Z",
  "user": {
    "id": 15,
    "fullName": "Demo User",
    "email": "demo@example.com"
  }
}
```
</details>

<details>
<summary><b>2. Create Transaction: <code>POST /api/transactions</code></b></summary>

**Request:**
```http
POST /api/transactions HTTP/1.1
Host: expensetracker.tryasp.net
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "type": "Expense",
  "categoryId": 1,
  "amount": 250.75,
  "date": "2026-11-21",
  "note": "Supermarket grocery restocking"
}
```

**Response (`201 Created`):**
```json
{
  "id": 108,
  "type": "Expense",
  "amount": 250.75,
  "date": "2026-11-21",
  "note": "Supermarket grocery restocking",
  "categoryId": 1,
  "categoryName": "Food",
  "categoryColor": "#F97316",
  "createdAt": "2026-11-21T03:00:00Z",
  "updatedAt": "2026-11-21T03:00:00Z"
}
```
</details>

<details>
<summary><b>3. Paged Transactions Query: <code>GET /api/transactions</code></b></summary>

**Request Query:**
```http
GET /api/transactions?type=Expense&from=2026-11-01&to=2026-11-30&sortBy=date&sortDir=desc&page=1&pageSize=10 HTTP/1.1
Authorization: Bearer <token>
```

**Response (`200 OK`):**
```json
{
  "items": [
    {
      "id": 108,
      "type": "Expense",
      "amount": 250.75,
      "date": "2026-11-21",
      "note": "Supermarket grocery restocking",
      "categoryId": 1,
      "categoryName": "Food",
      "categoryColor": "#F97316",
      "createdAt": "2026-11-21T03:00:00Z",
      "updatedAt": "2026-11-21T03:00:00Z"
    }
  ],
  "page": 1,
  "pageSize": 10,
  "totalCount": 1,
  "totalPages": 1
}
```
</details>

---

## Authentication & Security

### Authentication Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Client Browser
    participant API as ASP.NET Core API
    participant AuthMW as JwtBearer Middleware
    participant Controller as Protected Controller
    participant Service as Business Service
    participant DB as SQL Server

    Note over User,API: 1. Authentication Stage
    User->>API: POST /api/auth/login { email, password }
    API->>Service: LoginAsync(request)
    Service->>DB: Query User by Normalized Email
    DB-->>Service: User record with PasswordHash
    Service->>Service: BCrypt.Verify(password, hash)
    Service->>Service: Sign JWT (HS256, sub=UserId, exp=60m)
    Service-->>API: AuthResponse { token, expiresAt, user }
    API-->>User: 200 OK + JWT Payload

    Note over User,API: 2. Protected Request Stage
    User->>API: GET /api/transactions (Header: Bearer <token>)
    API->>AuthMW: Validate Signature, Issuer, Audience & Lifetime
    alt Token Missing or Expired
        AuthMW-->>User: 401 Unauthorized (Empty Body)
    else Token Valid
        AuthMW->>AuthMW: Populate ClaimsPrincipal (sub -> UserId)
        AuthMW->>Controller: Route to Action
        Controller->>Service: Execute with ClaimsPrincipal.GetUserId()
        Service->>DB: Query filtered by WHERE UserId == currentUserId
        DB-->>Service: Filtered Data Records
        Service-->>Controller: PagedResult<TransactionDto>
        Controller-->>User: 200 OK with Data JSON
    end
```

### Multi-Tenant Data Isolation

Expense Tracker enforces multi-tenant data boundaries at the service layer:
1. **Cryptographic Subject Resolution:** When an authenticated request reaches an action, the application resolves `UserId` via `User.GetUserId()` from `src/ExpenseTracker.Api/Extensions/ClaimsPrincipalExtensions.cs`.
2. **Never Trust User IDs from Payloads:** No endpoint allows a client to specify `userId` via query parameters, route segments, or body JSON. The ID is always derived from the cryptographic signature of the token.
3. **No Information Leaks on Foreign Records:** Requesting, modifying, or deleting an entity ID that belongs to another user returns `404 Not Found` (never revealing whether that entity ID exists in the database).

### Security Hardening Matrix

| Security Threat | Mitigation Strategy | Implementation Details |
| :--- | :--- | :--- |
| **Credential Theft & Brute Force** | Salted BCrypt password hashing | Uses `BCrypt.Net-Next` with automatic salting; enforces max 72-character limit to mitigate algorithmic DoS. |
| **Account Enumeration** | Generic authentication failure messages | `AuthService.LoginAsync` emits the identical error message (`"Invalid email or password."`) for non-existent emails and wrong passwords. |
| **SQL Injection** | Parameterized queries | EF Core LINQ generates parameterized queries at the ADO.NET level, neutralizing SQL injection vectors. |
| **Information Disclosure** | Centralized exception handling | Unhandled server exceptions trigger a generic 500 error (`"An unexpected error occurred. Please try again later."`). Stack traces are recorded only in server logs. |
| **Cross-Origin Abuse** | Strict CORS policy | Access is locked to configured origins (`http://localhost:5173` and `https://expense-tracker-almaghrabyali.vercel.app`). Wildcards are forbidden. |
| **Token Replay Window** | Zero Clock Skew | `TokenValidationParameters.ClockSkew = TimeSpan.Zero` ensures tokens terminate at their exact `exp` timestamp. |
| **Secrets Exposure** | Configuration segregation | No production passwords or keys are committed to Git. User Secrets are used in development; host environment variables in production. |

### Token Storage Security Trade-Off: LocalStorage vs. HttpOnly Cookies

The frontend currently stores the JWT in the browser's `localStorage` (`localStorage.setItem('token', ...)`). The security engineering considerations for this architectural decision are:

- **Why `localStorage` Was Chosen:**
  1. **Immunity to CSRF:** Storing tokens in `localStorage` and passing them via the `Authorization: Bearer <token>` header makes the application naturally immune to Cross-Site Request Forgery (CSRF). Browsers never automatically attach `localStorage` values to cross-origin requests, eliminating the need for CSRF tokens or SameSite cookie configurations.
  2. **Decoupled Cross-Domain Architecture:** The API is hosted on MonsterASP.NET (`https://expensetracker.tryasp.net`) while the frontend is on Vercel (`https://expense-tracker-almaghrabyali.vercel.app`). `localStorage` avoids third-party cross-site cookie restrictions across independent domains.
  3. **Stateless Operations:** Enables immediate client-side session cleanup and token expiration tracking without requiring a server-side logout endpoint.
- **The Trade-Off (XSS Vulnerability):**
  - Any script running within the origin's context can read `localStorage`. An Cross-Site Scripting (XSS) vulnerability would allow an attacker to extract the JWT.
  - *Countermeasures:* React's JSX automatically escapes text content before rendering, mitigating reflection-based XSS. All external HTML injection is disallowed.
- **Comparison to `httpOnly` Cookies:**
  - `httpOnly` cookies prevent JavaScript access, eliminating client-side XSS token theft. However, they introduce CSRF attack surfaces, require strict `SameSite=None; Secure` flags for cross-domain hosting, and necessitate anti-forgery tokens.
  - *Roadmap Plan:* Introducing a sliding-session refresh token stored in an `httpOnly` cookie alongside short-lived in-memory access tokens is planned as an enhancement.

---

## Error Handling Strategy

The API emits three distinct error shapes, each handled and translated by the frontend:

```mermaid
flowchart TD
    Req[Incoming HTTP Request] --> Pipeline{Error Condition?}
    Pipeline -->|DataAnnotations Failed| Shape2["Shape 2: Automatic 400 Validation Errors<br/>{ title, status: 400, errors: { Field: [...] } }"]
    Pipeline -->|Token Missing or Expired| Shape3["Shape 3: JWT Handler 401 Unauthorized<br/>Empty Body (Content-Length: 0)"]
    Pipeline -->|AppException Caught| Shape1["Shape 1: RFC 7807 ProblemDetails<br/>{ status: 400/403/404/409, title, detail }"]
    Pipeline -->|Unhandled Exception| Shape4["Generic 500 ProblemDetails<br/>Logs stack trace internally; returns clean 500 JSON"]

    Shape1 --> FrontendClient["Frontend Error Normalizer (src/utils/errors.js)"]
    Shape2 --> FrontendClient
    Shape3 --> FrontendClient
    Shape4 --> FrontendClient

    FrontendClient --> Toast["Toast Notification / Inline Form Error"]
```

### 1. Handled Business Exceptions (`ProblemDetails`)
Emitted by `src/ExpenseTracker.Api/Middleware/ExceptionHandlingMiddleware.cs` when domain rules are violated (`Content-Type: application/problem+json`):
```json
{
  "status": 409,
  "title": "Conflict",
  "detail": "This category has transactions. Move or delete them first, then try again."
}
```

### 2. Automatic Model Validation Errors
Emitted by ASP.NET Core `[ApiController]` infrastructure when DataAnnotations fail on incoming request bodies (`400 Bad Request`):
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Amount": [
      "The field Amount must be between 0.01 and 999999999.99.",
      "Value must have at most 2 decimal places."
    ]
  }
}
```

### 3. Unauthorized Requests
When a protected endpoint is accessed without a valid token, the ASP.NET Core `JwtBearer` handler immediately terminates the pipeline with `401 Unauthorized` and an **empty response body** (`Content-Length: 0`). The Axios client intercepts this and dispatches an automatic session-expired action.

---

## Getting Started Locally

### Prerequisites

Ensure the following runtimes and tools are installed:
1. **.NET 10.0 SDK** ([dotnet.microsoft.com/download](https://dotnet.microsoft.com/download))
   ```powershell
   dotnet --version  # Must output 10.0.x
   ```
2. **Microsoft SQL Server LocalDB** (included with Visual Studio) or an accessible SQL Server instance.
   ```powershell
   sqllocaldb info MSSQLLocalDB
   ```
3. **EF Core CLI Global Tool (`dotnet-ef`)**:
   ```powershell
   dotnet tool install --global dotnet-ef
   ```
4. **Node.js (v18+) & npm** ([nodejs.org](https://nodejs.org/))
   ```powershell
   node -v
   npm -v
   ```

---

### Backend Setup (Windows PowerShell)

#### 1. Navigate to the backend directory
```powershell
cd d:\dev\auspify\expense-tracker\backend
```

#### 2. Trust the ASP.NET Core HTTPS Development Certificate
```powershell
dotnet dev-certs https --trust
```

#### 3. Configure the JWT Secret in User Secrets
Set a local signing secret of at least 32 characters into the User Secrets store:
```powershell
dotnet user-secrets set "Jwt:Key" "development-super-secret-key-at-least-32-chars-long!" --project src/ExpenseTracker.Api
```

#### 4. Apply Database Migrations
Start the SQL LocalDB service and apply migrations to build the schema and seed default categories:
```powershell
sqllocaldb start MSSQLLocalDB
dotnet ef database update --project src/ExpenseTracker.Api
```

#### 5. Launch the Backend API
Run the project using the configured HTTPS profile:
```powershell
dotnet run --project src/ExpenseTracker.Api --launch-profile https
```

- **HTTPS API Base URL:** `https://localhost:7105`
- **HTTP Fallback:** `http://localhost:5041`
- **Swagger UI:** [https://localhost:7105/swagger](https://localhost:7105/swagger)
- **Health Check:** [https://localhost:7105/health](https://localhost:7105/health)

---

### Frontend Setup

#### 1. Navigate to the frontend directory
Open a second terminal window:
```powershell
cd d:\dev\auspify\expense-tracker\frontend
```

#### 2. Install Dependencies
```powershell
npm install
```

#### 3. Configure Environment Variables
Create `.env` based on `.env.example`:
```powershell
Copy-Item .env.example .env
```
Ensure `frontend/.env` contains:
```ini
VITE_API_URL=https://localhost:7105
```

#### 4. Start the Frontend Development Server
```powershell
npm run dev
```

The Vite dev server starts at **`http://localhost:5173`** with `strictPort: true`. Open the application in your browser.

---

### Local Troubleshooting Guide

| Symptom | Root Cause | Resolution |
| :--- | :--- | :--- |
| **CORS Blocked in Browser** | Frontend is not running on port 5173, or `VITE_API_URL` has a trailing slash. | The API CORS policy allows `http://localhost:5173` only. Ensure the frontend runs on port 5173 and `VITE_API_URL=https://localhost:7105` (no trailing `/`). |
| **Port 5173 In Use Error** | Another process is occupying port 5173 (`strictPort: true` rejects fallback ports). | Terminate the process using port 5173: `Stop-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess` |
| **API Fails at Startup (`InvalidOperationException: Jwt:Key...`)** | `Jwt:Key` is missing from user secrets or is shorter than 32 characters. | Run: `dotnet user-secrets set "Jwt:Key" "development-super-secret-key-at-least-32-chars-long!" --project src/ExpenseTracker.Api` |
| **Browser Untrusted HTTPS Certificate Warning** | ASP.NET Core development certificate is missing or untrusted. | Run `dotnet dev-certs https --clean` followed by `dotnet dev-certs https --trust`. |
| **Cannot open database "ExpenseTrackerDb"** | SQL Server LocalDB is not running or migrations have not been applied. | Run `sqllocaldb start MSSQLLocalDB` followed by `dotnet ef database update --project src/ExpenseTracker.Api`. |

---

## Configuration Reference

The application uses hierarchical configuration across both layers. In production, nested JSON keys are overridden using double-underscore (`__`) environment variables.

| Configuration Key | Environment Variable Name | Secret? | Default / Example Value | Description |
| :--- | :--- | :---: | :--- | :--- |
| `ConnectionStrings:DefaultConnection` | `ConnectionStrings__DefaultConnection` | **Yes** | `Server=(localdb)\MSSQLLocalDB;Database=ExpenseTrackerDb;...` | SQL Server ADO.NET connection string |
| `Jwt:Key` | `Jwt__Key` | **Yes** | `development-super-secret-key-at-least-32-chars-long!` | 32+ character HMAC-SHA256 signing secret |
| `Jwt:Issuer` | `Jwt__Issuer` | No | `ExpenseTracker.Api` | Expected JWT issuer claim |
| `Jwt:Audience` | `Jwt__Audience` | No | `ExpenseTracker.Client` | Expected JWT audience claim |
| `Jwt:ExpiryMinutes` | `Jwt__ExpiryMinutes` | No | `60` | Token lifespan in minutes |
| `Cors:AllowedOrigins:0` | `Cors__AllowedOrigins__0` | No | `http://localhost:5173` | Allowed origin for local Vite development |
| `Cors:AllowedOrigins:1` | `Cors__AllowedOrigins__1` | No | `https://expense-tracker-almaghrabyali.vercel.app` | Allowed origin for production Vercel frontend |
| `ASPNETCORE_ENVIRONMENT` | `ASPNETCORE_ENVIRONMENT` | No | `Development` / `Production` | Activates Swagger in Dev; disables it in Prod |
| `VITE_API_URL` | `VITE_API_URL` | No | `https://localhost:7105` | Base URL used by the Axios client in the frontend |

> [!IMPORTANT]
> The repository contains **no committed secrets**. Database connection strings and JWT signing keys are managed exclusively via `dotnet user-secrets` in development and hosting environment variables in production.

---

## Testing & Quality Assurance

### Frontend Vitest Suite & Linting

The frontend includes **64 unit and component tests** executed with Vitest and React Testing Library:

- **Date Arithmetic & Intervals:** Validates single-day presets, monthly ranges, and previous-period calculation lengths.
- **Currency & Number Formatting:** Verifies English (`EGP 14,519.50`) and Arabic (`14,519.50 ج.م`) currency outputs.
- **Error Normalization:** Validates parsing across RFC 7807 problem details, 400 validation error maps, and 401 empty bodies.
- **i18n & Category Localization:** Checks translation parity between English and Arabic dictionaries and system category name lookups.
- **Axios Interceptor & Session Invalidation:** Tests automatic `401 Unauthorized` token removal and event dispatching.
- **UI Components:** Tests modal interactions, date pickers, form state updates, and accessible attributes.

```powershell
# Navigate to frontend
cd frontend

# Run the Vitest test suite
npm test

# Run ESLint validation
npm run lint

# Verify production build compilation
npm run build
```

### Backend Automated Smoke Test & Verification

The backend production deployment was verified via a 14-point automated smoke test:

| Test Scenario | Target Endpoint | Expected Status | Result |
| :--- | :--- | :---: | :---: |
| **Health Check Probe** | `GET /health` | `200 OK` | **Passed** |
| **Invalid Credentials Login** | `POST /api/auth/login` | `401 Unauthorized` | **Passed** |
| **User Registration** | `POST /api/auth/register` | `200 OK` (Token payload) | **Passed** |
| **Duplicate Email Registration** | `POST /api/auth/register` | `409 Conflict` | **Passed** |
| **Unauthorized Profile Access** | `GET /api/auth/me` (No token) | `401 Unauthorized` | **Passed** |
| **Authorized Profile Access** | `GET /api/auth/me` (With Bearer) | `200 OK` | **Passed** |
| **Retrieve Default Categories** | `GET /api/categories` | `200 OK` (12 categories) | **Passed** |
| **Create Valid Transaction** | `POST /api/transactions` | `201 Created` | **Passed** |
| **Category Type Mismatch** | `POST /api/transactions` | `400 Bad Request` | **Passed** |
| **Summary Report Calculations** | `GET /api/reports/summary` | `200 OK` | **Passed** |
| **Category Share Aggregations** | `GET /api/reports/by-category` | `200 OK` ($\sum \% = 100$) | **Passed** |
| **Monthly Breakdown Structure** | `GET /api/reports/monthly` | `200 OK` (12 months) | **Passed** |
| **Delete Transaction** | `DELETE /api/transactions/{id}` | `204 No Content` | **Passed** |
| **Verify Deleted Transaction** | `GET /api/transactions/{id}` | `404 Not Found` | **Passed** |

> [!NOTE]
> Automated backend unit tests (`backend/tests/`) are currently not implemented in the repository. Schema and endpoint behavior have been validated through Swagger and the 14-point smoke test. Building a unit test project using xUnit and Testcontainers is listed in the [Roadmap](#roadmap--future-enhancements).

### Automated Smoke Test Script

Run this self-contained PowerShell script to verify any local or remote API instance:

```powershell
$baseUrl = "https://localhost:7105"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "1. Testing Health Endpoint..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "   Health Status: $($health.status) (HTTP 200)" -ForegroundColor Green
} catch {
    Write-Host "   Health Check Failed: $_" -ForegroundColor Red
}

Write-Host "`n2. Testing Unauthorized Protected Access..." -ForegroundColor Cyan
try {
    Invoke-RestMethod -Uri "$baseUrl/api/auth/me" -Method Get
    Write-Host "   Failed: Protected endpoint did not require authentication!" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "   Success: Correctly rejected with HTTP 401 Unauthorized" -ForegroundColor Green
    } else {
        Write-Host "   Unexpected Status: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}
```

---

## Deployment Architecture

### Production Topology

```mermaid
flowchart TD
    User["End User (Mobile / Desktop)"]
    
    subgraph VercelHost ["Vercel Edge Platform"]
        VercelCDN["Vercel Global Edge CDN<br/>expense-tracker-almaghrabyali.vercel.app"]
        SPAConfig["vercel.json (SPA Route Rewrites to /index.html)"]
    end

    subgraph MonsterHost ["MonsterASP.NET (Windows Server IIS)"]
        API["ASP.NET Core Web API (In-Process)<br/>expensetracker.tryasp.net"]
        DB[("Microsoft SQL Server (Internal)")]
        LE["Let's Encrypt Automated SSL Certificate"]
    end

    User -->|HTTPS Request (HTML/Assets)| VercelCDN
    VercelCDN --- SPAConfig
    User -->|API REST Calls (JSON)| API
    API --- LE
    API -->|Internal SQL Connection| DB
```

### Continuous Deployment Workflow

1. **Frontend Deployment (Vercel):**
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variable:** `VITE_API_URL=https://expensetracker.tryasp.net` (injected at build time).
   - **SPA Routing:** `frontend/vercel.json` rewrites all non-asset routes to `/index.html` to support client-side routing on page refresh.
   - **CI/CD:** Redeploys on git push to `main`.

2. **Backend Deployment (MonsterASP.NET):**
   - **Hosting Model:** Windows Server / IIS ASP.NET Core In-Process Module (.NET 10 runtime).
   - **Publish Mechanism:** Deployed via Visual Studio Web Deploy (`msdeploy`).
   - **Environment Variables:**
     - `ASPNETCORE_ENVIRONMENT` = `Production`
     - `ConnectionStrings__DefaultConnection` = `<Production SQL Server Connection String>`
     - `Jwt__Key` = `<Secure 64-character secret key>`
     - `Cors__AllowedOrigins__0` = `http://localhost:5173`
     - `Cors__AllowedOrigins__1` = `https://expense-tracker-almaghrabyali.vercel.app`
   - **Remote Database Migrations:** Migrations are applied manually from the developer workstation:
     ```powershell
     dotnet ef database update --connection "<Production_Connection_String>" --project src/ExpenseTracker.Api
     ```

---

## Roadmap & Future Enhancements

- [ ] **Backend Unit & Integration Test Suite:**
  - Build comprehensive unit test coverage for `AuthService`, `CategoryService`, `TransactionService`, and `ReportService` using **xUnit** and **Moq**.
  - Add end-to-end integration tests using `WebApplicationFactory` and **Testcontainers** for SQL Server.
- [ ] **Sliding Session Refresh Tokens:**
  - Introduce database-persisted refresh tokens with device fingerprinting, automatic token family revocation upon reuse, and storage in secure `httpOnly` cookies.
- [ ] **Category-Based Spending Budgets:**
  - Allow users to set monthly budget caps per category with visual progress bars and over-budget alerts.
- [ ] **Data Export Capabilities:**
  - Implement endpoints and UI actions to export transaction records and summary analytics to **CSV** and **PDF** formats (`GET /api/reports/export`).
- [ ] **Recurring Transactions:**
  - Automated scheduling for monthly recurring expenses (rent, subscriptions) and incomes (salaries).
- [ ] **Dark Mode Theme:**
  - Add user-toggleable dark mode with persistent local storage preference.
- [ ] **Rate Limiting Middleware:**
  - Configure ASP.NET Core rate limiting on `/api/auth/login` and `/api/auth/register` to protect against credential brute-forcing.

---

## Author & Attribution

- **Developer:** **Almaghraby Ali**
- **Education:** Computer Science Student, Faculty of Computers and AI, University of Sadat City
- **GitHub:** [@AlmaghrabyAli](https://github.com/AlmaghrabyAli)
- **Repository:** [https://github.com/AlmaghrabyAli/expense-tracker](https://github.com/AlmaghrabyAli/expense-tracker)
- **Project Context:** Developed as **Task 3** of the Full Stack Development Internship at **Auspify Technologies** (October–November 2026).
