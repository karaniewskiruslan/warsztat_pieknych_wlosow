import { ServicesAPI } from "../types/services";

const baseUrl = "http://localhost:5000/api/services";

export const getServices = async () => {
  const res = await fetch(baseUrl, {
    method: "GET",
  });

  const data = await res.json();

  return data;
};

export const getService = async (id: number) => {
  const res = await fetch(baseUrl + `/${id}`, {
    method: "GET",
  });

  const data = await res.json();

  return data;
};

export const postService = async (newService: ServicesAPI) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newService),
  });

  const data = await res.json();

  return data;
};

export const updateService = async (id: number, newService: ServicesAPI) => {
  const res = await fetch(baseUrl + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newService),
  });

  const data = await res.json();

  return data;
};

export const deleteService = async (id: number) => {
  const res = await fetch(baseUrl + `/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
};
