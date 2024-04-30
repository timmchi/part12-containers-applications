// import axios from "axios";
// // const baseUrl = 'http://localhost:3001/api/persons';
// const baseUrl = import.meta.env.VITE_BACKEND_URL;
import axios from "../utils/apiClient";

const getAll = () => {
  const request = axios.get("/persons");
  return request.then((response) => response.data);
};

const create = (personObject) => {
  const request = axios.post("/persons", personObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`/persons/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteObj = (id) => {
  const request = axios.delete(`/persons/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deleteObj,
};
