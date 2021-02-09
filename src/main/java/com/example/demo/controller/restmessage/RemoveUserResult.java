package com.example.demo.controller.restmessage;

public class RemoveUserResult extends ErrorResult {
	public static final int USER_ALREADY_EXIST = 0;
	public static final int USER_REMOVED_SUCCESSFULLY = 1;
	public RemoveUserResult() {
		super();
	}
	
	public RemoveUserResult(int id, String message) {
		super(id, message);
	}
}