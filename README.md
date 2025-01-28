
# 📊 **Presentation App**  

Welcome to the **Presentation App**, a comprehensive solution designed to manage **users**, **presentations**, and **ratings** seamlessly. Whether you're an **admin** managing presentations or a **student** tracking your progress, this app provides a user-friendly interface combined with robust backend support. 🎉  

---

## 🏆 **Core Features**  

### 👤 **User Management**
- **🔐 Register & Login**: Users can securely register and log in to access the app. Duplicate email validation ensures data integrity.  
- **📂 View Details**: Users can fetch their personal information (restricted to active users).  

### 🛠️ **Admin Functionality**
Admins hold the key to efficiently managing the system:
- **👥 User Management**:
  - View all registered users, excluding admin accounts.
  - Toggle user status between active and inactive.  
- **📊 Presentation Management**:
  - Assign presentations to students.
  - Retrieve presentations by their unique ID.
  - Update and save total presentation scores.  
- **🌟 Rating Management**:
  - Assign ratings to students based on presentations.
  - Fetch ratings for a particular presentation or a student's overall performance.  

### 📝 **Presentation Workflow**
- **👨‍🎓 For Students**:
  - View all assigned presentations.
  - Update the status of their presentation (e.g., "In Progress" ➡️ "Completed").  
- **📊 For Admins**:
  - Assign and track presentations for individual students.

### 🌟 **Comprehensive Rating System**
Admins can evaluate presentations based on six critical performance metrics:
1. **Communication** 🗣️  
2. **Confidence** 💪  
3. **Content Quality** 📚  
4. **Interaction Skills** 🤝  
5. **Liveliness** 🎭  
6. **Usage of Props** 🎨  

---

## 🖥️ **Technology Stack**

This project leverages modern technologies for a robust and scalable architecture:  

| **Frontend**             | **Backend**             | **Database** | **APIs**      |  
|---------------------------|-------------------------|--------------|---------------|  
| ⚛️ React JS              | 🖥️ Spring Boot         | 💾 MySQL    | 🔗 REST APIs  |  

---

## 🌟 **Live Demo**
🚀 **Coming Soon!**

---

## 📸 **Screenshots**

### 🎯 Admin Dashboard  
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard)  

### 🌟 Assign Presentations  
![Assign Presentations](https://via.placeholder.com/800x400?text=Assign+Presentations)  

### ⭐ Rate Presentations  
![Rate Presentations](https://via.placeholder.com/800x400?text=Rate+Presentations)  

---

## 📂 **Folder Structure**

```plaintext
📂 presentation-app  
├── 📁 backend  
│   ├── 📂 src  
│   └── 📄 application.properties  
├── 📁 frontend  
│   ├── 📂 public  
│   ├── 📂 src  
│   └── 📄 package.json  
```



## 🛠️ **Setup Instructions**  

### ✅ Prerequisites  
Ensure the following tools are installed on your system:  
- **Node.js** (>= 14.x)  
- **Java** (>= 17.x)  
- **MySQL**  
- **Maven**  

---

### 🏗️ **Backend Setup**  
1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/presentation-app.git
   cd presentation-app/backend
   ```  
2. Configure the database in `application.properties`:  
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/presentation_db
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   ```  
3. Build and run the Spring Boot application:  
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```  
4. The backend server will run on `http://localhost:8080`.

---

### 🌐 **Frontend Setup**  
1. Navigate to the frontend directory:  
   ```bash
   cd ../frontend
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start the development server:  
   ```bash
   npm start
   ```  
4. The frontend application will run on `http://localhost:3000`.

---

## 📚 **API Endpoints**

### **User Endpoints**
- **POST** `/api/users/register`: Register a new user.  
- **POST** `/api/users/login`: Log in to the application.  
- **GET** `/api/users/{id}`: Fetch details of a specific user.  

### **Admin Endpoints**
- **GET** `/api/admin/users`: View all users (excluding admins).  
- **PUT** `/api/admin/users/{id}/status`: Update a user's status.  

### **Presentation Endpoints**
- **POST** `/api/presentations/assign`: Assign a presentation to a student.  
- **GET** `/api/presentations/{id}`: Retrieve a presentation by ID.  
- **GET** `/api/presentations/student/{id}`: Fetch all presentations for a student.  
- **PUT** `/api/presentations/{id}/status`: Update a presentation's status.  
- **PUT** `/api/presentations/{id}/score`: Save the total score for a presentation.  

### **Rating Endpoints**
- **POST** `/api/ratings`: Add ratings for a presentation.  
- **GET** `/api/ratings/presentation/{id}`: Get ratings for a specific presentation.  
- **GET** `/api/ratings/student/{id}`: Fetch overall ratings for a student.  

---

## 💡 **How It Works**  

### 📝 Registration & Login
1. Users register with their email and password.  
2. Admins can activate or deactivate users.  

### 🛠️ Managing Presentations
1. Admins assign presentations to students by their ID.  
2. Students view and update their presentation status.  

### 🌟 Rating System
1. Admins rate presentations on key performance metrics.  
2. Students can view their overall presentation performance.  

---

## 🤝 **Contributing**  

Want to contribute? Great! 🎉  
- Fork the repository.  
- Create a feature branch (`git checkout -b feature-name`).  
- Commit your changes (`git commit -m "Add new feature"`).  
- Push to the branch (`git push origin feature-name`).  
- Open a pull request.  

---

## 📜 **License**  

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.  

---

## 📧 **Contact**  

Feel free to reach out for any queries or suggestions:  
📧 **theashishgavade@example.com**  

---

Enjoy managing presentations and ratings effortlessly! 💼✨
```
