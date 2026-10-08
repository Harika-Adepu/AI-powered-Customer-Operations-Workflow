"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  customer_email: string | null;
  subject: string | null;
  message: string | null;
  intent: string | null;
  priority: string | null;
  sentiment: string | null;
  summary: string | null;
  recommended_action: string | null;
  requires_human: boolean | null;
  missing_information: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
};

export default function Home() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadRequests() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
    .from("requests")
    .select("*")
    .eq("customer_email", "harika@scalepods.co")
    .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setRequests([]);
    } else {
      setRequests(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  const total = requests.length;

  const pending = requests.filter(
    (request) =>
      request.status === "waiting_for_human" ||
      request.requires_human === true
  ).length;

  const completed = requests.filter(
    (request) => request.status === "completed"
  ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Customer Operations
            </h1>

            <p className="mt-2 text-gray-700">
              AI-powered customer support workflow
            </p>
          </div>

          <button
            onClick={loadRequests}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Refresh
          </button>
        </div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-700">
              Total Requests
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {total}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-700">
              Human Review
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-600">
              {pending}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-700">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {completed}
            </p>
          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <p className="font-semibold">Supabase error</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="font-medium text-gray-800">
              Loading customer requests...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && requests.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-900">
              No customer requests yet
            </p>

            <p className="mt-2 text-gray-700">
              Send a customer email to the connected Gmail inbox.
            </p>
          </div>
        )}

        {/* REQUESTS */}
        {!loading && requests.length > 0 && (
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Customer Requests
              </h2>

              <span className="text-sm font-medium text-gray-600">
                {requests.length} request
                {requests.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-5">

              {requests.map((request) => (

                <div
                  key={request.id}
                  className="rounded-lg border border-gray-200 bg-white p-5"
                >

                  {/* TOP */}
                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    <div className="min-w-0">

                      <p className="font-semibold text-gray-900">
                        {request.customer_email || "Unknown customer"}
                      </p>

                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {request.subject || "(No subject)"}
                      </p>

                    </div>

                    {/* STATUS */}
                    <span
                      className={`h-fit rounded-full px-3 py-1 text-sm font-semibold ${
                        request.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : request.status === "waiting_for_human"
                          ? "bg-orange-100 text-orange-800"
                          : request.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {request.status || "received"}
                    </span>

                  </div>

                  {/* CUSTOMER MESSAGE */}
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-gray-700">
                      Customer Message
                    </p>

                    <p className="mt-1 whitespace-pre-wrap text-gray-800">
                      {request.message || "No message"}
                    </p>
                  </div>

                  {/* AI ANALYSIS */}
                  <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4">

                    <p className="mb-4 font-semibold text-gray-900">
                      AI Analysis
                    </p>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                          Intent
                        </p>

                        <p className="mt-1 font-medium text-gray-900">
                          {request.intent || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                          Priority
                        </p>

                        <p className="mt-1 font-medium text-gray-900">
                          {request.priority || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                          Sentiment
                        </p>

                        <p className="mt-1 font-medium text-gray-900">
                          {request.sentiment || "-"}
                        </p>
                      </div>

                    </div>

                    <div className="mt-5">

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Summary
                      </p>

                      <p className="mt-1 text-gray-800">
                        {request.summary || "Analysis pending"}
                      </p>

                    </div>

                    <div className="mt-5">

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Recommended Action
                      </p>

                      <p className="mt-1 text-gray-800">
                        {request.recommended_action ||
                          "Analysis pending"}
                      </p>

                    </div>

                    {request.missing_information && (
                      <div className="mt-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                          Missing Information
                        </p>

                        <p className="mt-1 text-gray-800">
                          {request.missing_information}
                        </p>

                      </div>
                    )}

                  </div>

                  {/* HUMAN REVIEW */}
                  {request.requires_human && (
                    <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4">

                      <p className="font-semibold text-orange-900">
                        Human Review Required
                      </p>

                      <p className="mt-1 text-sm text-orange-800">
                        The n8n workflow has sent an approval request
                        to the operations team.
                      </p>

                    </div>
                  )}

                  {/* COMPLETED */}
                  {request.status === "completed" && (
                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">

                      <p className="font-semibold text-green-900">
                        Request Completed
                      </p>

                      <p className="mt-1 text-sm text-green-800">
                        The customer response has been sent.
                      </p>

                    </div>
                  )}

                  {/* CREATED DATE */}
                  <p className="mt-4 text-xs text-gray-600">
                    Created:{" "}
                    {new Date(request.created_at).toLocaleString()}
                  </p>

                </div>

              ))}

            </div>
          </div>
        )}

        {/* AUTOMATION FLOW */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Automation Flow
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-sm">

            <span className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              Gmail
            </span>

            <span className="font-bold text-gray-600">
              →
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              n8n
            </span>

            <span className="font-bold text-gray-600">
              →
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              Supabase
            </span>

            <span className="font-bold text-gray-600">
              →
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              Claude AI
            </span>

            <span className="font-bold text-gray-600">
              →
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              Human Review
            </span>

            <span className="font-bold text-gray-600">
              →
            </span>

            <span className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800">
              Customer Response
            </span>

          </div>

        </div>

        {/* FOOTER */}
        <div className="py-6 text-center text-sm text-gray-600">
          Customer Operations Workflow • Powered by n8n, Supabase & Claude
        </div>

      </div>
    </main>
  );
}