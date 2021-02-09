package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dao.MessageDao;
import com.example.demo.entities.Message;

/**
 * User Service
 * @author patrice
 *
 */
@Component
public class MessageService {

	@Autowired
	MessageDao messageDao;

	/**
	 * Create a message
	 * @return true if message created, false if message already exist or error
	 * @throws Exception
	 */
	public boolean createMessage(Message message) throws Exception {
	    return messageDao.createMessage(message);
	}
	
	/**
	 * get all messages
	 * @return message List
	 * @throws Exception
	 */
	public List<Message> getMessages() throws Exception {
		return messageDao.getMessages();
	}
	
	
}
	
