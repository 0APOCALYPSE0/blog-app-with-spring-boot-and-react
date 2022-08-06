package com.blog.services;
import java.util.List;
import com.blog.payloads.PostDto;
import com.blog.payloads.PostResponse;

public interface PostService {
	public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId);
	public PostDto updatePost(PostDto postDto, Integer postId);
	public void deletePost(Integer postId);
	public PostDto getPost(Integer postId);
	public PostResponse getPosts(Integer page, Integer size, String sortBy, String order);
	public List<PostDto> getPostsByCategory(Integer categoryId);
	public List<PostDto> getPostsByUser(Integer userId);
	public List<PostDto> searchPosts(String keyword);
}
