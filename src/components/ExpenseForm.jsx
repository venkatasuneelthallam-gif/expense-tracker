import { useEffect, useState } from "react";

function ExpenseForm({
  onAddExpense,
  onUpdateExpense,
  editingExpense,
  onClose,
}) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "Cash",
    notes: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        description: editingExpense.description,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        paymentMethod: editingExpense.paymentMethod,
        notes: editingExpense.notes || "",
      });
    }
  }, [editingExpense]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.description.trim()) {
      alert("Please enter a description.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (editingExpense) {
      onUpdateExpense({
        ...editingExpense,
        ...formData,
        amount: Number(formData.amount),
      });
    } else {
      onAddExpense({
        id: Date.now(),
        ...formData,
        amount: Number(formData.amount),
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="expense-modal">

        <div className="modal-header">
          <div>
            <h2>
              {editingExpense
                ? "Edit Expense"
                : "Add New Expense"}
            </h2>

            <p>
              {editingExpense
                ? "Update your expense details."
                : "Enter your expense details below."}
            </p>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Description</label>

              <input
                type="text"
                name="description"
                placeholder="e.g. Lunch at restaurant"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Amount</label>

              <div className="amount-input">
                <span>₹</span>

                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Education</option>
                <option>Health</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Payment Method</label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Debit Card</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notes</label>

              <input
                type="text"
                name="notes"
                placeholder="Optional notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-expense-btn"
            >
              {editingExpense
                ? "Save Changes"
                : "+ Add Expense"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;