import { useState } from "react";

export default function Login({ setSession }) {
  const [signUp, setSignUp] = useState(false); // false = login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const signing = async () => {
    let info = {};

    if (!signUp) {
      // login
      info = { email, password };
    } else {
      // signup
      info = { name, role, email, password };
    }

    try {
      setLoading(true);
      const response = await fetch('https://water-crm-app.onrender.com/auth/' + (signUp ? 'sign-up' : 'sign-in'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
      });

      const result = await response.json();
      if (result.status === 1) {
        localStorage.setItem("session-data", JSON.stringify(result.info));
        setSession(result.info);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log("Something went wrong!", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login-canvas">
      <div className="sign-up">
        <div style={{ display: "flex", flexDirection: "row", fontSize: "25px", gap: "20px" }}>
          {signUp ? "Sign Up Page" : "Login Page"}
          <button
            style={{ borderRadius: "20%", border: "none", height: "35px", width: "45px" }}
            onClick={() => setSignUp((prev) => !prev)}
          >
            <i class="fa-solid fa-bottle-water"></i>
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); signing(); }} className="sign-form">
          {signUp && (
            <>
              <label>Name </label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" /> <br />
              <label>Role </label>
              <input value={role} onChange={(e) => setRole(e.target.value)} type="text" /> <br />
            </>
          )}
          <label>Email </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" /> <br />
          <label>Password </label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <button type="submit">{signUp ? "Sign Up" : "Sign In"}</button>
        </form>

        {loading && <h2>Wait...</h2>}
        {error && (
          <>
            <h2>Error Occurred. Try Again!</h2>
            <button onClick={() => setError(false)}>Okay</button>
          </>
        )}
        <span>If you want complete control make sure to type "Admin" in the role while signing up!</span>
      </div>
    </section>
  );
}