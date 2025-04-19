import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import StatsCards from "./StatsCards";
import UserManagement from "./FacultyManagement";
import AddUserForm from "./AddFacultyForm";
import MessMenuManager from "./MessMenuManager";

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState("User Management");

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar setSelectedSection={setSelectedSection} />
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">{selectedSection}</h2>

        <StatsCards />

        {selectedSection === "User Management" && (
          <>
            <UserManagement />
            <AddUserForm />
          </>
        )}

        {selectedSection === "Mess Menu" && <MessMenuManager />}
      </div>
    </div>
  );
};

export default Admin;
