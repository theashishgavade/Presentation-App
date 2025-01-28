package com.ty.PresentationApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendEmail(String to, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		message.setFrom("theashishgavade@gmail.com");
		mailSender.send(message);
	}

	public void sendEmailWithPdf(String toEmail, String subject, String body, byte[] pdfData, String fileName)
			throws Exception {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		helper.setFrom("theashishgavade@gmail.com");
		helper.setTo(toEmail);
		helper.setSubject(subject);
		helper.setText(body);

		// Attach PDF
		helper.addAttachment(fileName, new ByteArrayResource(pdfData));

		mailSender.send(message);
	}

}
