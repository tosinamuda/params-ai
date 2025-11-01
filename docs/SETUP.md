# Setup Guide

Complete step-by-step instructions for setting up Params.AI from scratch.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm 8.15.4+** - Install with `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com/)
- **PostgreSQL 14+** OR **Neon account** (recommended for quick start)
- **Firebase account** (free tier works)
- **LLM API key** (OpenAI, Google, or Cloudflare)

### Verify Prerequisites

```bash
# Check Node.js version (need 18+)
node --version
# Output: v18.x.x or higher

# Check pnpm
pnpm --version
# Output: 8.15.4 or higher

# Check Git
git --version
```

## Step-by-Step Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd params-ai
```

### 2. Install Dependencies

```bash
# This will install packages for all workspaces
pnpm install
```

### 3. Set Up Firebase Authentication

#### 3.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"**
3. Enter project name (e.g., "params-ai-dev")
4. Disable Google Analytics (optional)
5. Click **"Create Project"**

#### 3.2 Enable Email/Password Authentication

1. In Firebase Console → **Authentication** → **Get Started**
2. Click **"Email/Password"** under Sign-in providers
3. Toggle **Enable**
4. Click **Save**

#### 3.3 Get Client SDK Configuration

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **"Your apps"** section
3. Click the **Web app icon** (`</>`)
4. Register app with nickname (e.g., "params-ai-web")
5. Copy the `firebaseConfig` object - you'll need these values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

#### 3.4 Get Admin SDK Credentials

1. Go to **Project Settings** → **Service Accounts** tab
2. Click **"Generate new private key"**
3. Download the JSON file
4. **Keep this file secure** - it has full access to your Firebase project

The JSON contains:
```json
{
  "project_id": "your-project-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com"
}
```

### 4. Set Up Database

Choose **Option A** (Neon) for quickest setup, or **Option B** (Local) for offline development.

#### Option A: Neon Serverless PostgreSQL (Recommended)

