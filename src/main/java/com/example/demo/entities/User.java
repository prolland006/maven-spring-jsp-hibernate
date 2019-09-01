package com.example.demo.entities;


import javax.persistence.*;
 
/**
 * This class maps to a table in database.
 * @author www.codejava.net
 *
 */
 
@Entity
@Table(name = "user")
public class User {
    private long id;
    private String firstname;
    private String lastname;
    private String address;
 
    public User() {
    }
 
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }
 
    public void setId(long id) {
        this.id = id;
    }

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
 
 
}
