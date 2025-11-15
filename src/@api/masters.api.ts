import axios from "axios";
import { MasterType } from "../@types/masterType.type";

const baseUrl = import.meta.env.VITE_API_URL + "api/masters";

export const getMasters = async () => {
  const res = await axios.get<MasterType[]>(baseUrl);

  return res.data;
};
