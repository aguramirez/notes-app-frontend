import axios from "axios"

const BASE_URL = 'https://notes-app-agustin-2f4e9c94d487.herokuapp.com';

export const findAll = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/dashboard`);
        return response;
    }catch(error){
        console.error(error)
    }
    return null;
}

export const findArchivedNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/notes/archived`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const findUnarchivedNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/notes/active`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const findNotesByTag = async (tagId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/notes/tag/${tagId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const save = async({title, content, archived, tag}) => {
    try {
        return await axios.post(`${BASE_URL}/api/notes`,{
            title,
            content,
            archived,
            tag
        })
    } catch (error) {
        console.error(error)
    }
    return undefined;
}

export const saveTag = async({name}) => {
    try {
        return await axios.post(`${BASE_URL}/api/tags`,{
            name
        })
    } catch (error) {
        console.error(error)
    }
    return undefined;
}

export const update = async({id, title, content, archived, tag}) => {
    try {
        return await axios.put(`${BASE_URL}/api/notes/${id}`,{
            title,
            content,
            archived,
            tag
        })
    } catch (error) {
        console.error(error)
    }
    return undefined;
}

export const updateTag = async({id, name}) => {
    try {
        return await axios.put(`${BASE_URL}/api/tags/${id}`,{
            name
        })
    } catch (error) {
        console.error(error)
    }
    return undefined;
}

export const remove = async(id) => {
    try {
        await axios.delete(`${BASE_URL}/api/notes/${id}`)
    } catch (error) {
        console.error(error)
    }
}

export const removeTag = async(id) => {
    try {
        await axios.delete(`${BASE_URL}/api/tags/${id}`)
    } catch (error) {
        console.error(error)
    }
}