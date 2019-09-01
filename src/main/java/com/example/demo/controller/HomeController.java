package com.example.demo.controller;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
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

	@RequestMapping(value = "/", method = RequestMethod.GET )
	public ModelAndView hello(Model model){
		model.addAttribute("title", "Spring Boot - Hello World Example Jsp");
		return new ModelAndView("index");
	}
	
	@RequestMapping(value="/sayHello", method = RequestMethod.GET)
    public String sayHello() {
    	final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
    	        .configure() // configures settings from hibernate.cfg.xml
    	        .build();
    	try {
    		User user = new User();
    	    user.setFirstname("firstname");
    	    user.setLastname("lastname");
    	    
    	    SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
    	    Session session = sessionFactory.openSession();
    	    session.beginTransaction();
    	 
    	    session.save(user);
    	 
    	    session.getTransaction().commit();
    	    session.close();
    	} catch (Exception ex) {
    	    StandardServiceRegistryBuilder.destroy(registry);
    	    ex.printStackTrace();
    	}
        return "hello world";
    }

    @RequestMapping("/ajax")
    public ModelAndView helloAjaxTest() {
        return new ModelAndView("ajax", "message", "Crunchify Spring MVC with Ajax and JQuery Demo..");
    }

    @RequestMapping(value = "/ajaxquery", method = RequestMethod.GET)
    public @ResponseBody String getGreeting(@RequestParam String firstname,@RequestParam String lastname) {
    	User user = new User();
	    user.setFirstname(firstname);
	    user.setLastname(lastname);

        ObjectMapper mapper =new ObjectMapper();
        String jsonInString = null;
        try {
            jsonInString = mapper.writeValueAsString(user);
        } catch (JsonProcessingException exc) {
            exc.printStackTrace();
        }

        return jsonInString;
    }

    // user page
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ModelAndView user(Model model, @ModelAttribute("user") User userAttribute) {

		User user = new User();
    	if (userAttribute != null) {
    		user.setFirstname(userAttribute.getFirstname());;
    		user.setLastname(userAttribute.getLastname());;
    	}
        model.addAttribute("user", new User());
        return new ModelAndView("user", "command", user);
    }

    @RequestMapping(value = "/postuser", method = RequestMethod.POST)
    public ModelAndView saveOrUpdateUser(@RequestParam String action, @ModelAttribute("userForm") @Validated User user,
                                   BindingResult result, Model model, final RedirectAttributes redirectAttributes) {
    	

		try {
    	    if (action.equals("create")) {
    	    	userService.createUser(user);
    	    } else {
    	    	 
                User userFound = userService.getUser(user);
                 
                if (userFound!=null) {
                    System.out.println("User found !");
                    redirectAttributes.addFlashAttribute("user", user);
                }
    	    }
    	 
    	} catch (Exception ex) {
    	    ex.printStackTrace();
    	}

        if (result.hasErrors()) {
            return new ModelAndView("redirect:/user/");
        } else {
            return new ModelAndView("redirect:/user/");
        }

    }	
}