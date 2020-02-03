import axios from 'axios';

export async function getEmployeeList(data) {
  return axios
    .get('http://localhost:3001/employees')
    .then(response => response)
    .catch(err => checkResponse(err));
}

export async function createEmployee(data) {
  return axios
    .post('http://localhost:3001/employees', data)
    .then(response => response)
    .catch(err => checkResponse(err));
}

export async function updateEmployee(id, data) {
  return axios
    .put(`http://localhost:3001/employees/${id}`, data)
    .then(response => response)
    .catch(err => checkResponse(err));
}

export async function deleteEmployee(id) {
  return axios
    .delete(`http://localhost:3001/employees/${id}`)
    .then(response => response)
    .catch(err => checkResponse(err));
}
