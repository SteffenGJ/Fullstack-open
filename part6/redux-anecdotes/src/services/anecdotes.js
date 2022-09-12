import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

export const createNew = async (content) => {
    const obj = {content, votes: 0};
    const response = await axios.post(baseUrl, obj);
    return response.data;
}

export const handleVote = async (dote) => {
    const newDote = {...dote, votes: dote.votes + 1};
    const response = await axios.put(`${baseUrl}/${newDote.id}`, newDote);
    return response.data;
}