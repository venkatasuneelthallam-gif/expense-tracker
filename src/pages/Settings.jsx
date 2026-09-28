import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Settings() {
  const user =
    JSON.parse(
      localStorage.getItem(
        "expenseTrackerUser"
      )
    ) || {};

  const [name, setName] =
    useState(user.name || "");

  const [email, setEmail] =
    useState(user.email || "");

  const saveSettings = () => {
    const updatedUser = {
      ...user,
      name,
      email,
    };

    localStorage.setItem(
      "expenseTrackerUser",
      JSON.stringify(updatedUser)
    );

    alert(
      "Profile updated successfully."
    );
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-header">

          <div>
            <span className="dashboard-label">
              ACCOUNT
            </span>

            <h1>
              Settings
            </h1>

            <p>
              Manage your account
              preferences.
            </p>
          </div>

        </div>

        <div className="settings-card">

          <h2>
            Profile Information
          </h2>

          <div className="settings-form">

            <div className="form-group">
              <label>
                Full Name
              </label>

              <input
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
              />
            </div>

            <button
              className="auth-submit"
              onClick={saveSettings}
            >
              Save Changes
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;