import axios from "axios";

export const Client = axios.create({
  baseURL: "https://api-v2.hopcrm.com/api/mobile/",
});
