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

## n8n Workflow

The file `n8nworkflow.json` contains the complete n8n automation workflow used in this project. It handles customer request processing, AI analysis, decision-making, human review, and database updates.

The workflow can be imported directly into n8n to recreate the automation.

## Supabase Database

Supabase is used to store and manage customer request data and workflow status.

The project uses database tables to store:

* **Customer Requests** – customer details, request information, priority, and status.
* **Workflow/Processing Data** – AI analysis, decisions, and processing results.
* **Human Review Data** – requests that require manual review and their review status.

The Next.js dashboard reads this data from Supabase to display the current state of customer operations.

```

## Setup

```bash
npm install
npm run dev
```

Add your Supabase credentials to `.env.local`.
