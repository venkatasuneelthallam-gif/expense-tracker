import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

function ExpenseChart({ expenses }) {
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

  // -----------------------------
  // CATEGORY DATA
  // -----------------------------

  const categoryData = categories
    .map((category) => {
      const total = expenses
        .filter(
          (expense) =>
            expense.category === category
        )
        .reduce(
          (sum, expense) =>
            sum + Number(expense.amount),
          0
        );

      return {
        name: category,
        value: Number(total.toFixed(2)),
      };
    })
    .filter((item) => item.value > 0);

  // -----------------------------
  // MONTHLY DATA
  // -----------------------------

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentYear = new Date().getFullYear();

  const monthlyData = monthNames.map(
    (month, index) => {
      const total = expenses
        .filter((expense) => {
          const date = new Date(expense.date);

          return (
            date.getFullYear() === currentYear &&
            date.getMonth() === index
          );
        })
        .reduce(
          (sum, expense) =>
            sum + Number(expense.amount),
          0
        );

      return {
        month,
        amount: Number(total.toFixed(2)),
      };
    }
  );

  // -----------------------------
  // WEEKLY DATA
  // -----------------------------

  const getWeekStart = (date) => {
    const result = new Date(date);
    const day = result.getDay();

    const difference =
      day === 0 ? 6 : day - 1;

    result.setDate(
      result.getDate() - difference
    );

    result.setHours(0, 0, 0, 0);

    return result;
  };

  const weeklyData = [];

  for (let i = 7; i >= 0; i--) {
    const date = new Date();

    date.setDate(
      date.getDate() - i * 7
    );

    const weekStart =
      getWeekStart(date);

    const weekEnd = new Date(weekStart);

    weekEnd.setDate(
      weekEnd.getDate() + 6
    );

    const total = expenses
      .filter((expense) => {
        const expenseDate =
          new Date(expense.date);

        expenseDate.setHours(0, 0, 0, 0);

        return (
          expenseDate >= weekStart &&
          expenseDate <= weekEnd
        );
      })
      .reduce(
        (sum, expense) =>
          sum + Number(expense.amount),
        0
      );

    weeklyData.push({
      week: `Week ${8 - i}`,
      amount: Number(total.toFixed(2)),
    });
  }

  // -----------------------------
  // HIGHEST CATEGORY
  // -----------------------------

  const highestCategory =
    categoryData.length > 0
      ? categoryData.reduce(
          (highest, current) =>
            current.value > highest.value
              ? current
              : highest
        )
      : null;

  // -----------------------------
  // TOTAL EXPENSE
  // -----------------------------

  const totalExpense = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  // -----------------------------
  // PIE COLORS
  // -----------------------------

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#0891b2",
    "#db2777",
    "#64748b",
  ];

  return (
    <section className="analytics-section">

      <div className="analytics-header">
        <div>
          <h2>Expense Analytics</h2>

          <p>
            Understand your spending patterns
            and financial habits.
          </p>
        </div>
      </div>

      {/* ANALYTICS CARDS */}

      <div className="analytics-summary">

        <div className="analytics-stat">
          <span className="analytics-icon">
            💰
          </span>

          <div>
            <p>Total Spending</p>

            <h3>
              ₹
              {totalExpense.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </h3>
          </div>
        </div>

        <div className="analytics-stat">
          <span className="analytics-icon">
            🧾
          </span>

          <div>
            <p>Total Transactions</p>

            <h3>{expenses.length}</h3>
          </div>
        </div>

        <div className="analytics-stat">
          <span className="analytics-icon">
            🏆
          </span>

          <div>
            <p>Highest Category</p>

            <h3>
              {highestCategory
                ? highestCategory.name
                : "No data"}
            </h3>
          </div>
        </div>

        <div className="analytics-stat">
          <span className="analytics-icon">
            📊
          </span>

          <div>
            <p>Highest Spending</p>

            <h3>
              ₹
              {highestCategory
                ? highestCategory.value.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                    }
                  )
                : "0.00"}
            </h3>
          </div>
        </div>

      </div>

      {/* CHART GRID */}

      <div className="charts-grid">

        {/* MONTHLY BAR CHART */}

        <div className="chart-card">
          <div className="chart-title">
            <h3>Monthly Spending</h3>

            <p>
              Expenses for {currentYear}
            </p>
          </div>

          <div className="chart-container">
            {expenses.length === 0 ? (
              <div className="no-chart-data">
                <span>📊</span>

                <p>
                  Add expenses to see your
                  monthly spending.
                </p>
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="month"
                    fontSize={11}
                  />

                  <YAxis
                    fontSize={11}
                  />

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(
                        value
                      ).toLocaleString("en-IN")}`
                    }
                  />

                  <Bar
                    dataKey="amount"
                    name="Expenses"
                    fill="#2563eb"
                    radius={[
                      5,
                      5,
                      0,
                      0,
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* CATEGORY PIE CHART */}

        <div className="chart-card">
          <div className="chart-title">
            <h3>Category Distribution</h3>

            <p>
              Where your money is going
            </p>
          </div>

          <div className="chart-container">
            {categoryData.length === 0 ? (
              <div className="no-chart-data">
                <span>🥧</span>

                <p>
                  Add expenses to see
                  category distribution.
                </p>
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    outerRadius={95}
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {categoryData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(
                        value
                      ).toLocaleString(
                        "en-IN"
                      )}`
                    }
                  />

                  <Legend
                    wrapperStyle={{
                      fontSize: "11px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* WEEKLY LINE CHART */}

        <div className="chart-card chart-wide">
          <div className="chart-title">
            <h3>Weekly Spending Trend</h3>

            <p>
              Spending across the last
              8 weeks
            </p>
          </div>

          <div className="chart-container">
            {expenses.length === 0 ? (
              <div className="no-chart-data">
                <span>📈</span>

                <p>
                  Add expenses to see your
                  spending trend.
                </p>
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={weeklyData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="week"
                    fontSize={11}
                  />

                  <YAxis
                    fontSize={11}
                  />

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(
                        value
                      ).toLocaleString(
                        "en-IN"
                      )}`
                    }
                  />

                  <Line
                    type="monotone"
                    dataKey="amount"
                    name="Spending"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* CATEGORY BREAKDOWN */}

      {categoryData.length > 0 && (
        <div className="category-breakdown">

          <div className="chart-title">
            <h3>Category Breakdown</h3>

            <p>
              Percentage of your total
              spending
            </p>
          </div>

          <div className="category-list">

            {categoryData.map(
              (item, index) => {
                const percentage =
                  totalExpense > 0
                    ? (
                        (item.value /
                          totalExpense) *
                        100
                      ).toFixed(1)
                    : 0;

                return (
                  <div
                    className="category-row"
                    key={item.name}
                  >
                    <div className="category-info">

                      <div className="category-name">
                        <span
                          className="category-dot"
                          style={{
                            background:
                              COLORS[
                                index %
                                  COLORS.length
                              ],
                          }}
                        ></span>

                        {item.name}
                      </div>

                      <strong>
                        ₹
                        {item.value.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}
                      </strong>

                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${percentage}%`,
                          background:
                            COLORS[
                              index %
                                COLORS.length
                            ],
                        }}
                      ></div>
                    </div>

                    <span className="percentage">
                      {percentage}%
                    </span>
                  </div>
                );
              }
            )}

          </div>
        </div>
      )}

    </section>
  );
}

export default ExpenseChart;