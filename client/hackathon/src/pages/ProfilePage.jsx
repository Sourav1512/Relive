import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="text-center mt-20">Please login to see your profile.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default ProfilePage;
