<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Student oage</title>
</head>
<body>
    <h1>Student Dashboard</h1>
    <ul>
        <li><a href="/user/{userId}">View Your Details</a></li>
        <li><a href="/presentation/user/{userId}">View Assigned Presentations</a></li>
        <li><a href="/presentation/{presentationId}">View Specific Presentation</a></li>
        <li>
            <form action="/presentation/{presentationId}/status" method="POST">
                <label for="status">Change Presentation Status:</label>
                <select id="status" name="status">
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                </select>
                <button type="submit">Update Status</button>
            </form>
        </li>
    </ul>
</body>
</html>