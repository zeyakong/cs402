package com.zeyakong.hw5.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.zeyakong.hw5.models.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class ImageService {
	public static final String IMAGE_DIRECTORY = "/tmp/avatars/";
	public static final String missing = "missing.png";
	
	private Path getPath( String uid ) {
		return Paths.get( IMAGE_DIRECTORY +  uid );
	}
	
	private Path getDefault( ) {
		return Paths.get( IMAGE_DIRECTORY + missing );
	}
	
	public void save(MultipartFile file, String uid) throws IllegalStateException, IOException {
		if (file != null ) {
			if (!file.getOriginalFilename().equals("")) {
				file.transferTo(getPath(uid));
			}
		}  else {
			throw new IllegalStateException("No data given:" + file);
		}
	}
	
	public byte[] defaultImage( ) throws IOException {
		return Files.readAllBytes( getDefault() );		
	}
	
	
	public byte[] load( String uid ) {
		Path path = getPath( uid );
		try { 
			return Files.readAllBytes( path );
		} catch(Exception e) {
			return null;
		}
	}

	public String getAvatarUrl(User user) {
		Path path = getPath( user.getId() );
		if( Files.exists( path ) ) {
			return "/avatars/" + user.getId();
		} else {
			return "/assets/missing.png";
		}

	}
	
}
