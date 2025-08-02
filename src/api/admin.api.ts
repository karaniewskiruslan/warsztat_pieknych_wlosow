export const logIn = async (login: string, password: string) => {
  const res = await fetch(
    "https://warsztat-pieknych-wlosow-backend.onrender.com/api/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    },
  );

  const data = await res.json();

  return { data, res };
};