1. Go to [Neon](https://neon.tech/)
2. Sign up with GitHub/Google (free tier available)
3. Click **"Create a project"**
4. Name your project (e.g., "params-ai")
5. Select region closest to you
6. Copy the connection string:

```
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

**Note:** Keep this connection string - you'll need it for the `.env` file.

#### Option B: Local PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb params_ai
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb params_ai
```

**Windows:**
1. Download [PostgreSQL](https://www.postgresql.org/download/windows/)
2. Run installer
3. Use pgAdmin to create database "params_ai"

**Connection string format:**
```
postgresql://localhost:5432/params_ai
# Or with user/password:
postgresql://username:password@localhost:5432/params_ai
```

### 5. Get LLM API Keys

You need at least **one** LLM provider API key.

#### OpenAI (Recommended)

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-proj-...`)
5. Add credits if needed ($5 minimum)

#### Google Gemini (Alternative)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Get API key"**
3. Create new API key
4. Copy the key (starts with `AIza...`)

#### Cloudflare Workers AI (Alternative)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Overview**
3. Note your **Account ID**
4. Go to **My Profile** → **API Tokens**
5. Create token with "Workers AI" permissions

### 6. Configure Environment Variables

#### 6.1 Backend Environment

**Step 1: Create .env file**

```bash
cd packages/backend
cp .env.example .env
```

Edit `packages/backend/.env`:

```bash
# Database Connection
DATABASE_URL="postgresql://localhost:5432/params_ai"
# For Neon, use the connection string you copied earlier

# Server Configuration
PORT=8080
DEBUG="*"

# LLM API Keys (at least one required)
# Option 1: OpenAI
OPENAI_API_KEY="sk-proj-XXXXXXXXXXXXXXXXXXXXXXXX"

# Option 2: Cloudflare Worker AI
CF_API_KEY="your-cloudflare-api-key"
CF_ACCOUNT_ID="your-cloudflare-account-id"

# Option 3: Google AI Studio
GOOGLE_API_KEY="AIzaXXXXXXXXXXXXXXXXXXXX"
```

**Step 2: Create Firebase credentials file**

Copy the Firebase Admin SDK JSON file (downloaded in step 3.4) to the backend config folder:

```bash
cp /path/to/downloaded/firebase-adminsdk.json src/config/firebase-key.json
```

Or create `src/config/firebase-key.json` manually with the content from step 3.4.

**Tips:**
- You only need ONE LLM provider API key (OpenAI recommended)
- The `firebase-key.json` file is gitignored for security
- Keep your Firebase credentials secure and never commit them

#### 6.2 Frontend Environment

```bash
cd ../frontend
cp .env.example .env.development
```

Edit `packages/frontend/.env.development`:

```bash
# Backend API endpoints (both served from the same server on port 8080)
VITE_APP_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_TRPC_SERVER_URL=http://localhost:8080/trpc

# Optional: OpenAI API key for client-side features (if any)
VITE_OPENAI_API_KEY=""
```

**Note:** Firebase configuration is hardcoded in `packages/frontend/src/features/Auth/config/firebase.ts`. If you need to use a different Firebase project, edit that file directly with your Firebase credentials from step 3.3.

**Return to project root:**
```bash
cd ../..

### 7. Initialize Database

```bash
cd packages/backend

# Generate Prisma client (creates TypeScript types)
pnpm prisma generate

# Run database migrations (creates tables)
pnpm prisma migrate dev

# Seed database with sample data
pnpm prisma db seed

# Return to root
cd ../..
```

**Expected output:**
```
✔ Generated Prisma Client to ./node_modules/@prisma/client
✔ Your database is now in sync with your Prisma schema.
✔ Seeded database successfully
```

**Troubleshooting:**
- **"Can't reach database server"**: Check `DATABASE_URL` is correct
- **"SSL connection required"**: Add `?sslmode=require` to Neon connection string
- **Migration conflicts**: Run `pnpm prisma migrate reset` (⚠️ deletes all data)

### 8. Start Development Servers

```bash
# From project root
pnpm dev
```

**What this does:**
- Starts backend API on http://localhost:8080 (serves both REST API and tRPC)
- Starts frontend dev server on http://localhost:5173
- Enables hot reload for both

**Expected output:**
```
> turbo dev

@params/backend:dev: [nodemon] starting `ts-node src/server.ts`
@params/backend:dev: 🚀 Server ready at: http://localhost:8080

@params/frontend:dev: VITE v4.x.x ready in XXXms
@params/frontend:dev: ➜ Local: http://localhost:5173/
```

### 9. Verify Installation

#### 9.1 Check Backend Health

```bash
curl http://localhost:8080/healthz
```

**Expected response:**
```json
{"status":"ok"}
```

#### 9.2 Open Frontend

1. Open browser: http://localhost:5173
2. You should see the Params.AI homepage
3. Click **"Login"** or navigate to `/login`

#### 9.3 Create Test Account

1. On login page, click **"Sign Up"**
2. Enter email and password
3. Click **"Create Account"**
4. Should redirect to dashboard after successful signup

#### 9.4 Test Prompt Lab

1. Navigate to `/app/studio`
2. Click **"Add New"** button
3. Should see 3-column Prompt Lab interface
4. Try typing: `Write a {{tone}} email to {{recipient}}`
5. Form preview should show 2 input fields automatically

### 10. Optional - View Database

```bash
cd packages/backend

# Launch Prisma Studio (visual database browser)
pnpm prisma studio
```

Opens at http://localhost:5555 - you can browse tables, view data, and make edits.

## Troubleshooting

### Issue: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::8080`

**Solution:**
```bash
# Find and kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or change port in packages/backend/.env
PORT=8081
```

### Issue: Prisma Client Not Found

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
cd packages/backend
pnpm prisma generate
cd ../..
pnpm dev
```

### Issue: Firebase Auth Failing

**Symptoms:** Login doesn't work, console shows Firebase errors

**Solutions:**

1. **Check environment variables:**
```bash
# In packages/frontend/.env.development
cat packages/frontend/.env.development | grep VITE_FIREBASE
```

2. **Verify Firebase console settings:**
   - Authentication → Email/Password should be enabled
   - Project Settings → Your apps should show registered web app

3. **Check browser console** for specific error messages

4. **Common fixes:**
   - Clear browser cache and cookies
   - Verify all `VITE_FIREBASE_*` variables are set
   - Check for typos in environment variable names

### Issue: Database Connection Failed

**Error:** `Can't reach database server at ...`

**Solutions:**

1. **For local PostgreSQL:**
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql  # macOS
sudo systemctl status postgresql      # Linux

# Start if not running
brew services start postgresql@14     # macOS
sudo systemctl start postgresql       # Linux
```

2. **For Neon:**
   - Check connection string format
   - Ensure you included `?sslmode=require`
   - Verify account is active (check email for activation)

3. **Test connection manually:**
```bash
psql "YOUR_DATABASE_URL" -c "SELECT 1"
```

### Issue: LLM Inference Not Working

**Symptoms:** "Generate" button fails, no AI output

**Solutions:**

1. **Verify API key is valid:**
```bash
# Test OpenAI key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_OPENAI_KEY"
```

2. **Check API credits:**
   - Go to [OpenAI Usage](https://platform.openai.com/usage)
   - Ensure you have remaining credits

3. **Review backend logs:**
   - Backend terminal should show error details
   - Look for LLM provider error messages

4. **Check environment file:**
```bash
# Verify key is actually set
cd packages/llm
cat .env | grep OPENAI_API_KEY
```

### Issue: pnpm Install Fails

**Error:** Various dependency resolution errors

**Solutions:**

1. **Clear pnpm cache:**
```bash
pnpm store prune
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

2. **Update pnpm:**
```bash
npm install -g pnpm@latest
pnpm --version  # Verify 8.15.4+
```

3. **Check Node.js version:**
```bash
node --version  # Must be 18+
```

### Issue: Hot Reload Not Working

**Symptoms:** Changes don't appear automatically

**Solutions:**

1. **Restart dev server:**
```bash
# Stop with Ctrl+C
pnpm dev
```

2. **Clear Vite cache:**
```bash
cd packages/frontend
rm -rf node_modules/.vite
cd ../..
pnpm dev
```

3. **Check file watchers (Linux):**
```bash
# Increase limit if needed
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Next Steps

Now that your environment is set up:

1. **Explore the Prompt Lab:** Navigate to `/app/studio` and try creating prompts with `{{variables}}`
2. **Test Published Apps:** Visit `/app/:slug` to see the user-facing interface
3. **Review the codebase:** Check `packages/frontend/src/features/PromptLab/` to understand the implementation
4. **Consider contributing:** See the main [README.md](../README.md) for contribution areas

## Environment Variables Reference

### Backend (`packages/backend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string | `postgresql://localhost:5432/params_ai` |
| `PORT` | ❌ | Server port (default: 8080) | `8080` |
| `DEBUG` | ❌ | Debug mode | `"*"` |
| `OPENAI_API_KEY` | ⭐ | OpenAI API key | `sk-proj-XXXXXXXX` |
| `CF_API_KEY` | ⭐ | Cloudflare Workers AI key | `your-cf-key` |
| `CF_ACCOUNT_ID` | ⭐ | Cloudflare account ID | `abc123def456` |
| `GOOGLE_API_KEY` | ⭐ | Google Gemini API key | `AIzaXXXXXXXX` |

⭐ = At least one LLM provider required

**Additional File Required:** `src/config/firebase-key.json` - Firebase Admin SDK service account credentials (see step 3.4)

### Frontend (`packages/frontend/.env.development`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_APP_API_BASE_URL` | ✅ | Backend REST API base URL | `http://localhost:8080/api/v1` |
| `VITE_APP_TRPC_SERVER_URL` | ✅ | tRPC server endpoint | `http://localhost:8080/trpc` |
| `VITE_OPENAI_API_KEY` | ❌ | OpenAI API key for client-side features | `sk-proj-XXXXXXXX` |

**Note:** Both endpoints are served from the same backend server (default port 8080). Firebase credentials are hardcoded in `src/features/Auth/config/firebase.ts`

## Common Development Commands

```bash
# Start everything
pnpm dev

# Start only frontend
pnpm dev:frontend

# Start only backend
pnpm dev:backend

# Database operations
cd packages/backend
pnpm prisma studio          # Visual database browser
pnpm prisma migrate dev     # Create new migration
pnpm prisma db seed         # Run seed script
pnpm prisma migrate reset   # ⚠️ Reset database (deletes all data)

# Build for production
pnpm build
```

## Support

If you're still experiencing issues:

1. Check existing [GitHub Issues](https://github.com/your-org/params-ai/issues)
2. Open a new issue with:
   - Your operating system
   - Node.js version (`node --version`)
   - pnpm version (`pnpm --version`)
   - Error messages (full stack trace)
   - Steps to reproduce

---

**Setup completed?** Return to [README.md](../README.md) to learn about the architecture and user flows.
