import axios from "axios";

export const getByFullName = async name => {
    
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    return response.data;
}