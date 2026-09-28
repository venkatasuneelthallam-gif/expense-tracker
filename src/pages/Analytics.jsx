import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import ExpenseChart from "../components/ExpenseChart";

function Analytics() {
  const [expenses, setExpenses] =
    useState([]);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "expenseTrackerExpenses"
      );

    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="app-layout">

      <Sidebar
        mobileOpen={mobileOpen}
        closeSidebar={() =>
          setMobileOpen(false)
        }
      />

      <main className="main-content">

        <div className="mobile-header">

          <button
            className="menu-button"
            onClick={() =>
              setMobileOpen(true)
            }
          >
            ☰
          </button>

          <strong>
            Analytics
          </strong>

        </div>

        <div className="page-header">

          <div>
            <span className="dashboard-label">
              INSIGHTS
            </span>

            <h1>
              Financial Analytics
            </h1>

            <p>
              Understand your spending
              patterns.
            </p>
          </div>

        </div>

        <ExpenseChart
          expenses={expenses}
        />

      </main>

    </div>
  );
}

export default Analytics;