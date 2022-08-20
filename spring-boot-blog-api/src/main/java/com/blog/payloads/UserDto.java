package com.blog.payloads;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class UserDto {

	private Integer id;
	@NotEmpty
	@Size(min = 4, message = "User name must contain atleast 4 characters.")
	private String name;
	@NotEmpty(message = "Email must not be empty.")
	@Email(message = "Email address is not valid.")
	private String email;
	@NotEmpty
	@Size(min = 8, message = "Password must contain atleast 8 characters.")
	private String password;
	@NotEmpty(message = "About must not be empty.")
	private String about;
	private Set<RoleDto> roles = new HashSet<RoleDto>();
	private Set<CommentDto> comments = new HashSet<>();

	@JsonIgnore
	public String getPassword() {
		return this.password;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

}
