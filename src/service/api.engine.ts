import axios from "axios";

const client = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("hasToken")}`,
});

const injectParams = (url: string, params?: Record<string, any>): string => {
  if (!params) return url;
  let finalUrl = url;
  Object.keys(params).forEach((key) => {
    if (finalUrl.includes(`:${key}`)) {
      finalUrl = finalUrl.replace(
        `:${key}`,
        encodeURIComponent(String(params[key])),
      );
    }
  });
  return finalUrl;
};

export const request = async <TResponse>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  urlPattern: string,
  options?: {
    pathParams?: Record<string, any>;
    queryParams?: Record<string, any>;
    body?: any;
    headers?: Record<string, string>;
  },
): Promise<TResponse> => {
  const urlWithParams = injectParams(urlPattern, options?.pathParams);

  const response = await client.request<TResponse>({
    method,
    url: urlWithParams,
    params: options?.queryParams,
    data: options?.body,
    headers: {
      ...client.defaults.headers.common,
      ...options?.headers,
    },
  });

  return response.data;
};
