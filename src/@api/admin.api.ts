const baseUrl = import.meta.env.VITE_API_URL + "api/login";
import axios from "axios";

export const logIn = async (login: string, password: string) => {
  const res = await axios.post<{ token: string }>(baseUrl, { login, password });

  return res.data;
};
