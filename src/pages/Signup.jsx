import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Validation
    if (!cleanName) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Get existing users
      const savedUsers =
        localStorage.getItem("expenseTrackerUsers");

      let users = [];

      if (savedUsers) {
        users = JSON.parse(savedUsers);

        if (!Array.isArray(users)) {
          users = [];
        }
      }

      // Check if email already exists
      const existingUser = users.find(
        (user) =>
          user.email?.toLowerCase() === cleanEmail
      );

      if (existingUser) {
        setError(
          "An account with this email already exists."
        );
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: cleanName,
        email: cleanEmail,
        password: password,
      };

      // Add user
      const updatedUsers = [
        ...users,
        newUser,
      ];

      // Save all users
      localStorage.setItem(
        "expenseTrackerUsers",
        JSON.stringify(updatedUsers)
      );

      // Also save the latest user for compatibility
      localStorage.setItem(
        "expenseTrackerUser",
        JSON.stringify(newUser)
      );

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go to login
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("Signup error:", error);

      setError(
        "Unable to create account. Please try again."
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
            Start managing
            <br />
            your money smarter.
          </h1>

          <p>
            Create your personal ExpenseFlow
            account and take control of your
            spending.
          </p>

          <div className="auth-features">

            <div>
              <span>✓</span>
              Track every expense
            </div>

            <div>
              <span>✓</span>
              Analyze spending patterns
            </div>

            <div>
              <span>✓</span>
              Manage your monthly budget
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
              Create account
            </h2>

            <p className="auth-subtitle">
              Create your account to start
              tracking your expenses.
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="auth-error">
              <span>!</span>
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="auth-success">
              <span>✓</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSignup}>

            {/* NAME */}
            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                autoComplete="name"
                required
              />

            </div>

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
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="new-password"
                required
              />

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                required
              />

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">

            Already have an account?

            <Link to="/login">
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;