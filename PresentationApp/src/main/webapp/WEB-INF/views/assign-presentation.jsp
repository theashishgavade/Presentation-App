<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Presentation assign page</title>
</head>
<body>
    <h1>Assign Presentation</h1>
    <form action="/presentation/assign" method="POST">
        <label for="studentId">Student ID:</label>
        <input type="number" id="studentId" name="userId" required />

        <label for="course">Course Name:</label>
        <input type="text" id="course" name="course" required />

        <button type="submit">Assign Presentation</button>
    </form>
</body>

</html>