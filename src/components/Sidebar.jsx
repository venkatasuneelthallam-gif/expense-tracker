import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Sidebar({
  mobileOpen = false,
  closeSidebar = () => {},
}) {
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "expenseTrackerUser"
      )
    ) || {};

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: "₹",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "▥",
    },
    {
      name: "Budget",
      path: "/budget",
      icon: "◎",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem(
      "expenseTrackerLoggedIn"
    );

    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`sidebar ${
          mobileOpen
            ? "sidebar-open"
            : ""
        }`}
      >
        {/* BRAND */}

        <div className="sidebar-brand">
          <div className="brand-icon">
            ₹
          </div>

          <div>
            <strong>
              ExpenseFlow
            </strong>

            <span>
              Finance Manager
            </span>
          </div>
        </div>

        {/* MENU TITLE */}

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        {/* NAVIGATION */}

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive
                    ? "active"
                    : ""
                }`
              }
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* USER AREA */}

        <div className="sidebar-bottom">
          <div className="user-profile">

            <div className="avatar">
              {user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

            <div className="user-info">
              <strong>
                {user.name ||
                  "User"}
              </strong>

              <span>
                {user.email ||
                  "user@example.com"}
              </span>
            </div>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <span>↪</span>

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;