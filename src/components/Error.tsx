import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <h2>Erro</h2>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          border: "none",
          background: "#4f46e5",
          color: "white",
          cursor: "pointer",
        }}
      >
        Ir para Login
      </button>
    </div>
  );
}

export default Error;