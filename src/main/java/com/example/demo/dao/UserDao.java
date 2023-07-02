package com.example.demo.dao;

import java.util.List;

import com.example.demo.entities.User;

public interface UserDao {

	/**
	 * Create a user
	 * @return true if user created, false if user already exist or error
	 * @throws Exception
	 */
	public boolean createUser(User user) throws Exception;

	/**
	 * Remove a user
	 * @return true if user removed, false if user doesn't exist
	 * @throws Exception
	 */
	public boolean removeUser(long id) throws Exception;

		
	/**
	 * get a user thanks to firstname and lastname
	 * @param user
	 * @return the user found or null if not found
	 */
	public User getUser(User user) throws Exception;
	
	
	/**
	 * get a user thanks to id
	 * @param user
	 * @return the user found or null if not found
	 */
	public User getUserId(long id) throws Exception;
		
	
	/**
	 * get all users
	 * @return user List
	 * @throws Exception
	 */
	public List<User> getUsers() throws Exception;
	
	/**
	 * find users with the beginning of criteria
	 * @param user
	 * @return
	 * @throws Exception
	 */
	public List<User> findUser(User user) throws Exception;

	/***
	 * updates an existing user using their id to identify them
	 * @param user
	 * @return true if the user has been successfully updated and false if the user does not exist or there is an error
	 * @throws Exception
	 */
	public Boolean updateUser(User user) throws Exception;
}
