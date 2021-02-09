package com.example.demo.controller.restmessage;

import java.util.List;

import com.example.demo.entities.User;

public class GetUserResult extends ErrorResult {
	public static final int USER_GET_SUCCESSFULLY = 1;
	public static final int USER_NOT_FOUND= 2;
	
	private List<User> users = null;

	public GetUserResult() {
		super();
	}
	
	public GetUserResult(int id, String message) {
		super(id, message);
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
}