import { ServicesAPI } from "../types/services.type";

const baseUrl = import.meta.env.VITE_API_URL + "api/services";

export const getServices = async () => {
  const res = await fetch(baseUrl, {
    method: "GET",
  });

  const data = await res.json();

  return data;
};

export const postService = async (newService: ServicesAPI) => {
  const formData = new FormData();

  console.log(newService);

  formData.append("name", newService.name);
  formData.append("category", newService.category);
  formData.append("options", JSON.stringify(newService.options));
  formData.append("cost", JSON.stringify(newService.cost));
  formData.append("masters", JSON.stringify(newService.masters));
  formData.append("last", JSON.stringify(newService.last));
  formData.append("image", newService.image!);

  const res = await fetch(baseUrl, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return data;
};

export const updateService = async (id: number, newService: ServicesAPI) => {
  const formData = new FormData();

  formData.append("name", newService.name);
  formData.append("category", newService.category);
  formData.append("options", JSON.stringify(newService.options));
  formData.append("cost", JSON.stringify(newService.cost));
  formData.append("masters", JSON.stringify(newService.masters));
  formData.append("last", JSON.stringify(newService.last));
  formData.append("image", newService.image!);

  const res = await fetch(baseUrl + `/${id}`, {
    method: "PUT",
    body: formData,
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
