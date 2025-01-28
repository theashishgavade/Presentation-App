<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Register page</title>
</head>
<body>
    <h1>Register</h1>
    <form action="/user/register" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label for="phone">Phone:</label>
        <input type="text" id="phone" name="phone" required />

        <label for="password">Password:</label>
        <input type="password" id="password" name="pass" required />

        <label for="role">Role:</label>
        <select id="role" name="role" required>
            <option value="STUDENT">Student</option>
            <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Register</button>
    </form>
</body>

</html>