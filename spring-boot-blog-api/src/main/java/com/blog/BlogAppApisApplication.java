package com.blog;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.blog.config.AppConstants;
import com.blog.entities.Role;
import com.blog.repositories.RoleRepo;

@SpringBootApplication
public class BlogAppApisApplication implements CommandLineRunner{
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private RoleRepo roleRepo;

	public static void main(String[] args) {
		SpringApplication.run(BlogAppApisApplication.class, args);
	}
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println(this.passwordEncoder.encode("testing123"));
		try {
			Role role1 = new Role();
			role1.setRoleId(AppConstants.ADMIN_USER);
			role1.setRole("ROLE_ADMIN");
			
			Role role2 = new Role();
			role2.setRoleId(AppConstants.DEFAULT_USER);
			role2.setRole("ROLE_DEFAULT");
			
			List<Role> roles = List.of(role1, role2);
			this.roleRepo.saveAll(roles);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
