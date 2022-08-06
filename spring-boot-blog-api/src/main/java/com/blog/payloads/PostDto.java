package com.blog.payloads;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class PostDto {
	
	private Integer postId;
	@NotEmpty
	@Size(min = 4, message = "Post title must contain atleast 4 characters.")
	private String title;
	@NotEmpty
	private String content;
	private String imageName;
	private Date addDate;
	private CategoryDto category;
	private UserDto user;
	private Set<CommentDto> comments = new HashSet<>();
}
