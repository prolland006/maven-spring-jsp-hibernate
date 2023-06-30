package com.example.demo.controller.restmessage;

public class UpdateUserResult extends  ErrorResult{
    public static final int ID_NOT_FOUND = 0;
	public static final int USER_UPDATED_SUCCESSFULLY = 1;
	public static final int CONSTRAINT_VIOLATION = 2;
    public UpdateUserResult() {
		super();
	}
	

    public UpdateUserResult(int id, String message) {
		super(id, message);
	}
}
