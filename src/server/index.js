import axios from "axios";

const request = axios.create({
  baseURL: "https://650ac486dfd73d1fab08da9d.mockapi.io/",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export default request