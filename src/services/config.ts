/**
 * Backend service URLs. When a URL is not set, the service falls back to mock data,
 * so the UI works standalone and switches to the Spring Boot services once configured.
 */
export const API = {
  profile: import.meta.env["VITE_PROFILE_API_URL"] as string | undefined,
  post: import.meta.env["VITE_POST_API_URL"] as string | undefined,
  interaction: import.meta.env["VITE_INTERACTION_API_URL"] as string | undefined,
};

export async function http<T>(base: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${path}`);
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

/** Simulated latency for mock responses */
export const mock = <T,>(data: T, ms = 120) =>
  new Promise<T>((r) => setTimeout(() => r(structuredClone(data)), ms));
