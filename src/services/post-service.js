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

//add picture

export const uploadPostImage = async (image, postId) => {
    let formData = new FormData()
    formData.append("image", image)
    return await privateAxios.post(`/api/post/image/upload/${postId}`, formData)
        .then((res) => res.data)
}

//loadSingleUserPost

export const loadPostUserWise = async (userId) => {
    return await privateAxios.get(`/api/user/${userId}/posts`, userId).then((res) => res.data)
}


//delete post

export const deletePostById = async (postId) => {
    return await privateAxios.delete(`/api/posts/${postId}`, postId).then((res) => res.data);
}