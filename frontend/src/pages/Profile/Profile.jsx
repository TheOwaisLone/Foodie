import React from "react";

const Profile = () => {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Profile</h1>
        <p>Manage your account details and settings.</p>
      </header>

      <section className="profile-card">
        <div className="profile-info">
          <h2>John Doe</h2>
          <p>Email: john.doe@example.com</p>
          <p>Member since: January 2024</p>
        </div>

        <div className="profile-actions">
          <button type="button">Edit Profile</button>
          <button type="button">Log Out</button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
