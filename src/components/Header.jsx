function Header() {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">₹</div>

        <div>
          <h2>ExpenseTracker</h2>
          <span>Personal Finance</span>
        </div>
      </div>

      <nav className="navigation">
        <a href="#dashboard" className="active">
          Dashboard
        </a>

        <a href="#expenses">
          Expenses
        </a>

        <a href="#reports">
          Reports
        </a>
      </nav>

      <div className="profile">
        <div className="profile-avatar">
          U
        </div>

        <div className="profile-info">
          <strong>User</strong>
          <span>Personal Account</span>
        </div>
      </div>
    </header>
  );
}

export default Header;