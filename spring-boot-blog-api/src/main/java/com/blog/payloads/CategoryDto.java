package com.blog.payloads;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class CategoryDto {

	private Integer categoryId;
	@NotEmpty
	@Size(min = 4, message = "Category title must contain atleast 4 characters.")
	private String categoryTitle;
	@NotEmpty
	private String categoryDescription;
}
