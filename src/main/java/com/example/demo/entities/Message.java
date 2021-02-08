package com.example.demo.entities;


import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

 
/**
 * This class maps to a table in database.
 * @author www.codejava.net
 *
 */
 
@Entity
@Table(name = "message")
public class Message {
	@Id
    @Column(name = "message_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @NotEmpty(message = "Description is mandatory")
    private String description;
    @NotEmpty(message = "Time is mandatory")
    private Date time;
    
    @ManyToOne
    @JoinColumn(name="id", nullable=false)
    private User user;
 
    public Message() {
    }
 
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

    public long getId() {
        return id;
    }
 
    public void setId(long id) {
        this.id = id;
    }

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.toString();
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}
}
