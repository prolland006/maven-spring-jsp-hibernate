package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dao.MessageDao;
import com.example.demo.dao.UserDao;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;

/**
 * Message Service
 * @author patrice
 *
 */
@Component
public class UserService {
	
	@Autowired
	UserDao userDao;

	/**
	 * Remove a user
	 * @return true if user removed, false if user does not exist
	 * @throws Exception
	 */
	public boolean removeUser(long id) throws Exception {
	    return userDao.removeUser(id);
	}
	
	/**
	 * Create a user
	 * @return true if user created, false if user already exist or error
	 * @throws Exception
	 */
	public boolean createUser(User user) throws Exception {
	    return userDao.createUser(user);
	}

	/***
	 * updates an existing user using their id to identify them
	 * @param user
	 * @return true if the user has been successfully updated and false if the user does not exist or there is an error
	 * @throws Exception
	 */
	public Boolean updateUser(User user) throws Exception{
		return userDao.updateUser(user);
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
	 * get a user thanks to id
	 * @param user
	 * @return the user found or null if not found
	 */
	public User getUserId(long id) throws Exception {
    	return userDao.getUserId(id);
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
	
