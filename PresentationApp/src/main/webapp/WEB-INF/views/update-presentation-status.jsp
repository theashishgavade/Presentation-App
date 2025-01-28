<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <h1>Update Presentation Status</h1>
    <form action="/presentation/{presentationId}/status" method="POST">
        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
        </select>
        <button type="submit">Update Status</button>
    </form>
</body>
</html>