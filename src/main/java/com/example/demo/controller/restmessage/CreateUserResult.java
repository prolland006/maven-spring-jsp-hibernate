package com.example.demo.controller.restmessage;

public class CreateUserResult extends ErrorResult {
	public static final int USER_ALREADY_EXIST = 0;
	public static final int USER_CREATED_SUCCESSFULLY = 1;
	public static final int CONSTRAINT_VIOLATION = 2;
	public CreateUserResult() {
		super();
	}
	
	public CreateUserResult(int id, String message) {
		super(id, message);
	}
}