import { privateAxios } from "./constants";
import { myAxios } from "./constants";

export const createPost = (postData) => {
    return privateAxios.post(`/api/user/${postData.userId}/category/${postData.category}/posts`, postData)
        .then((res) => res.data)
}

//get all posts

export const loadAllPosts = async (pageNumber, pageSize) => {
    return await myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((res) => res.data)
}

//get single post from id

export const loadPost = async (postid) => {
    return await privateAxios.get(`/api/posts/${postid}`).then((res) => res.data)
}


//add comment

export const createComment = async (comment, postId) => {
    return await privateAxios.post(`/api/post/${postId}/comments`, comment)
}