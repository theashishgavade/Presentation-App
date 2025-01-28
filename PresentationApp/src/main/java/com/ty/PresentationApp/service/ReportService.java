package com.ty.PresentationApp.service;

import org.springframework.stereotype.Service;

import com.ty.PresentationApp.dto.CompletedPresentationResponseDto;
import com.ty.PresentationApp.entity.User;
import com.ty.PresentationApp.exception.UserNotFoundException;
import com.ty.PresentationApp.repository.UserRepository;
import com.ty.PresentationApp.util.PdfGenerator;

@Service
public class ReportService {

    private ratingService rService;
    private EmailService emailService;
    private PdfGenerator pdfGenerator;
    private UserRepository uRepo; // Inject the UserRepository

    public ReportService(ratingService rService, EmailService emailService, PdfGenerator pdfGenerator, UserRepository uRepo) {
        this.rService = rService;
        this.emailService = emailService;
        this.pdfGenerator = pdfGenerator;
        this.uRepo = uRepo; 
    }

    public void sendProgressReportByEmail(Integer userId) throws Exception {
        // Fetch the user details to get the email address
        User user = uRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        // Fetch completed presentations and user data
        CompletedPresentationResponseDto data = rService.getCompletedPresentationsWithRatings(userId);

        if (data.getCompletedPresentationCount() == 0) {
            throw new UserNotFoundException("No completed presentations found for user with ID: " + userId);
        }

        // Generate PDF
        byte[] pdfData = pdfGenerator.generatePdf(data);
        String fileName = "ProgressReport.pdf";

        // Send email
        String emailBody = "Dear " + data.getUserName() + ",\n\n"
                + "Please find attached the progress report PDF for all completed presentations. The report includes a detailed overview of all the presentations with all the detailed ratings.\n\n"
                + "Should you have any questions or need further clarification, feel free to reach out.\n\n"
                + "Best regards,\n"
                + "ADMIN of Presentation App";

        emailService.sendEmailWithPdf(user.getEmail(), "Your Progress Report", emailBody, pdfData, fileName);
    }
}
