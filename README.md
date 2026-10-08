# AI-Powered Customer Operations Workflow

An AI-powered customer support automation system that receives customer requests, analyzes their intent, urgency, and details using AI, and determines the appropriate next step. Requests that can be handled automatically are processed through the workflow, while requests requiring human attention are routed for review. The system uses n8n for automation, Supabase for storing request data and status, and a Next.js dashboard for monitoring and managing customer requests.

## Tech Stack

* **Next.js** – Customer operations dashboard
* **n8n** – Workflow automation
* **Supabase** – Database
* **AI/LLM** – Request analysis and classification

## How It Works

```text
Customer Request
       ↓
      n8n
       ↓
      AI
       ↓
Decision
 ↓           ↓
Auto Action  Human Review
       ↓
   Supabase
       ↓
   Dashboard
```

## Project Structure

```text
support-dashboard/
├── app/                 # Next.js frontend
├── components/          # UI components
├── n8n/                 # n8n workflow JSON
├── supabase/             # Database schema
└── README.md
```

## n8n

The n8n workflow handles the automation, AI processing, decision-making, and database updates.

Export the workflow from n8n and save it in:

```text
n8n/customer-operations-workflow.json
```

## Supabase

Supabase stores customer requests and their processing status.

Database-related SQL can be stored in:

```text
supabase/schema.sql
```

## Setup

```bash
npm install
npm run dev
```

Add your Supabase credentials to `.env.local`.
