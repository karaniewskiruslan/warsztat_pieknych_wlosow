import axios from "axios";
import { Services } from "../@types/services.type";

const baseUrl = import.meta.env.VITE_API_URL + "api/services";

type ServiceAPI = Omit<Services, "id" | "image"> & { image: File | null };

export const getServices = async () => {
  const res = await axios.get<Services[]>(baseUrl);

  return res.data;
};

export const postService = async (newService: ServiceAPI) => {
  console.log(newService);

  const res = await axios.post<Services>(baseUrl, newService);

  return res.data;
};

export const updateService = async (id: number, newService: ServiceAPI) => {
  const res = await axios.put<Services>(baseUrl + `/${id}`, newService);

  return res.data;
};

export const deleteService = async (id: number) => {
  const res = await axios.delete<Services[]>(baseUrl + `/${id}`, {
    method: "DELETE",
  });

  return res.data;
};
