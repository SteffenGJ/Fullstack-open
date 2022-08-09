import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get("http://localhost:3001/persons");
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const replace = (id, newObject) => {
    window.confirm("You are about to replace a number! Continue?")
    console.log(id, newObject);
    return axios.put(`${baseUrl}/${id[0].id}`, newObject);
}

const deletePerson = (id, name) => {
    window.confirm(`Delete ${name} from phonebook?`)
    return axios.delete(`${baseUrl}/${id}`)
}

export default {create, deletePerson, getAll, replace};