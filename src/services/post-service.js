import { privateAxios } from "./constants";
import { myAxios } from "./constants";

export const createPost = (postData) => {
    return privateAxios.post(`/api/user/${postData.userId}/category/${postData.category}/posts`, postData)
        .then((res) => res.data)
}

//get all posts

export const loadAllPosts = () => {
    return myAxios.get(`/api/posts`).then((res) => res.data)
}