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

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxiosObj.post(`/image/upload/${postId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }}).then(response => response.data);
}

export const getPostsByCategory = (categoryId) => {
  return axiosObj.get(`/category/${categoryId}/posts`).then(response => response.data);
}

export const getPostsByUser = (userId) => {
  return axiosObj.get(`/user/${userId}/posts`).then(response => response.data);
}

export const deletePostById = (postId) => {
  return privateAxiosObj.delete(`/posts/${postId}`).then(response => response.data);
}

export const updatePost = (post) => {
  return privateAxiosObj.put(`/posts/${post.postId}`, post).then(response => response.data);
}