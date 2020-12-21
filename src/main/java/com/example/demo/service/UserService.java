package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dao.UserDao;
import com.example.demo.entities.User;

/**
 * User Service
 * @author patrice
 *
 */
@Component
public class UserService {
	
	@Autowired
	UserDao userDao;

	/**
	 * Create a user
	 * @return true if user created, false if user already exist or error
	 * @throws Exception
	 */
	public boolean createUser(User user) throws Exception {
	    return userDao.createUser(user);
	}
	
	/**
	 * get a user thanks to firstname and lastname
	 * @param user
	 * @return the user found or null if not found
	 */
	public User getUser(User user) throws Exception {
    	return userDao.getUser(user);
	}
	
	/**
	 * get all users
	 * @return user List
	 * @throws Exception
	 */
	public List<User> getUsers() throws Exception {
		return userDao.getUsers();
	}
	
	/**
	 * find users with the beginning of criteria
	 * @param user
	 * @return
	 * @throws Exception
	 */
	public List<User> findUser(User user) throws Exception {
		return userDao.findUser(user);
	}
}
	
