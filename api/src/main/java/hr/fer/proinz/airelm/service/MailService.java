package hr.fer.proinz.airelm.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

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

    public void sendHTMLMail(String mailAddress, String title, String mailMessage) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();

            message.setSubject(title);
            MimeMessageHelper helper;
            helper = new MimeMessageHelper(message, true);
            helper.setFrom(env.getProperty("spring.mail.username"));
            helper.setTo(mailAddress);
            helper.setText(mailMessage, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            Logger.getLogger(MailService.class.getName()).log(Level.SEVERE, null, e);
        }
    }

}
