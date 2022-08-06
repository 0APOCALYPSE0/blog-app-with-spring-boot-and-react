package com.blog.exceptions;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvalidCredentialsException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	private String message;

	public InvalidCredentialsException(String message) {
		super();
		this.message = message;
	}
	
}
