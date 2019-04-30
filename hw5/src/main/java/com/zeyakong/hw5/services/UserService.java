package com.zeyakong.hw5.services;

import java.util.Arrays;
import java.util.Collection;

import com.zeyakong.hw5.models.User;
import com.zeyakong.hw5.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;
	
	public User findById(String uid  ) {
		return userRepository.findById( uid ).orElse(null);
	}
	
	public User save( User user ) {
		return this.userRepository.save( user );
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.userRepository.findByUsername(username);
		
		if( user == null ) {
			throw new UsernameNotFoundException("No such username");
		}
		
		@SuppressWarnings("serial")
		UserDetails ud = new UserDetails() {
			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				return Arrays.asList(
						new SimpleGrantedAuthority("USER")
				);
			}

			@Override
			public String getPassword() {
				return user.getPassword();
			}

			@Override
			public String getUsername() {
				return user.getUsername();
			}

			@Override
			public boolean isAccountNonExpired() {
				return true;
			}

			@Override
			public boolean isAccountNonLocked() {
				return true;
			}

			@Override
			public boolean isCredentialsNonExpired() {
				return true;
			}

			@Override
			public boolean isEnabled() {
				return true;
			}			
		};
		
		return ud;
	}

	public void deleteAll() {
		this.userRepository.deleteAll();
	}

	public User findByUsername(String username) {
		return this.userRepository.findByUsername(username);
	}
	
}
