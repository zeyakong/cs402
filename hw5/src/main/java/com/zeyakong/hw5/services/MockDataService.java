package com.zeyakong.hw5.services;

import javax.annotation.PostConstruct;

import com.zeyakong.hw5.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MockDataService {
	@Autowired
	UserService userService;
	
	@Autowired
	PasswordEncoder encoder;

	@PostConstruct
	public void users() {
		userService.deleteAll();
		
		User user = new User();
		user.setEmail("jim@ebox.edu");
		user.setUsername("jim");
		user.setPassword( encoder.encode("123") );
		userService.save( user );
		
		user = new User();
		user.setEmail("jill@ebox.edu");
		user.setUsername("jill");
		user.setPassword( encoder.encode("123") );		
		userService.save( user );
	}
}

