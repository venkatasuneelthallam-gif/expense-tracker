import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      // Get all registered users
      const savedUsers = localStorage.getItem("expenseTrackerUsers");

      if (!savedUsers) {
        setError(
          "No account found. Please create an account first."
        );
        setLoading(false);
        return;
      }

      const users = JSON.parse(savedUsers);

      if (!Array.isArray(users) || users.length === 0) {
        setError(
          "No account found. Please create an account first."
        );
        setLoading(false);
        return;
      }

      // Find matching user
      const user = users.find(
        (item) =>
          item.email?.toLowerCase() === cleanEmail &&
          item.password === password
      );

      if (!user) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Store currently logged-in user
      localStorage.setItem(
        "expenseTrackerCurrentUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );

      localStorage.setItem(
        "expenseTrackerLoggedIn",
        "true"
      );

      // Keep old key for compatibility with existing components
      localStorage.setItem(
        "expenseTrackerUser",
        JSON.stringify(user)
      );

      if (rememberMe) {
        localStorage.setItem(
          "expenseTrackerRememberMe",
          "true"
        );
      } else {
        localStorage.removeItem(
          "expenseTrackerRememberMe"
        );
      }

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Something went wrong while logging in. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-left">

        <div className="auth-brand">
          <div className="brand-icon">
            ₹
          </div>

          <span>ExpenseFlow</span>
        </div>

        <div className="auth-content">

          <span className="auth-eyebrow">
            PERSONAL FINANCE
          </span>

          <h1>
            Take control of
            <br />
            your finances.
          </h1>

          <p>
            Track expenses, analyze your
            spending and manage your
            financial goals from one
            professional dashboard.
          </p>

          <div className="auth-features">

            <div>
              <span>✓</span>
              Easy expense tracking
            </div>

            <div>
              <span>✓</span>
              Powerful analytics
            </div>

            <div>
              <span>✓</span>
              Smart budget management
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        <div className="auth-card">

          {/* MOBILE BRAND */}
          <div className="mobile-brand">

            <div className="brand-icon">
              ₹
            </div>

            <span>ExpenseFlow</span>

          </div>

          <div className="auth-heading">

            <h2>
              Welcome back
            </h2>

            <p className="auth-subtitle">
              Sign in to continue to your
              dashboard.
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="auth-error">
              <span>!</span>
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
              />

            </div>

            {/* OPTIONS */}
            <div className="auth-options">

              <label className="remember">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="forgot-btn"
                onClick={() =>
                  setError(
                    "Password recovery is not configured yet."
                  )
                }
              >
                Forgot password?
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          {/* SIGNUP */}
          <p className="auth-switch">

            Don't have an account?

            <Link to="/signup">
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;