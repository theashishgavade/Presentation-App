<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <h1>View Presentation Ratings</h1>
    <form action="/rating/presentation/{presentationId}" method="GET">
        <label for="presentationId">Presentation ID:</label>
        <input type="number" id="presentationId" name="presentationId" required />
        <button type="submit">View Ratings</button>
    </form>
    <form action="/rating/student/{userId}" method="GET">
        <label for="studentId">Student ID:</label>
        <input type="number" id="studentId" name="userId" required />
        <button type="submit">View All Ratings for Student</button>
    </form>
</body>

</html>