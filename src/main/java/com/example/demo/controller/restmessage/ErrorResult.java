package com.example.demo.controller.restmessage;

public class ErrorResult {
	public static final int UNDEFINED = -1;
	public static final int ERROR = 3;

	int id;
	String message;
	
	public ErrorResult() {
		this.id = UNDEFINED;
		this.message = "undefined";
	}
	public ErrorResult(int id, String message) {
		this.id = id;
		this.message = message;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "ErrorResult [id=" + id + ", message=" + message + "]";
	}	
	
}