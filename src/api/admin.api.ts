const baseUrl = import.meta.env.VITE_API_URL + "api/login";

export const logIn = async (login: string, password: string) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });

  const data = await res.json();

  return { data, res };
};
