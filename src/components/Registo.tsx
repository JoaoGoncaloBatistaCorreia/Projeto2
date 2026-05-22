import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

function Registo() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleRegisto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAlert("Registo efetuado com sucesso!");
      navigate("/Homepage");
    } catch (error) {
      setAlert(" Erro no registo. Tente novamente.");
    }
  };

  return (
    <main
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: "#f5f6fa" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <form onSubmit={handleRegisto}>
          <h2 className="text-center mb-4">XReplica</h2>
          <p className="text-center mb-4">Registo</p>

          {alert && (
            <div className="alert alert-info text-center py-2">
              {alert}
            </div>
          )}

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Registar
          </button>

          <p className="text-center mt-4 text-muted small">
            Já tem conta? Faça login <a
          onClick={() =>
            navigate("/Login")
          }
          style={{fontWeight:"bolder", cursor:"pointer"}}
        >aqui</a>
          </p>


          <p className="text-center mt-4 text-muted small">
            &copy; João Nunes | João Correia | 2026
          </p>
        </form>
      </div>
    </main>
  );
}

export default Registo;