package com.example.demo;

import java.net.URISyntaxException;

import javax.persistence.PersistenceContext;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.controller.HomeController;
import com.example.demo.service.UserService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.CoreMatchers.equalTo;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration
public class DemoApplicationTests {
	
	@Mock
	private UserService userService;
	
	@InjectMocks
    private HomeController homeController;
    
	private MockMvc mockMvc;
	
	 @Before
	    public  void before() {
		// Process mock annotations
	        MockitoAnnotations.initMocks(this);
	 
	        // Setup Spring test in standalone mode
	        this.mockMvc = MockMvcBuilders.standaloneSetup(homeController).build();
	    }

	 /**
	  * Just a small unit test that check the redirection
	  * @throws URISyntaxException
	  */
    @Test
    public void testPostUser() throws URISyntaxException
    {

        try {
			this.mockMvc.perform(post("/postuser")
			        .param("action", "display")
			        .param("firstname", "q")
			        .param("lastname", "q")
			        .param("age", "0")
			        .param("address", "")
			        .param("pays", "france")
			)
			.andExpect(redirectedUrl("/user/"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
         
    }

}
