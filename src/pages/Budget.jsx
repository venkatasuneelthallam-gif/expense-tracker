import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Budget() {
  const [budget, setBudget] =
    useState(
      Number(
        localStorage.getItem(
          "expenseTrackerBudget"
        )
      ) || 50000
    );

  const saveBudget = () => {
    localStorage.setItem(
      "expenseTrackerBudget",
      budget
    );

    alert("Budget updated successfully.");
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <div className="page-header">

          <div>
            <span className="dashboard-label">
              FINANCIAL PLAN
            </span>

            <h1>
              Budget Management
            </h1>

            <p>
              Set and manage your monthly
              spending limit.
            </p>
          </div>

        </div>

        <div className="budget-card">

          <div className="budget-icon">
            🎯
          </div>

          <h2>
            Monthly Budget
          </h2>

          <p>
            Set the maximum amount you
            want to spend each month.
          </p>

          <div className="budget-input">

            <span>₹</span>

            <input
              type="number"
              value={budget}
              onChange={(event) =>
                setBudget(
                  event.target.value
                )
              }
            />

          </div>

          <button
            className="auth-submit"
            onClick={saveBudget}
          >
            Save Budget
          </button>

        </div>

      </main>

    </div>
  );
}

export default Budget;