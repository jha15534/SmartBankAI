import axios from "axios";

const API = axios.create({
    baseURL: "https://smartbankai-production.up.railway.app",
});

export default API;