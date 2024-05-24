package com.springstudy.bbs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BoardController {
	
	@RequestMapping("/calendar")
	public String calendar() {
		return "calendar";
	}
}
