import { axiosObj, privateAxiosObj } from "./Helper"

export const createPost = (post) => {
  return privateAxiosObj.post(`/user/${post.userId}/category/${post.categoryId}/posts`, post).then(response => response.data);
}

export const getPosts = (page=0, size=5, sortBy='postId', order='asc') => {
  return axiosObj.get(`posts?page=${page}&size=${size}&sortBy=${sortBy}&order=${order}`).then(response => response.data);
}

export const getPost = (postId) => {
  return axiosObj.get(`posts/${postId}`).then(response => response.data);
}

export const createComment = (comment, postId, userId) => {
  return privateAxiosObj.post(`/post/${postId}/user/${userId}/comments`, { content: comment}).then(response => response.data);
}