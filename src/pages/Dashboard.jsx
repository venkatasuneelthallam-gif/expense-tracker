import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {
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

  const totalExpenses =
    expenses.reduce(
      (total, expense) =>
        total +
        Number(expense.amount),
      0
    );

  const user =
    JSON.parse(
      localStorage.getItem(
        "expenseTrackerUser"
      )
    ) || {};

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
            ExpenseFlow
          </strong>

        </div>

        <section className="dashboard-top">

          <div>
            <span className="dashboard-label">
              OVERVIEW
            </span>

            <h1>
              Good morning,{" "}
              {user.name || "User"} 👋
            </h1>

            <p>
              Here's your financial
              overview for today.
            </p>
          </div>

          <div className="date-display">
            📅{" "}
            {new Date().toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </div>

        </section>

        <SummaryCards
          totalExpenses={
            totalExpenses
          }
          expenses={expenses}
        />

        <ExpenseChart
          expenses={expenses}
        />

      </main>

    </div>
  );
}

export default Dashboard;