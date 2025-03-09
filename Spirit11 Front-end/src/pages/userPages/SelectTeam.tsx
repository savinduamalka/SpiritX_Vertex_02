import React from 'react';
import UserSidebar from "../../components/userComponents/SideBar";
import natureImage from "../../assets/images/new.jpg";

export default function SelectTeam() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <UserSidebar />
      <div className="flex-1 p-4">
        {/* Your page content goes here */}
      </div>
    </div>
  );
}
