package com.example.demo.controller;

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
import org.springframework.web.bind.annotation.ModelAttribute;
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

@RestController
@SpringBootApplication
public class HomeController {
	
	@Autowired
	UserService userService;
	
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
}