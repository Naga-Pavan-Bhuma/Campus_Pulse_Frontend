# Campus_Pulse_Frontend
Campus Pulse – A Unified Campus Management System
🔷 Project Overview

Campus Pulse is a full-stack web application built using the MERN stack designed to digitalize and streamline campus management for students, faculty, and administrators. The platform brings together academic activities, event updates, food menus, and faculty-student interactions into one unified ecosystem.

The system provides role-based dashboards — Admin, Faculty, and Student — each offering tailored tools and functionalities to manage their respective responsibilities effectively.

💡 Objective

The main goal of Campus Pulse is to simplify and automate day-to-day campus operations by:

Providing a centralized system for communication and updates.

Enabling faculty to manage academic activities like timetables, announcements, and event schedules.

Allowing administrators to maintain academic calendars, monitor user registrations, and manage campus data efficiently.

Enhancing the student experience by giving easy access to relevant academic and campus information.

⚙️ Technology Stack
Layer	Technology Used	Description
Frontend	React.js + Tailwind CSS	For building responsive and modern UI with reusable components.
Backend	Node.js + Express.js	RESTful APIs and server-side logic handling authentication, CRUD, and business rules.
Database	MongoDB (Atlas or Local)	Stores user profiles, announcements, timetables, event schedules, and other campus data.
Authentication	JSON Web Token (JWT) / bcrypt	Secure role-based login for Admin, Faculty, and Students.
State Management	React Context / Redux (if used)	To manage authentication state and global data.
Styling	Tailwind CSS / Custom UI Design	For neat, modern, and color-coded dashboards.
🧩 System Architecture

Campus Pulse follows a 3-tier architecture:

Frontend (React) – Displays dynamic dashboards and interfaces for each role.

Backend (Node + Express) – Acts as a middleware that processes user requests and serves data.

Database (MongoDB) – Maintains persistent data including users, faculty info, event schedules, and academic content.

👥 User Roles and Functionalities
🧑‍💼 1. Admin Panel (Campus Pulse Admin)

URL Example: localhost:3000/admin

Key Features:

User Management:
View and manage total users, faculty members, and registered faculty statistics.

Faculty Directory:
Display list of all faculty members with registration status.

Update Academic Calendar:
Admins can add or modify institutional academic events and holidays.

Menu Management:
Manage and update the weekly food menu for campus dining.

Update Events:
Create, edit, or delete upcoming campus events.

Edit Exam Schedule:
Set and modify examination timetables.

Logout and Notifications:
Secure logout system with notification badges for updates.

Visual Theme:
Dark sidebar with white content area, intuitive icons, and modern card-based statistics.

👩‍🏫 2. Faculty Dashboard (CampusSphere)

URL Example: localhost:3000/faculty

Key Features:

Post Announcement:
Faculty can publish notices or announcements visible to students.

Edit Timetable:
Manage class and lab schedules for specific departments.

View Food Menu:
Quickly check daily or weekly food menus.

View Academic Calendar:
Access all institutional holidays, exam dates, and major events.

Scan Student & Get Details:
A unique feature allowing faculty to scan (possibly via QR/Face recognition) student details.

Notifications and Profile Management:
Faculty can receive notifications and view personalized dashboards.

Visual Theme:
Vibrant color-coded cards (orange, purple, green, blue, red) for different modules; clean white sidebar for navigation.

🧑‍🎓 3. Student Dashboard (Campus Pulse Student Portal)

URL Example: localhost:3000/student

Key Features:

Clubs:
Explore and join various campus clubs and student communities.

Academic Calendar:
View all academic deadlines, events, and holidays.

Exam Schedule:
Access upcoming exams, assessment dates, and schedules.

Food Menu:
Daily and weekly meal plan display.

Timetable:
Department-wise class and lab schedules.

User Profile & Notifications:
Personalized dashboard greeting with notification center.

Visual Theme:
Clean, bright, and minimalistic with soft shadows, rounded cards, and pastel color accents.

🧠 Core Functional Modules
Module	Description
Authentication System	Role-based login with JWT for Admin, Faculty, and Students.
User Management	CRUD operations for users and faculty data.
Event Management	Admin and faculty can create, edit, or remove events.
Academic Calendar Management	Displays institution-level academic events and schedules.
Food Menu Management	Weekly menu management by Admin, accessible to all users.
Exam Schedule Management	Faculty and Admin can create/update; Students can view.
Announcement System	Faculty can post important updates; Students receive them in their dashboards.
QR/Face Scan Integration	Allows quick student verification (optional).
🔐 Security Features

Role-based access control (RBAC)

Password hashing with bcrypt

Token-based authentication using JWT

Data validation using Mongoose schema

Secure logout and session handling

🧾 Database Design (Example Collections)
users {
  _id, name, email, password, role (admin/faculty/student), department, profilePic
}

faculty {
  _id, facultyId, name, designation, department, registeredStatus
}

events {
  _id, title, description, date, createdBy
}

academic_calendar {
  _id, eventName, startDate, endDate, category
}

menu {
  _id, day, breakfast, lunch, dinner
}

exam_schedule {
  _id, subject, date, time, department, semester
}

🖥️ User Interface Design

Clean, modern UI built with React and Tailwind.

Consistent color theme across all dashboards.

Sidebar navigation with intuitive icons and hover effects.

Dashboard cards with shadow effects and clear role-based grouping.

Responsive design compatible with mobile, tablet, and desktop.

🚀 Future Enhancements

Integration of AI-based attendance tracking using face recognition.

Push notifications for announcements and exam updates.

Chat system for faculty-student communication.

Mobile app version using React Native.

Integration with Google Calendar for academic sync.

🧩 Conclusion

Campus Pulse revolutionizes campus management by providing a centralized, efficient, and user-friendly solution that connects administrators, faculty, and students. Built using the modern MERN stack, it ensures a seamless user experience, scalability, and flexibility for future growth and feature expansion.
