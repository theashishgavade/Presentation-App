package com.ty.PresentationApp.util;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.stereotype.Component;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.ty.PresentationApp.dto.CompletedPresentationResponseDto;
import com.ty.PresentationApp.dto.CompletedPresentationResponseDto.PresentationDetails;

@Component
public class PdfGenerator {

    public byte[] generatePdf(CompletedPresentationResponseDto data) throws Exception {
        Document document = new Document();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, byteArrayOutputStream);

        document.open();

        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
        Font headerFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
        Font normalFont = new Font(Font.FontFamily.HELVETICA, 12);

        // Title
        Paragraph title = new Paragraph("Progress Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        // Add user name and presentation count
        document.add(new Paragraph("User: " + data.getUserName(), headerFont));
        document.add(new Paragraph("Total Completed Presentations: " + data.getCompletedPresentationCount(), normalFont));
        document.add(Paragraph.getInstance("\n"));

        // Add details of each completed presentation
        List<PresentationDetails> presentations = data.getPresentations();
        for (PresentationDetails presentation : presentations) {
            document.add(new Paragraph("Presentation on: " + presentation.getCourse(), headerFont));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);

            addTableRow(table, "Communication", String.valueOf(presentation.getCommunication()), normalFont);
            addTableRow(table, "Confidence", String.valueOf(presentation.getConfidence()), normalFont);
            addTableRow(table, "Content", String.valueOf(presentation.getContent()), normalFont);
            addTableRow(table, "Interaction", String.valueOf(presentation.getInteraction()), normalFont);
            addTableRow(table, "Liveliness", String.valueOf(presentation.getLiveliness()), normalFont);
            addTableRow(table, "Usage Props", String.valueOf(presentation.getUsageProps()), normalFont);
            addTableRow(table, "Total Score", String.valueOf(presentation.getTotalScore()), normalFont);

            document.add(table);
            document.add(Paragraph.getInstance("\n"));
        }

        // Add average score
        document.add(new Paragraph("Average Score: " + data.getAverageScore(), headerFont));

        document.close();

        return byteArrayOutputStream.toByteArray();
    }

    private void addTableRow(PdfPTable table, String key, String value, Font font) {
        PdfPCell keyCell = new PdfPCell(new Phrase(key, font));
        PdfPCell valueCell = new PdfPCell(new Phrase(value, font));
        table.addCell(keyCell);
        table.addCell(valueCell);
    }
}
