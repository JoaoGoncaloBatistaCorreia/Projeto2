import { useContext } from "react";
import { ThemeContext } from "../App";

function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <div data-bs-theme={theme}>
      <div
        className="row"
        style={{
          padding: "12px",
          textAlign: "center",
          borderTop: "1px solid grey",
          fontSize: "14px",
        }}
      >
        <div className="col-12">
          João Nunes | João Correia | Frontend 25/26 
        </div>
      </div>
    </div>
  );
}

export default Footer;