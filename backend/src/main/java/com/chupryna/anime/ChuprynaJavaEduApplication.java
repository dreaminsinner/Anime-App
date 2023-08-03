package com.chupryna.anime;



import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication(scanBasePackages= "com.chupryna.anime")
@EnableMethodSecurity
public class ChuprynaJavaEduApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChuprynaJavaEduApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

}
