package com.example.demo.controller;

import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.entities.User;
import com.example.demo.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@SpringBootApplication
public class HomeController {
	
	@Autowired
	UserService userService;
	
	private static final Logger logger = Logger.getLogger(HomeController.class);
	
	private class CreateUserResult extends ErrorResult {
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
	
	private class GetUserResult extends ErrorResult {
		public static final int USER_GET_SUCCESSFULLY = 1;
		public static final int USER_NOT_FOUND= 2;
		
		private List<User> users = null;

		public GetUserResult() {
			super();
		}
		
		public GetUserResult(int id, String message) {
			super(id, message);
		}

		public List<User> getUsers() {
			return users;
		}

		public void setUsers(List<User> users) {
			this.users = users;
		}
	}

	private class ErrorResult {
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
    /**
     * Display the user page : user.jsp
     * @param model
     * @param user
     * @return
     */
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ModelAndView user(Model model, @ModelAttribute("user") User user) {

        model.addAttribute("user", user);
        return new ModelAndView("user", "command", user);
    }
    
    @GetMapping("users")
    public GetUserResult getUsers() {
    	logger.info("getUsers");
		GetUserResult result = new GetUserResult();
		
        try {
        	result.setId(GetUserResult.USER_GET_SUCCESSFULLY);
    		result.setMessage("Users have been found");
    		result.setUsers(this.userService.getUsers());
		} catch (Exception e) {
			e.printStackTrace();
        	result.setId(GetUserResult.ERROR);
    		result.setMessage(e.getMessage());
		}
        return result;
    }

    /**
     * Create a user if not exist or find a user. If the user exist send a flash attribute
     * @param action
     * @param firstname
     * @param lastname
     * @param age
     * @param address
     * @param pays
     * @param redirectAttributes
     * @return
     */
    @RequestMapping(value = "/postuser", method = RequestMethod.POST)
    public ModelAndView postUser(
    		@RequestParam String action, 
    		@RequestParam(value="firstname", required=true) String firstname,
    		@RequestParam(value="lastname", required=true) String lastname,
    		@RequestParam(value="age", required=true) int age,
    		@RequestParam(value="address", required=false, defaultValue = "") String address,
    		@RequestParam(value="pays", required=false, defaultValue = "france") String pays,
    		final RedirectAttributes redirectAttributes) {
    	
    	User user = new User();
    	user.setFirstname(firstname);
    	user.setLastname(lastname);
    	user.setAge(age);
    	user.setPays(pays);
    	user.setAddress(address);
    	
		logger.info("saveOrUpdateUser - " + user.toString());

		try {
			
			// create the user
    	    if (action.equals("create")) {
    	    	if (!userService.createUser(user)) {
    	    		redirectAttributes.addFlashAttribute("msg", "User already exist!");
    	    	} else {
    	    		redirectAttributes.addFlashAttribute("user", user);
                    redirectAttributes.addFlashAttribute("msg", "User created successfully !");
    	    	}
    	    	
    	    // find the user
    	    } else {
    	    	 
                User userFound = userService.getUser(user);
                 
                if (userFound!=null) {
                	redirectAttributes.addFlashAttribute("msg", "User found in database");
                    redirectAttributes.addFlashAttribute("user", userFound);
                } else {
                	redirectAttributes.addFlashAttribute("msg", "User not found !");
                }
    	    }
    	    
		} catch (ConstraintViolationException e) {
			
			// check for mandatory fields, if mandatory fields display messages on user page
			StringBuffer msg = new StringBuffer();
            for (ConstraintViolation<?> con : e.getConstraintViolations()) {
            	msg.append(con.getMessage());
            	msg.append(". ");
            }
			redirectAttributes.addFlashAttribute("msg", msg);
            redirectAttributes.addFlashAttribute("user", user);
            
    	} catch (Exception ex) {
    	    ex.printStackTrace();
    	}

        return new ModelAndView("redirect:/user/");

    }
    
