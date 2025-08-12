import axios from "axios";

export const jikan = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  timeout: 15000,
});

export default jikan;