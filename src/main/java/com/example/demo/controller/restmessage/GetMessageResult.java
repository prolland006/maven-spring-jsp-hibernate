package com.example.demo.controller.restmessage;

import java.util.List;

import com.example.demo.entities.Message;

public class GetMessageResult extends ErrorResult {
	public static final int MESSAGE_GET_SUCCESSFULLY = 1;
	public static final int MESSAGE_NOT_FOUND= 2;
	
	private List<Message> messages = null;

	public GetMessageResult() {
		super();
	}
	
	public GetMessageResult(int id, String message) {
		super(id, message);
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}
}