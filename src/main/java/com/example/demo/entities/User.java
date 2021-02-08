package com.example.demo.entities;


import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Range;

 
/**
 * This class maps to a table in database.
 * @author www.codejava.net
 *
 */
 
@Entity
@Table(name = "user")
public class User {
	@Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @NotEmpty(message = "Firstname is mandatory")
    private String firstname;
    @NotEmpty(message = "Lastname is mandatory")
    private String lastname;
    private String address;
    @Range(min = 18, max = 180, message = "Age min 18 years old")
    private int age;
    @Pattern(regexp="france", message="France is mandatory") 
    private String pays;
    @NotEmpty(message = "Company is mandatory")
    private String company;
    
	@OneToMany(targetEntity=Message.class, mappedBy="user", fetch=FetchType.EAGER)
    private List<Message> messages;
 
    public User() {
    }
 
    public List<Message> getMessage() {
		return messages;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public void setMessage(List<Message> messages) {
		this.messages = messages;
	}

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

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getPays() {
		return pays;
	}

	public void setPays(String pays) {
		this.pays = pays;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + ", address=" + address
				+ ", age=" + age + ", pays=" + pays + "]";
	}


 
}
