// API client for Caduceus backend
// Falls back to static data when API is unavailable

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchApi<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchLeaderboard() {
  return fetchApi<Record<string, unknown>[]>("/api/v1/leaderboard");
}

export async function fetchStats() {
  return fetchApi<Record<string, unknown>>("/api/v1/stats");
}

export async function fetchBenchmarks() {
  return fetchApi<Record<string, unknown>[]>("/api/v1/benchmarks");
}

export async function registerAgent(name: string, description: string, model: string) {
  return fetchApi<{ agent_id: string; api_key: string }>("/api/v1/agents/register", {
    method: "POST",
    body: JSON.stringify({ name, description, model }),
  });
}

export async function submitRun(apiKey: string, benchmarkId: string, submission: Record<string, unknown>) {
  return fetchApi<{ run_id: string; status: string; overall_score: number }>("/api/v1/runs", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ benchmark_id: benchmarkId, submission }),
  });
}

export async function fetchTasks(domain?: string, difficulty?: string) {
  const params = new URLSearchParams();
  if (domain) params.set("domain", domain);
  if (difficulty) params.set("difficulty", difficulty);
  const qs = params.toString();
  return fetchApi<Record<string, unknown>[]>(`/api/v1/tasks${qs ? `?${qs}` : ""}`);
}

export async function fetchTraces() {
  return fetchApi<Record<string, unknown>[]>("/api/v1/traces");
}
