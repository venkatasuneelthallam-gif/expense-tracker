import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Education",
  "Health",
  "Entertainment",
  "Other",
];

const paymentMethods = [
  "Cash",
  "UPI",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
];

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [periodFilter, setPeriodFilter] =
    useState("All");

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "UPI",
    notes: "",
  });

  const [error, setError] = useState("");

  // --------------------------------------------------
  // LOAD EXPENSES
  // --------------------------------------------------

  useEffect(() => {
    const saved = localStorage.getItem(
      "expenseTrackerExpenses"
    );

    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch {
        setExpenses([]);
      }
    }
  }, []);

  // --------------------------------------------------
  // SAVE EXPENSES
  // --------------------------------------------------

  useEffect(() => {
    localStorage.setItem(
      "expenseTrackerExpenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  // --------------------------------------------------
  // FORM INPUT
  // --------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // --------------------------------------------------
  // OPEN ADD FORM
  // --------------------------------------------------

  const openAddForm = () => {
    setEditingId(null);

    setForm({
      title: "",
      amount: "",
      category: "Food",
      date: new Date()
        .toISOString()
        .split("T")[0],
      paymentMethod: "UPI",
      notes: "",
    });

    setError("");
    setShowForm(true);
  };

  // --------------------------------------------------
  // OPEN EDIT FORM
  // --------------------------------------------------

  const openEditForm = (expense) => {
    setEditingId(expense.id);

    setForm({
      title: expense.title || "",
      amount: expense.amount || "",
      category: expense.category || "Food",
      date:
        expense.date ||
        new Date()
          .toISOString()
          .split("T")[0],
      paymentMethod:
        expense.paymentMethod || "UPI",
      notes: expense.notes || "",
    });

    setError("");
    setShowForm(true);
  };

  // --------------------------------------------------
  // CLOSE FORM
  // --------------------------------------------------

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setError("");
  };

  // --------------------------------------------------
  // ADD / UPDATE EXPENSE
  // --------------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter an expense name.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!form.date) {
      setError("Please select a date.");
      return;
    }

    if (editingId) {
      setExpenses((previous) =>
        previous.map((expense) =>
          expense.id === editingId
            ? {
                ...expense,
                title: form.title.trim(),
                amount: Number(form.amount),
                category: form.category,
                date: form.date,
                paymentMethod:
                  form.paymentMethod,
                notes: form.notes.trim(),
              }
            : expense
        )
      );
    } else {
      const newExpense = {
        id: Date.now(),
        title: form.title.trim(),
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        paymentMethod: form.paymentMethod,
        notes: form.notes.trim(),
      };

      setExpenses((previous) => [
        newExpense,
        ...previous,
      ]);
    }

    closeForm();
  };

  // --------------------------------------------------
  // DELETE EXPENSE
  // --------------------------------------------------

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    setExpenses((previous) =>
      previous.filter(
        (expense) => expense.id !== id
      )
    );
  };

  // --------------------------------------------------
  // CLEAR ALL
  // --------------------------------------------------

  const handleClearAll = () => {
    if (expenses.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete ALL expenses?"
    );

    if (!confirmed) return;

    setExpenses([]);
  };

  // --------------------------------------------------
  // FILTER BY PERIOD
  // --------------------------------------------------

  const isInPeriod = (expense) => {
    if (periodFilter === "All") {
      return true;
    }

    const expenseDate = new Date(
      expense.date + "T00:00:00"
    );

    const today = new Date();

    if (periodFilter === "Month") {
      return (
        expenseDate.getMonth() ===
          today.getMonth() &&
        expenseDate.getFullYear() ===
          today.getFullYear()
      );
    }

    if (periodFilter === "Year") {
      return (
        expenseDate.getFullYear() ===
        today.getFullYear()
      );
    }

    if (periodFilter === "Week") {
      const current = new Date(today);

      const day = current.getDay();

      const difference =
        day === 0 ? 6 : day - 1;

      const monday = new Date(current);

      monday.setDate(
        current.getDate() - difference
      );

      monday.setHours(0, 0, 0, 0);

      const sunday = new Date(monday);

      sunday.setDate(
        monday.getDate() + 6
      );

      sunday.setHours(23, 59, 59, 999);

      return (
        expenseDate >= monday &&
        expenseDate <= sunday
      );
    }

    return true;
  };

  // --------------------------------------------------
  // FILTERED EXPENSES
  // --------------------------------------------------

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        expense.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        expense.category ===
          categoryFilter;

      const matchesPeriod =
        isInPeriod(expense);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPeriod
      );
    });
  }, [
    expenses,
    search,
    categoryFilter,
    periodFilter,
  ]);

  // --------------------------------------------------
  // TOTAL
  // --------------------------------------------------

  const filteredTotal = filteredExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  // --------------------------------------------------
  // CLEAR FILTERS
  // --------------------------------------------------

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setPeriodFilter("All");
  };

  // --------------------------------------------------
  // EXPORT CSV
  // --------------------------------------------------

  const exportCSV = () => {
    if (filteredExpenses.length === 0) {
      alert("There are no expenses to export.");
      return;
    }

    const headers = [
      "Title",
      "Amount",
      "Category",
      "Date",
      "Payment Method",
      "Notes",
    ];

    const rows = filteredExpenses.map(
      (expense) => [
        expense.title,
        expense.amount,
        expense.category,
        expense.date,
        expense.paymentMethod,
        expense.notes || "",
      ]
    );

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll(
              '"',
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "expense-report.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(
      date + "T00:00:00"
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="app-layout">
      <Sidebar
        mobileOpen={mobileOpen}
        closeSidebar={() =>
          setMobileOpen(false)
        }
      />

      <main className="main-content">
        {/* MOBILE HEADER */}
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
            Expenses
          </strong>
        </div>

        {/* PAGE HEADER */}
        <div className="page-header">
          <div>
            <span className="dashboard-label">
              TRANSACTIONS
            </span>

            <h1>
              Expense Management
            </h1>

            <p>
              Add, edit and manage your
              expenses.
            </p>
          </div>

          <button
            className="add-expense-btn"
            onClick={openAddForm}
          >
            + Add Expense
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="expense-toolbar">
          <div className="expense-toolbar-info">
            <strong>
              {filteredExpenses.length}{" "}
              Expenses
            </strong>

            <span>
              Total: ₹
              {filteredTotal.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          <div className="toolbar-actions">
            <button
              className="export-btn"
              onClick={exportCSV}
            >
              ↓ Export CSV
            </button>

            <button
              className="clear-all-btn"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filter-bar">
          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >
            <option value="All">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>

          <select
            value={periodFilter}
            onChange={(event) =>
              setPeriodFilter(
                event.target.value
              )
            }
          >
            <option value="All">
              All Time
            </option>

            <option value="Week">
              This Week
            </option>

            <option value="Month">
              This Month
            </option>

            <option value="Year">
              This Year
            </option>
          </select>

          <button
            className="clear-filter-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* EXPENSE TABLE */}
        <div className="expense-table-card">
          {filteredExpenses.length === 0 ? (
            <div className="empty-expenses">
              <div className="empty-icon">
                ₹
              </div>

              <h2>
                No expenses found
              </h2>

              <p>
                Start tracking your
                spending by adding your
                first expense.
              </p>

              <button
                className="add-expense-btn"
                onClick={openAddForm}
              >
                + Add First Expense
              </button>
            </div>
          ) : (
            <div className="expense-table-wrapper">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>EXPENSE</th>
                    <th>CATEGORY</th>
                    <th>DATE</th>
                    <th>PAYMENT</th>
                    <th>AMOUNT</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredExpenses.map(
                    (expense) => (
                      <tr
                        key={expense.id}
                      >
                        <td>
                          <div className="expense-title-cell">
                            <div className="expense-category-icon">
                              ₹
                            </div>

                            <div>
                              <strong>
                                {
                                  expense.title
                                }
                              </strong>

                              {expense.notes && (
                                <small>
                                  {
                                    expense.notes
                                  }
                                </small>
                              )}
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="category-badge">
                            {
                              expense.category
                            }
                          </span>
                        </td>

                        <td>
                          {formatDate(
                            expense.date
                          )}
                        </td>

                        <td>
                          {
                            expense.paymentMethod
                          }
                        </td>

                        <td>
                          <strong className="expense-amount">
                            ₹
                            {Number(
                              expense.amount
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>
                        </td>

                        <td>
                          <div className="expense-actions">
                            <button
                              className="edit-btn"
                              onClick={() =>
                                openEditForm(
                                  expense
                                )
                              }
                              title="Edit"
                            >
                              ✏️
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  expense.id
                                )
                              }
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ADD / EDIT MODAL */}
        {showForm && (
          <div
            className="expense-modal-overlay"
            onClick={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeForm();
              }
            }}
          >
            <div className="expense-modal">
              <div className="expense-modal-header">
                <div>
                  <span className="dashboard-label">
                    {editingId
                      ? "UPDATE"
                      : "NEW TRANSACTION"}
                  </span>

                  <h2>
                    {editingId
                      ? "Edit Expense"
                      : "Add Expense"}
                  </h2>
                </div>

                <button
                  className="modal-close"
                  onClick={closeForm}
                >
                  ×
                </button>
              </div>

              {error && (
                <div className="form-error">
                  ⚠️ {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="expense-form"
              >
                <div className="form-group">
                  <label>
                    Expense Name
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Grocery shopping"
                    value={form.title}
                    onChange={
                      handleChange
                    }
                    autoFocus
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Amount
                    </label>

                    <div className="amount-input">
                      <span>₹</span>

                      <input
                        type="number"
                        name="amount"
                        placeholder="0"
                        min="1"
                        step="0.01"
                        value={form.amount}
                        onChange={
                          handleChange
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={
                        handleChange
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Category
                    </label>

                    <select
                      name="category"
                      value={
                        form.category
                      }
                      onChange={
                        handleChange
                      }
                    >
                      {categories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      Payment Method
                    </label>

                    <select
                      name="paymentMethod"
                      value={
                        form.paymentMethod
                      }
                      onChange={
                        handleChange
                      }
                    >
                      {paymentMethods.map(
                        (method) => (
                          <option
                            key={method}
                            value={method}
                          >
                            {method}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Notes{" "}
                    <span>
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    name="notes"
                    placeholder="Add some notes..."
                    value={form.notes}
                    onChange={
                      handleChange
                    }
                    rows="3"
                  />
                </div>

                <div className="expense-form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-expense-btn"
                  >
                    {editingId
                      ? "Update Expense"
                      : "Save Expense"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Expenses;