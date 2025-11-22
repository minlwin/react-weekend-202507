package com.jdc.weekend.rest.api;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("member")
public class MemberApi {

	@GetMapping
	List<String> index() {
		return List.of("This is message from Member API");
	}

}
