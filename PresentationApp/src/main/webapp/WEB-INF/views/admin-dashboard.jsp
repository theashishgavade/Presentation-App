<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Admin page</title>
</head>
<body>
    <h1>Admin Dashboard</h1>
    <ul>
        <li><a href="/user/all">View All Users</a></li>
        <li>
            <form action="/user/{userId}/status" method="POST">
                <label for="status">Change User Status:</label>
                <select id="status" name="status">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
                <button type="submit">Update Status</button>
            </form>
        </li>
        <li><a href="/presentation/assign">Assign Presentation</a></li>
        <li><a href="/presentation/student/{userId}">View Presentations by Student</a></li>
        <li><a href="/presentation/all">View All Presentations</a></li>
        <li><a href="/presentation/{presentationId}/score">Save Presentation Score</a></li>
    </ul>
</body>
</html>