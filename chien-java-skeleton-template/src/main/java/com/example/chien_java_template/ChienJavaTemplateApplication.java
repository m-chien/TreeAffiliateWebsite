package com.example.chien_java_template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ChienJavaTemplateApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChienJavaTemplateApplication.class, args);
	}

}
