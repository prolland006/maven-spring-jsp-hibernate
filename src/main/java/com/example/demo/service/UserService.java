package com.example.demo.service;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Component;

import com.example.demo.entities.User;

@Component
public class UserService {

	/**
	 * 
	 * @return true if user created, false if user already exist or error
	 * @throws Exception
	 */
	public boolean createUser(User user) throws Exception {
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();

	    if (this.getUser(user) != null) {
	    	return false;
	    }
	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
	    Session session = sessionFactory.openSession();
	    session.beginTransaction();
	    session.save(user);
	    session.getTransaction().commit();
	    session.close();
	    return true;
	}
	
	/**
	 * getUser
	 * @param user
	 * @return the user found or null if not found
	 */
	public User getUser(User user) throws Exception {
		User userFound = null;
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();
    	try {
    	    
    	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
    	    Session session = sessionFactory.openSession();
    	    
	    	Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("firstname", user.getFirstname()));
            criteria.add(Restrictions.eq("lastname", user.getLastname()));
             
            userFound = (User) criteria.uniqueResult();
                 
    	    session.close();
    	} catch (Exception ex) {
    	    StandardServiceRegistryBuilder.destroy(registry);
    	    ex.printStackTrace();
    	}
    	return userFound;
	}
	
}
