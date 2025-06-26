# Chefu

Chefu is a modern meal planning and recipe management web application. It helps users generate meal plans, manage recipes, and track their meal history with a beautiful, intuitive interface. Chefu leverages AI for smart meal suggestions and integrates with Supabase, Clerk, and other modern tools for authentication and data storage.

## Features
- AI-powered meal plan generation
- Recipe management and history
- User authentication (Clerk)
- Responsive, modern UI
- Integration with Supabase for data storage

## Tech Stack
- **Next.js** (React framework)
- **TypeScript**
- **Supabase** (database & auth)
- **Clerk** (authentication)
- **Drizzle ORM**
- **PostgreSQL**
- **Turso** (libSQL)
- **Google Gemini API** (AI meal suggestions)
- **PostHog** (analytics, optional)

## Tools Used
- ESLint, Prettier (code quality)
- PostCSS
- Tailwind CSS (if used in your project)
- VS Code (recommended)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Bun (if used)
- A Supabase project (for database and auth)
- Clerk account (for authentication)
- Google Cloud project (for Gemini API)
- Turso account (for libSQL, optional)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/chefu.git
   cd chefu
   ```
2. **Install dependencies:**
   ```sh
   bun install
   # or
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your API keys and secrets:
     - `GEMINI_API_KEY` (Google Gemini)
     - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase)
     - `GAuth_CLIENT_ID` and `GAuth_CLIENT_SECRET` (Google OAuth)
     - `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (Clerk)
     - `DATABASE_URL` (Supabase Postgres)
     - `TURSO_AUTH_TOKEN` and `TURSO_DATABASE_URL` (Turso, optional)
     - `CLERK_WEBHOOK_SECRET` (Clerk webhooks)
   - See the `.env` file for all required variables.
4. **Run the development server:**
   ```sh
   bun run dev
   # or
   npm run dev
   ```
5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## API Keys & Environment Variables
You must provide the following keys in your `.env` file:
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GAuth_CLIENT_ID`
- `GAuth_CLIENT_SECRET`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `DATABASE_URL`
- `TURSO_AUTH_TOKEN` (if using Turso)
- `TURSO_DATABASE_URL` (if using Turso)
- `CLERK_WEBHOOK_SECRET`

## Contribution Guide
We welcome contributions! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run lint and tests
5. Submit a pull request with a clear description

Please follow the code style and include tests where possible.

## License

MIT License

Copyright (c) 2025 Sahil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
