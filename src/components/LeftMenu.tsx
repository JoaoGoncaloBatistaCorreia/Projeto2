import { useContext } from "react";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";


function LeftMenu({handleSignout}) {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  console.log("Context color is " + themeContext.theme);
  return (
    <div
      className="col-2"
      style={{
        borderRight: "1px solid grey",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div className="row">
        <button
          type="button"
          onClick={() =>
            navigate("/Dashboard")
          }
          className="btn btn-primary buttonstyle"
        >
          Dashboard
        </button>
      </div>
      <div
        style={{
          fontWeight: 600,
          marginBottom: "10px",
          fontSize: "14px",
          color: "#aaaaaa",
          display: "flex",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        Botões de navegação
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        oi
        oi
        io
      </div>
      <div className="row" style={{ marginTop: "auto" }}>
        <button className="btn btn-outline-danger buttonstyle" onClick={handleSignout}>
        Sair
      </button>
        <button
          type="button"
          onClick={() => {
            themeContext.setTheme("light");
          }}
          className="btn btn-primary buttonstyle"
        >
          Modo claro
        </button>
        <button
          type="button"
          onClick={() => {
            themeContext.setTheme("dark");
          }}
          className="btn btn-primary buttonstyle"
        >
          Modo escuro
        </button>
      </div>
    </div>
  );
}

export default LeftMenu;
