package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.controller.restmessage.CreateUserResult;
import com.example.demo.controller.restmessage.GetMessageResult;
import com.example.demo.controller.restmessage.GetUserResult;
import com.example.demo.controller.restmessage.RemoveUserResult;
import com.example.demo.entities.User;
import com.example.demo.service.MessageService;
import com.example.demo.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HomeController {
	
	@Autowired
	UserService userService;

	@Autowired
	MessageService messageService;
	
	@Value("${spring.application.name}")
	private String serviceName;
	
	private static final Logger logger = Logger.getLogger(HomeController.class);
	
	
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
    	System.out.println("ServiceName:"+this.serviceName);
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
    
    @GetMapping("messages")
    public GetMessageResult getMessages() {
    	logger.info("getMessages");
		GetMessageResult result = new GetMessageResult();
		
        try {
        	result.setId(GetMessageResult.MESSAGE_GET_SUCCESSFULLY);
    		result.setMessage("Messages have been found");
    		result.setMessages(this.messageService.getMessages());
		} catch (Exception e) {
			e.printStackTrace();
        	result.setId(GetMessageResult.ERROR);
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
    		@RequestParam(value="company", required=false) String company,
    		final RedirectAttributes redirectAttributes) {
    	
    	User user = new User();
    	user.setFirstname(firstname);
    	user.setLastname(lastname);
    	user.setAge(age);
    	user.setPays(pays);
    	user.setAddress(address);
    	user.setCompany(company);
    	
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
	        if (users!=null || users.size()==0) {
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
    
    
    /**
	 * remove a user    
	 * @param user
	 * @return
	 */
    @RequestMapping(value = "/removeuser", method = RequestMethod.POST)
    public RemoveUserResult removeUser(@RequestBody User user) {
    	
		logger.info("removeUser - " + user.toString());
		RemoveUserResult result = new RemoveUserResult();

		try {
			
	    	if (!userService.removeUser(user.getId())) {
	    		result.setId(RemoveUserResult.USER_ALREADY_EXIST);
	    		result.setMessage("User does not exist");
	    	} else {
	    		result.setId(RemoveUserResult.USER_REMOVED_SUCCESSFULLY);
	    		result.setMessage("User removed successfully");
	    	}
    	    	    	    
    	} catch (Exception ex) {
    	    ex.printStackTrace();
    	    result.setId(RemoveUserResult.ERROR);
    	    result.setMessage(ex.getMessage());
    	} 
        return result;
    }	    
    
}