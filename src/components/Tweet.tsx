interface TweetProps {
  id: number;
  message: string;
  img?: string;
  author: string;
  date: string;
  likes?: number;
  follow?: boolean;
  liked?: boolean;
  onToggleFollow?: () => void;
  onToggleLike: () => void;
  onDelete: () => void;
  onUpdate: () => void;
  isOwnTweet? : boolean;
}

function Tweet({ message, img, author, date, likes, liked, follow, onToggleFollow, onToggleLike, onDelete, onUpdate, isOwnTweet }: TweetProps) {
  return (
    <div 
      className="tweet" 
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px 16px",
        borderBottom: "1px solid #eff3f4"
      }}
    >
      <div 
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#cfd9de",
          flexShrink: 0
        }} 
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span style={{ fontWeight: "bold" }}>{author}</span>
            <span style={{ color: "#536471", fontSize: "14px" }}>{date}</span>
            {!isOwnTweet && (
        <button 
            onClick={onToggleFollow}
            style={{
              background: "none",
              border: "none",
              color: follow ? "#536471" : "#1d9bf0",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            {follow ? "Unfollow" : "Follow"}
          </button>
      )}
            
          </div>
          {isOwnTweet && (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "orange",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={onUpdate}
              >
                Editar
              </button>

              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div style={{ fontSize: "15px", wordBreak: "break-word", textAlign: "left" }}>
          {message}
        </div>

        {img && img !== "..." && (
          <div style={{ width: "40%", marginTop: "8px", borderRadius: "16px", overflow: "hidden" }}>
            <img src={img} alt="Tweet media" style={{ maxWidth: "100%", display: "block" }} />
          </div>
        )}


        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}>
          <button 
            onClick={onToggleLike}
            style={{
              background: "none",
              border: "none",
              color: liked ? "#f91880" : "#536471",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: liked ? "bold" : "normal",
              padding: "0"
            }}
          >
            {liked ? "♥︎" : "♡"}
          </button>
          <span style={{ color: liked ? "#f91880" : "#536471", fontSize: "15px" }}>
            {likes ?? 0}
          </span>
        </div>

      </div>
    </div>
  );
}

export default Tweet;