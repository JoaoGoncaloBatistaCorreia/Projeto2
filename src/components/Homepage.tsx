import "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import { auth } from "../config/firebase";
import { useEffect } from "react";
import Feed from "./Feed";
import Footer from "./Footer";

function Homepage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/Error");
    }
  }, [navigate]);

  const handleSignout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className={`container-fluid text-center border ${theme}`}>
      <div className="row">
        <Feed handleSignout={handleSignout} />
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
