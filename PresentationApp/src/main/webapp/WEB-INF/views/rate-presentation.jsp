<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Rating page</title>
</head>
<body>
    <h1>Rate Presentation</h1>
    <form action="/rating/rate" method="POST">
        <label for="studentId">Student ID:</label>
        <input type="number" id="studentId" name="userId" required />

        <label for="presentationId">Presentation ID:</label>
        <input type="number" id="presentationId" name="presentationId" required />

        <label for="communication">Communication:</label>
        <select id="communication" name="communication" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label for="confidence">Confidence:</label>
        <select id="confidence" name="confidence" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label for="content">Content:</label>
        <select id="content" name="content" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label for="interaction">Interaction:</label>
        <select id="interaction" name="interaction" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label for="liveliness">Liveliness:</label>
        <select id="liveliness" name="liveliness" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <label for="usageProps">Usage of Props:</label>
        <select id="usageProps" name="usageProps" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <button type="submit">Submit Rating</button>
    </form>
</body>
</html>