    /**
	 * get a user thks to firstname & lastname   
	 * @param user
	 * @return
	 */
    @RequestMapping(value = "/getuser", method = RequestMethod.POST)
    public GetUserResult getUser(@RequestBody User user) {
    	
    	logger.info("getUser - " + user.toString());
		GetUserResult result = new GetUserResult();
		
		User userFound;
		try {
			userFound = userService.getUser(user);
	        if (userFound!=null) {
	        	ArrayList users = new ArrayList();
	        	users.add(userFound);
	            result.setId(GetUserResult.USER_GET_SUCCESSFULLY);
	    		result.setMessage("User has been found");
	    		result.setUsers(users);
	        } else {
	        	result.setId(GetUserResult.USER_NOT_FOUND);
	    		result.setMessage("User not found !");
	        }
		} catch (Exception e) {
			e.printStackTrace();
        	result.setId(GetUserResult.ERROR);
    		result.setMessage(e.getMessage());
		}
        
        return result;
    }
    
    /**
	 * get a user thks to firstname & lastname   
	 * @param user
	 * @return
	 */
    @RequestMapping(value = "/getuserId", method = RequestMethod.POST)
    public GetUserResult getUserId(@RequestBody User user) {
    	
    	logger.info("getUserId - " + user.toString());
		GetUserResult result = new GetUserResult();
		
		User userFound;
		try {
			userFound = userService.getUserId(user.getId());
	        if (userFound!=null) {
	        	ArrayList users = new ArrayList();
	        	users.add(userFound);
	            result.setId(GetUserResult.USER_GET_SUCCESSFULLY);
	    		result.setMessage("User has been found");
	    		result.setUsers(users);
	        } else {
	        	result.setId(GetUserResult.USER_NOT_FOUND);
	    		result.setMessage("User not found !");
	        }
		} catch (Exception e) {
			e.printStackTrace();
        	result.setId(GetUserResult.ERROR);
    		result.setMessage(e.getMessage());
		}
        
        return result;
    }
    
    @RequestMapping(value = "/findusers", method = RequestMethod.POST)
    public GetUserResult findUsers(@RequestBody User user) {
    	logger.info("findUsers - " + user.toString());
		GetUserResult result = new GetUserResult();
		
		List<User> users;
		try {
			users = userService.findUser(user);
	        if (users!=null) {
	            result.setId(GetUserResult.USER_GET_SUCCESSFULLY);
	    		result.setMessage("Users has been found");
	    		result.setUsers(users);
	        } else {
	        	result.setId(GetUserResult.USER_NOT_FOUND);
	    		result.setMessage("Users not found !");
	        }
		} catch (Exception e) {
			e.printStackTrace();
        	result.setId(GetUserResult.ERROR);
    		result.setMessage(e.getMessage());
		}
        
        return result;
    }
    
	/**
	 * create a user    
	 * @param user
	 * @return
	 */
    @RequestMapping(value = "/createuser", method = RequestMethod.POST)
    public CreateUserResult createUser(@RequestBody User user) {
    	
		logger.info("createUser - " + user.toString());
		CreateUserResult result = new CreateUserResult();

		try {
			
	    	if (!userService.createUser(user)) {
	    		result.setId(CreateUserResult.USER_ALREADY_EXIST);
	    		result.setMessage("User already exist");
	    	} else {
	    		result.setId(CreateUserResult.USER_CREATED_SUCCESSFULLY);
	    		result.setMessage("User created successfully");
	    	}
    	    	    	    
		} catch (ConstraintViolationException e) {
			
			// check for mandatory fields, if mandatory fields display messages on user page
			StringBuffer msg = new StringBuffer();
            for (ConstraintViolation<?> con : e.getConstraintViolations()) {
            	msg.append(con.getMessage());
            	msg.append(". ");
            }
			System.err.println(msg+" user: "+user);
			result.setId(CreateUserResult.CONSTRAINT_VIOLATION);
			result.setMessage(msg.toString());
            
    	} catch (Exception ex) {
    	    ex.printStackTrace();
    	    result.setId(CreateUserResult.ERROR);
    	    result.setMessage(ex.getMessage());
    	} 
        return result;
    }	
}