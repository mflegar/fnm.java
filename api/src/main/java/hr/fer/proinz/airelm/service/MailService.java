package hr.fer.proinz.airelm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private final Environment env;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    public MailService(Environment env) {
        this.env = env;
    }

    public void sendMail(String mailAddress, String title, String mailMessage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(env.getProperty("spring.mail.username"));
        message.setTo(mailAddress);
        message.setSubject(title);
        message.setText(mailMessage);
        javaMailSender.send(message);
    }
}
