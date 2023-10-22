const handleResponse = async (response: Response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

// TODO: move URL to env, abstract content-type away
const buildUrl = (url: string) => `${import.meta.env.VITE_BASE_API_URL}${url}`;

export const fetchData = {
  get: async (url: string) =>
    fetch(buildUrl(url), { method: "GET" }).then(handleResponse),
  post: async (url: string, body: Object) =>
    fetch(buildUrl(url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(handleResponse),
  put: async (url: string, body: Object) =>
    fetch(buildUrl(url), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(handleResponse),
  delete: async (url: string) => {
    return fetch(buildUrl(url), {
      method: "DELETE",
    }).then(handleResponse);
  },
};
