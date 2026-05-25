import { useContext } from "react";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";

function LeftMenu({
  handleSignout,
  handleSearchTweet = () => {},
  handleSearchAuthor = () => {},
}) {
  const themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  const isDark = themeContext.theme === "dark";

  return (
    <div
      className="col-2"
      style={{
        borderRight: isDark ? "1px solid #444" : "1px solid grey",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: isDark ? "#121212" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      <div className="row">
        <button
          type="button"
          onClick={() => navigate("/Homepage")}
          className="btn buttonstyle"
        >
          Homepage
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="btn buttonstyle"
        >
          Dashboard
        </button>
      </div>

      <div
        style={{
          fontWeight: 600,
          marginBottom: "10px",
          fontSize: "14px",
          color: isDark ? "#cccccc" : "#aaaaaa",
          display: "flex",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        Botões de navegação
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <input
          type="text"
          placeholder="Pesquisar tweets"
          onChange={(e) => handleSearchTweet(e.target.value)}
          className="input-search"
          style={{
            backgroundColor: isDark ? "#2b2b2b" : "white",
            color: isDark ? "white" : "black",
            border: isDark ? "1px solid #555" : "1px solid #ddd",
          }}
        />

        <input
          type="text"
          placeholder="Pesquisar por autor"
          onChange={(e) => handleSearchAuthor(e.target.value)}
          className="input-search"
          style={{
            backgroundColor: isDark ? "#2b2b2b" : "white",
            color: isDark ? "white" : "black",
            border: isDark ? "1px solid #555" : "1px solid #ddd",
          }}
        />
      </div>

      <div className="row" style={{ marginTop: "auto" }}>
        <button
          className="btn btn-outline-danger buttonstyle"
          onClick={handleSignout}
        >
          Sair
        </button>

        <button
          type="button"
          onClick={() => {
            themeContext.setTheme("light");
          }}
          className="btn buttonstyle"
        >
          Modo claro
        </button>

        <button
          type="button"
          onClick={() => {
            themeContext.setTheme("dark");
          }}
          className="btn buttonstyle"
        >
          Modo escuro
        </button>
      </div>
    </div>
  );
}

export default LeftMenu;