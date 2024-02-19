import { privateAxios } from "./constants";

export const createPost = (postData) => {
    return privateAxios.post(`/api/user/${postData.userId}/category/${postData.category}/posts`, postData)
        .then((res) => res.data)
}