function SummaryCards({
  totalExpenses,
  expenses,
}) {
  const today = new Date();

  const startOfWeek = new Date(today);

  const day = today.getDay();

  const difference =
    day === 0 ? 6 : day - 1;

  startOfWeek.setDate(
    today.getDate() - difference
  );

  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const startOfYear = new Date(
    today.getFullYear(),
    0,
    1
  );

  const getExpenseDate = (expense) => {
    const date = new Date(expense.date);

    date.setHours(0, 0, 0, 0);

    return date;
  };

  const weeklyExpenses = expenses
    .filter(
      (expense) =>
        getExpenseDate(expense) >= startOfWeek
    )
    .reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  const monthlyExpenses = expenses
    .filter(
      (expense) =>
        getExpenseDate(expense) >= startOfMonth
    )
    .reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  const yearlyExpenses = expenses
    .filter(
      (expense) =>
        getExpenseDate(expense) >= startOfYear
    )
    .reduce(
      (total, expense) =>
        total + expense.amount,
      0
    );

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const cards = [
    {
      title: "Total Expenses",
      amount: formatCurrency(totalExpenses),
      icon: "💰",
      className: "blue",
    },
    {
      title: "This Week",
      amount: formatCurrency(weeklyExpenses),
      icon: "📅",
      className: "purple",
    },
    {
      title: "This Month",
      amount: formatCurrency(monthlyExpenses),
      icon: "📊",
      className: "green",
    },
    {
      title: "This Year",
      amount: formatCurrency(yearlyExpenses),
      icon: "📈",
      className: "orange",
    },
  ];

  return (
    <section className="summary-grid">

      {cards.map((card) => (
        <div
          className="summary-card"
          key={card.title}
        >

          <div
            className={`summary-icon ${card.className}`}
          >
            {card.icon}
          </div>

          <div className="summary-content">

            <p>{card.title}</p>

            <h2>{card.amount}</h2>

          </div>

        </div>
      ))}

    </section>
  );
}

export default SummaryCards;