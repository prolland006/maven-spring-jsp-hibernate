package com.example.demo.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

import com.example.demo.entities.Message;
import com.example.demo.entities.User;

public interface MessageDao {

	/**
	 * Create a message
	 * @return true if message created, false error
	 * @throws Exception
	 */
	public boolean createMessage(Message message) throws Exception;
	
	/**
	 * get all messages
	 * @return message List
	 * @throws Exception
	 */
	public List<Message> getMessages() throws Exception;	
}
