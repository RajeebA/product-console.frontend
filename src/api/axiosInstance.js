import axios from "axios";
const packageJson = require("../../package.json");

const API_URL = process?.env?.REACT_APP_API_URL ?? "http://localhost:3000";

console.log(API_URL, `v${packageJson?.version}`);

export default axios.create({
  baseURL: API_URL,
  timeout: 30000
});
