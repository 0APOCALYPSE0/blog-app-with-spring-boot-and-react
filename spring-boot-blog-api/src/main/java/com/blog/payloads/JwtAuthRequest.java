package com.blog.payloads;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class JwtAuthRequest {

	@NotEmpty(message = "Email must not be empty.")
	@Email(message = "Email address is not valid.")
	private String username;
	@NotEmpty(message = "Password must not be empty.")
	@Size(min = 8, message = "Password must contain atleast 8 characters.")
	private String password;

}
