export type ApiError = {
  message?: string;
  error?: string;
  statusCode?: number;
};

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

export function getToken() {
  return localStorage.getItem('rh_access_token');
}

export function getUserInfo() {
  const raw = localStorage.getItem('rh_user_info');

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSession(accessToken: string, userInfo: unknown) {
  localStorage.setItem('rh_access_token', accessToken);
  localStorage.setItem('rh_user_info', JSON.stringify(userInfo));
}

export function clearSession() {
  localStorage.removeItem('rh_access_token');
  localStorage.removeItem('rh_user_info');
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (response.status === 401) {
    clearSession();
  }

  if (!response.ok) {
    const apiError = data as ApiError;
    throw new Error(
      apiError?.message ||
      apiError?.error ||
      `Erro HTTP ${response.status}`,
    );
  }

  return data as T;
}
