export const apiFetch = async (
  endpoint: string,
  options: RequestInit,
  urlParams?: URLSearchParams
) => {
  const baseUrl = new URL(`/api${endpoint}`, window.location.origin);
  if (urlParams) {
    baseUrl.search = urlParams.toString();
  }

  const response = await fetch(baseUrl, {
    ...options,
    headers: {
      ...options?.headers,
      'content-type': 'application/json',
    },
    body: options?.body ? options.body : undefined, // Automatically stringify the body
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null); // Handle non-JSON error responses
    throw new Error(error?.message || 'Request failed');
  }

  // Handle responses with no body
  if (
    response.status === 204 ||
    response.headers.get('Content-Length') === '0'
  ) {
    return null; // Return `null` for no-content responses
  }

  return response.json();
};
