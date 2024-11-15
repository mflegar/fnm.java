package hr.fer.proinz.airelm;

import hr.fer.proinz.airelm.user.Actor;
import hr.fer.proinz.airelm.user.ActorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AirelmApplication {

    private static final Logger log = LoggerFactory.getLogger(AirelmApplication.class);
    public static void main(String[] args) {
        SpringApplication.run(AirelmApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(ActorRepository repository) {
        return (args) -> {
            // save a few customers
            repository.save(new Actor(1, "jedan", "lel", "lel", "lel"));
            repository.save(new Actor(1, "dvokjoa", "lel", "lel", "lel"));

            // fetch all customers
            log.info("Customers found with findAll():");
            log.info("-------------------------------");

            // fetch an individual customer by ID
            Actor customer = repository.findByActorID(1);
            log.info("Customer found with findById(1L):");
            log.info("--------------------------------");
            log.info(customer.toString());
            log.info("");

            // fetch customers by last name
            log.info("Customer found with findByLastName('Bauer'):");
            log.info("--------------------------------------------");
            repository.findByActorSurname("lel").forEach(bauer -> {
                log.info(bauer.toString());
            });
            log.info("");
        };
    }

}
