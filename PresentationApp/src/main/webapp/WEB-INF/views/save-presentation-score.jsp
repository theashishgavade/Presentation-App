<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <h1>Save Presentation Score</h1>
    <form action="/presentation/{presentationId}/score" method="POST">
        <label for="score">Score:</label>
        <input type="number" id="score" name="score" step="0.01" required />

        <button type="submit">Save Score</button>
    </form>
</body>
</html>