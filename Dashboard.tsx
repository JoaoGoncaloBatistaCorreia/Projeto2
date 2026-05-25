import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import LeftMenu from "./LeftMenu";
import { auth } from "../config/firebase";
import { ThemeContext } from "../App";

export default function Dashboard() {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const isDark = themeContext.theme === "dark";

  const ADMIN_EMAIL = "admin@gmail.com";

  const [tweets, setTweets] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("Admin");

  const [searchTweet, setSearchTweet] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const pageStyle = {
    width: "84%",
    padding: "20px",
    overflowY: "auto",
    backgroundColor: isDark ? "#121212" : "#f5f5f5",
    color: isDark ? "white" : "black",
  };

  const cardStyle = {
    backgroundColor: isDark ? "#1e1e1e" : "white",
    color: isDark ? "white" : "black",
    padding: "20px",
    borderRadius: "12px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: isDark ? "1px solid #555" : "1px solid #ddd",
    backgroundColor: isDark ? "#2b2b2b" : "white",
    color: isDark ? "white" : "black",
  };

  const getTweets = async () => {
    const response = await axios.get("http://localhost:3000/tweets");

    const safeData = response.data.map((t) => ({
      ...t,
      likes: t.likes ?? 0,
      follow: t.follow ?? false,
      liked: t.liked ?? false,
      img: t.img ?? "",
      author: t.author ?? "Unknown",
      message: t.message ?? "",
    }));

    setTweets(safeData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/Login");
        return;
      }

      if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        setIsAdmin(false);
        setCheckingAuth(false);
        return;
      }

      setIsAdmin(true);
      setCheckingAuth(false);
      getTweets();
    });

    return () => unsubscribe();
  }, [navigate]);

  const filteredTweets = tweets.filter((tweet) => {
    const tweetMessage = tweet.message.toLowerCase();
    const tweetAuthor = tweet.author.toLowerCase();

    return (
      tweetMessage.includes(searchTweet.toLowerCase()) &&
      tweetAuthor.includes(searchAuthor.toLowerCase())
    );
  });

  const handlePostTweet = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newTweet = {
      id: Date.now(),
      message: message,
      img: "",
      author: author || "Admin",
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      follow: false,
      liked: false,
    };

    axios
      .post("http://localhost:3000/tweets", newTweet)
      .then((response) => {
        setTweets((prev) => [response.data, ...prev]);
        setMessage("");
        setAuthor("Admin");
      })
      .catch((error) => {
        console.error("Error creating tweet:", error);
      });
  };

  const handleDeleteTweet = (id) => {
    axios
      .delete(`http://localhost:3000/tweets/${id}`)
      .then(() => {
        setTweets((tweetsList) => tweetsList.filter((t) => t.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting tweet:", error);
      });
  };

  const handleSignout = () => {
    auth.signOut().then(() => {
      navigate("/Login");
    });
  };

  if (checkingAuth) {
    return (
      <div
        className={themeContext.theme}
        style={{
          minHeight: "100vh",
          padding: "20px",
          backgroundColor: isDark ? "#121212" : "#f5f5f5",
          color: isDark ? "white" : "black",
        }}
      >
        <p>A verificar permissões...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className={themeContext.theme}
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <LeftMenu
          handleSignout={handleSignout}
          handleSearchTweet={setSearchTweet}
          handleSearchAuthor={setSearchAuthor}
        />

        <div style={pageStyle}>
          <div style={cardStyle}>
            <h1>Sem permissões</h1>
            <p>Não tens permissões para aceder à Dashboard Admin.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={themeContext.theme}
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <LeftMenu
        handleSignout={handleSignout}
        handleSearchTweet={setSearchTweet}
        handleSearchAuthor={setSearchAuthor}
      />

      <div style={pageStyle}>
        <h1>Dashboard Admin</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={{ ...cardStyle, flex: 1 }}>
            <h3>Total de tweets</h3>
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              {tweets.length}
            </p>
          </div>

          <div style={{ ...cardStyle, flex: 1 }}>
            <h3>Total de likes</h3>
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              {tweets.reduce((total, tweet) => total + tweet.likes, 0)}
            </p>
          </div>
        </div>

        <form
          onSubmit={handlePostTweet}
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
            ...cardStyle,
            padding: "15px",
          }}
        >
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor"
            style={inputStyle}
          />

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreve um tweet como admin"
            style={{
              ...inputStyle,
              flex: 1,
            }}
          />

          <button
            type="submit"
            className={`buttonstyle btn btn-primary ${
              !message.trim() ? "disabled" : ""
            }`}
          >
            Post
          </button>
        </form>

        <div style={cardStyle}>
          <h2>Todos os tweets</h2>

          {filteredTweets.length === 0 ? (
            <p>Não existem tweets.</p>
          ) : (
            filteredTweets.map((tweet) => (
              <div
                key={tweet.id}
                style={{
                  borderBottom: isDark
                    ? "1px solid #444"
                    : "1px solid #ddd",
                  padding: "15px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div>
                    <h4 style={{ margin: 0 }}>{tweet.author}</h4>

                    <p style={{ margin: "8px 0" }}>{tweet.message}</p>

                    {tweet.img && (
                      <img
                        src={tweet.img}
                        alt="Tweet"
                        style={{
                          width: "200px",
                          borderRadius: "12px",
                          display: "block",
                          marginTop: "8px",
                        }}
                      />
                    )}

                    <small>
                      Data: {tweet.date} | Likes: {tweet.likes}
                    </small>
                  </div>

                  <button
                    onClick={() => handleDeleteTweet(tweet.id)}
                    className="btn btn-danger"
                    style={{
                      height: "40px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}