import { useState, useEffect } from "react";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Tweet from "./Tweet";
import axios from "axios";

export default function Feed({ handleSignout }) {
  const [prompt, setPrompt] = useState("");
  const [img, setImg] = useState("");
  const [activeTab, setActiveTab] = useState("for-you");
  const [tweetData, setTweetData] = useState<any>([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:3000/tweets");

    const safeData = response.data.map((t) => ({
      ...t,
      likes: t.likes ?? 0,
      follow: t.follow ?? false,
      liked: t.liked ?? false,
      img: t.img ?? "",
    }));

    setTweetData(safeData);
  };

  useEffect(() => {
    getData();
  }, []);

  const followedTweets = tweetData.filter((t) => t?.follow);

  const handleToggleFollow = (id) => {
    setTweetData(
      tweetData.map((t) => (t.id === id ? { ...t, follow: !t.follow } : t)),
    );
  };

  const handleToggleLike = (id) => {
    setTweetData(
      tweetData.map((t) => {
        if (t.id === id) {
          const isLiked = t.liked;

          return {
            ...t,
            liked: !isLiked,
            likes: isLiked ? t.likes - 1 : t.likes + 1,
          };
        }

        return t;
      }),
    );
  };

  const handleDeleteTweet = (id) => {
    axios
      .delete(`http://localhost:3000/tweets/${id}`)
      .then(() => {
        setTweetData((tweetsList) => tweetsList.filter((t) => t.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting tweet:", error);
      });
  };

  const handleEditTweet = (id) => {
    const tweetToEdit = tweetData.find((t) => t.id === id);

    if (!tweetToEdit) return;

    const newMessage = window.prompt("Editar tweet:", tweetToEdit.message);

    if (newMessage === null) return;

    axios
      .patch(`http://localhost:3000/tweets/${id}`, {
        message: newMessage,
      })
      .then((response) => {
        setTweetData((tweetsList) =>
          tweetsList.map((t) => (t.id === id ? { ...t, ...response.data } : t)),
        );
      })
      .catch((error) => {
        console.error("Error editing tweet:", error);
      });
  };

const handleSearchTweet = async (searchText) => {
  if (!searchText.trim()) {
    getData();
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/tweets");

    const filteredTweets = response.data.filter((tweet) =>
      tweet.message.toLowerCase().includes(searchText.toLowerCase())
    );

    setTweetData(filteredTweets);
  } catch (error) {
    console.error("Erro ao pesquisar tweets:", error);
  }
};

const handleSearchAuthor = async (searchText) => {
  if (!searchText.trim()) {
    getData();
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/tweets");

    const filteredTweets = response.data.filter((tweet) =>
      tweet.author.toLowerCase().includes(searchText.toLowerCase())
    );

    setTweetData(filteredTweets);
  } catch (error) {
    console.error("Erro ao pesquisar tweets:", error);
  }
};


  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) return;

    if (file.size > 100 * 1024) {
      alert("Ficheiro demasiado grande.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => setImg(reader.result as string);

    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!prompt.trim() && !img) return;

    const newTweet = {
      id: Date.now(),
      message: prompt,
      img: img,
      author: "Me",
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      follow: true,
      liked: false,
    };

    axios
      .post("http://localhost:3000/tweets", newTweet)
      .then((response) => {
        const safeTweet = {
          ...response.data,
          likes: response.data.likes ?? 0,
          follow: response.data.follow ?? true,
          liked: response.data.liked ?? false,
          img: response.data.img ?? "",
        };

        setTweetData((prev) => [safeTweet, ...prev]);
        setPrompt("");
        setImg("");
      })
      .catch((error) => {
        console.error("Error creating tweet:", error);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <LeftMenu handleSignout={handleSignout} handleSearchTweet={handleSearchTweet} handleSearchAuthor={handleSearchAuthor}/>

      <div
        style={{
          width: "84%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            margin: "10px",
            padding: "5px",
            gap: "8px",
            alignItems: "center",
              borderRadius: "10px",
              border: "1px solid #ddd"
          }}
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="No que está a pensar?"
            style={{
              flex: 1,
              padding: "5px",
              borderRadius: "10px",
              border: 0,
              backgroundColor: "transparent"
            }}
          />

          <label className="upload-box">
            <input accept="image/*" type="file" hidden onChange={handleImageUpload}/>

            <div className="upload-content">
              <span className="icon">+</span>
            </div>
          </label>

          <button
            type="submit"
            className={`btn ${
              !prompt.trim() && !img ? "disabled" : ""
            }`}
          >
            Post
          </button>
        </form>

        {activeTab === "following" && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <h1>Feed personalizado</h1>

            {followedTweets.length === 0 ? (
              <p
                style={{
                  padding: "20px",
                  color: "#666",
                  textAlign: "center",
                }}
              >
                Bem-vindo ao XReplica, segue alguém para veres os seus tweets
                aqui.
              </p>
            ) : (
              followedTweets.map((t) => (
                <div key={t.id}>
                  <Tweet
                    {...t}
                    onToggleFollow={() => handleToggleFollow(t.id)}
                    onToggleLike={() => handleToggleLike(t.id)}
                    onDelete={() => handleDeleteTweet(t.id)}
                    onUpdate={() => handleEditTweet(t.id)}
                    isOwnTweet={t.author === "Me"}
                  />
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "for-you" && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <h1>Feed completo</h1>

            {tweetData.map((t) => (
              <div key={t.id}>
                <Tweet
                  {...t}
                  onToggleFollow={() => handleToggleFollow(t.id)}
                  onToggleLike={() => handleToggleLike(t.id)}
                  onDelete={() => handleDeleteTweet(t.id)}
                  onUpdate={() => handleEditTweet(t.id)}
                  isOwnTweet={t.author === "Me"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
