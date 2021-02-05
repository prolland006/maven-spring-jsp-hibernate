package com.example.demo.dao;

import java.util.List;

import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public class UserDaoImpl implements UserDao  {

	/**
	 * Create a user
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
	 * Remove a user
	 * @return true if user removed, false if user does not exist
	 * @throws Exception
	 */
	public boolean removeUser(long id) throws Exception {
		User userFound = null;
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();

	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
	    Session session = sessionFactory.openSession();
	    
    	Criteria criteria = session.createCriteria(User.class);
        criteria.add(Restrictions.eq("id", id));
         
        userFound = (User) criteria.uniqueResult();
	    session.beginTransaction();
	    session.remove(userFound);
	    session.getTransaction().commit();
	    session.close();
	    return true;
	}	
	
	public List<User> getUsers() throws Exception {
		List<User> users = null;
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();
    	try {
    	    
    	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
    	    Session session = sessionFactory.openSession();
    	    
    	    CriteriaBuilder cb = session.getCriteriaBuilder();
    	    CriteriaQuery<User> cq = cb.createQuery(User.class);
    	    Root<User> rootEntry = cq.from(User.class);
    	    CriteriaQuery<User> all = cq.select(rootEntry);
    	 
    	    TypedQuery<User> allQuery = session.createQuery(all);
    	    users = allQuery.getResultList();
    	    
    	    session.close();
    	} catch (Exception ex) {
    	    StandardServiceRegistryBuilder.destroy(registry);
    	    ex.printStackTrace();
    	    throw ex;
    	}
    	return users;		
	}
	
	/**
	 * get a user thanks to firstname and lastname
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
    	    throw ex;
    	}
    	return userFound;
	}
	
	/**
	 * get a user thanks to id
	 * @param user
	 * @return the user found or null if not found
	 */
	public User getUserId(long id) throws Exception {
		User userFound = null;
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();
    	try {
    	    
    	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
    	    Session session = sessionFactory.openSession();
    	    
	    	Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("id", id));
             
            userFound = (User) criteria.uniqueResult();
                 
    	    session.close();
    	} catch (Exception ex) {
    	    StandardServiceRegistryBuilder.destroy(registry);
    	    ex.printStackTrace();
    	    throw ex;
    	}
    	return userFound;
	}
	
	/**
	 * find users with the beginning of criteria
	 * @param user
	 * @return
	 * @throws Exception
	 */
	public List<User> findUser(User user) throws Exception {
		List users = null;
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();
    	try {
    	    
    	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
    	    Session session = sessionFactory.openSession();
    	    StringBuffer sb = new StringBuffer("SELECT u FROM User u WHERE ");
    	    String []param = new String[3];
    	    int paramNb = 1;
    	    if (user.getFirstname()!=null && user.getFirstname().trim().compareTo("") != 0) {
                sb.append("UPPER(u.firstname) LIKE CONCAT('%',?");
                sb.append(Integer.toString(paramNb));
                sb.append(",'%')");
                param[paramNb-1] = user.getFirstname().toUpperCase();
                paramNb++;
    	    }
    	    
    	    if (user.getLastname()!=null && user.getLastname().trim().compareTo("") != 0) {
    	    	if (paramNb != 1) {
    	    		sb.append(" AND ");
    	    	}
                sb.append("UPPER(u.lastname) LIKE CONCAT('%',?");
                sb.append(Integer.toString(paramNb));
                sb.append(",'%')");
                param[paramNb-1] = user.getLastname().toUpperCase();
                paramNb++;
    	    }

    	    if (user.getAddress()!=null && user.getAddress().trim().compareTo("") != 0) {
    	    	if (paramNb != 1) {
    	    		sb.append(" AND ");
    	    	}
                sb.append("UPPER(u.address) LIKE CONCAT('%',?");
                sb.append(Integer.toString(paramNb));
                sb.append(",'%')");
                param[paramNb-1] = user.getAddress().toUpperCase();
                paramNb++;
    	    }
    	    
    	    if (paramNb == 1) {
    	    	sb.append("1=1");
    	    }
    	    
            Query query = session.createQuery(sb.toString());
            for (int i=0; i<paramNb-1; i++) {
                query.setParameter(i+1, param[i]);
            }
	        users = query.getResultList();
        
		    session.close();
		} catch (Exception ex) {
		    StandardServiceRegistryBuilder.destroy(registry);
		    ex.printStackTrace();
		    throw ex;
		}
    	return users;
	}
}
