package com.brunduartt.stockcontrolapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
public class StockControlApiApplication {
	private static final Logger log = LoggerFactory.getLogger(StockControlApiApplication.class);

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(StockControlApiApplication.class);
		Environment env = app.run(args).getEnvironment();
		String hostAddress = "localhost";
		try {
			hostAddress = InetAddress.getLocalHost().getHostAddress();
		} catch(UnknownHostException exception) {
			log.warn("Using localhost as default.");
		}
		log.info("---------------------------\n" +
				"Profiles:\t{}\n" +
				"Address:\t{}\n" +
				"---------------------------\n",
				env.getActiveProfiles(),
				hostAddress

		);
	}

}
