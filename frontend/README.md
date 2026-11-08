# Expense Tracker — Frontend

A bilingual (English LTR / Arabic RTL) personal finance web application calibrated strictly in Egyptian Pounds (EGP). It interfaces directly with an ASP.NET Core REST API backend.

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **State & Data Fetching**: TanStack React Query v5 + Axios
- **Forms**: React Hook Form
- **Data Visualization**: Recharts
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React
- **Testing**: Vitest + Testing Library + jsdom

## Requirement

The ASP.NET Core backend must be running before using the application. By default, the frontend expects the backend at `https://localhost:7105`.

## Environment Variable

Create a `.env` file in the project root:

```env
# Base URL of the ASP.NET Core backend API
VITE_API_URL=https://localhost:7105
```

## Folder Structure

```
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
    │   ├── auth.js
    │   ├── categories.js
    │   ├── client.js
    │   ├── reports.js
    │   └── transactions.js
    ├── components/
    │   ├── categories/
    │   ├── charts/
    │   ├── dashboard/
    │   ├── layout/
    │   ├── transactions/
    │   └── ui/
    ├── context/
    │   └── AuthContext.jsx
    ├── hooks/
    │   ├── useCategories.js
    │   ├── useDebounce.js
    │   ├── useReports.js
    │   └── useTransactions.js
    ├── i18n/
    │   ├── index.js
    │   └── locales/
    │       ├── ar.json
    │       └── en.json
    ├── pages/
    │   ├── Categories.jsx
    │   ├── Dashboard.jsx
    │   ├── Login.jsx
    │   ├── NotFound.jsx
    │   ├── Register.jsx
    │   └── Transactions.jsx
    ├── routes/
    │   ├── ProtectedRoute.jsx
    │   ├── PublicRoute.jsx
    │   └── index.jsx
    ├── test/
    │   ├── apiClient.test.js
    │   ├── categoryName.test.js
    │   ├── components.test.jsx
    │   ├── dates.test.js
    │   ├── errors.test.js
    │   ├── format.test.js
    │   ├── i18n.test.js
    │   └── setup.js
    └── utils/
        ├── categoryName.js
        ├── constants.js
        ├── dates.js
        ├── errors.js
        └── format.js
```

## Pages

1. **Dashboard** (`/`): Balance overview, period comparison trends, income/expense metrics, category breakdown donut chart, 12-month inflow/outflow bar chart, and recent transactions.
2. **Transactions** (`/transactions`): Paginated table (desktop) and card view (mobile), type/category/date filtering, note keyword search with debounce, sorting, and create/edit/delete modals.
3. **Categories** (`/categories`): 12 locked default categories with Arabic translations, custom category management with color picker, and 409 conflict protection when linked transactions exist.
4. **Login** (`/login`): Authentication with email and password, error banners, and token storage.
5. **Register** (`/register`): User registration with duplicate email validation.
6. **404 Not Found** (`*`): Clean fallback screen with navigation back to the dashboard.

## Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 5173)
npm run dev

# 3. Run all unit and component tests
npm test

# 4. Check TypeScript types and lint
npm run lint

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```
