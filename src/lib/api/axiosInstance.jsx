import axios from "axios";
import { server_url } from "../data";

export const axiosInstance = axios.create({
  baseURL: server_url,
});
