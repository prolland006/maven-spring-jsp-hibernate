package com.example.demo.dao;

import java.util.List;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Message;

@Repository
public class MessageDaoImpl implements MessageDao  {

	/**
	 * Create a message
	 * @return true if message created, false error
	 * @throws Exception
	 */
	public boolean createMessage(Message message) throws Exception {
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();

	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
	    Session session = sessionFactory.openSession();
	    session.beginTransaction();
	    session.save(message);
	    session.getTransaction().commit();
	    session.close();
	    return true;
	}
	
	/**
	 * get all messages
	 * @return message List
	 * @throws Exception
	 */	
	public List<Message> getMessages() throws Exception {
		List<Message> messages = null;
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();
    	try {
    	    
    	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
    	    Session session = sessionFactory.openSession();
    	    
    	    CriteriaBuilder cb = session.getCriteriaBuilder();
    	    CriteriaQuery<Message> cq = cb.createQuery(Message.class);
    	    Root<Message> rootEntry = cq.from(Message.class);
    	    CriteriaQuery<Message> all = cq.select(rootEntry);
    	 
    	    TypedQuery<Message> allQuery = session.createQuery(all);
    	    messages = allQuery.getResultList();
    	    
    	    session.close();
    	} catch (Exception ex) {
    	    StandardServiceRegistryBuilder.destroy(registry);
    	    ex.printStackTrace();
    	    throw ex;
    	}
    	return messages;		
	}	
	
	
}
