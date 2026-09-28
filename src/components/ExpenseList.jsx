function ExpenseList({
  expenses,
  onDeleteExpense,
  onEditExpense,
}) {
  const getCategoryIcon = (category) => {
    const icons = {
      Food: "🍔",
      Travel: "🚗",
      Shopping: "🛍️",
      Bills: "🧾",
      Education: "📚",
      Health: "❤️",
      Entertainment: "🎬",
      Other: "📦",
    };

    return icons[category] || "📦";
  };

  if (expenses.length === 0) {
    return (
      <div className="empty-expenses">
        <div className="expense-icon">💰</div>

        <h3>No expenses found</h3>

        <p>
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="expense-list">

      {expenses.map((expense) => (

        <div
          className="expense-item"
          key={expense.id}
        >

          <div className="expense-category-icon">
            {getCategoryIcon(expense.category)}
          </div>

          <div className="expense-details">

            <h3>
              {expense.description}
            </h3>

            <div className="expense-meta">
              <span>{expense.category}</span>

              <span>•</span>

              <span>{expense.paymentMethod}</span>

              <span>•</span>

              <span>{expense.date}</span>
            </div>

            {expense.notes && (
              <p className="expense-notes">
                {expense.notes}
              </p>
            )}

          </div>

          <div className="expense-right">

            <strong>
              ₹{expense.amount.toLocaleString("en-IN")}
            </strong>

            <div className="expense-actions">

              <button
                className="edit-btn"
                onClick={() =>
                  onEditExpense(expense)
                }
                title="Edit expense"
              >
                ✏️
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  onDeleteExpense(expense.id)
                }
                title="Delete expense"
              >
                🗑️
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default ExpenseList;