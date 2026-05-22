import "../styles/theme.css";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <div className="col-12" style={{ display: "flex", justifyContent: "center", gap: "10px", padding: "10px" }}>
      
      <button className="buttonfeedstyle" style={{
        borderBottom: activeTab === "for-you" ? "2px solid#1d9bf0" : ""
      }} onClick={() => setActiveTab("for-you")}>
        For you
      </button>
      
      <button className="buttonfeedstyle" style={{
        borderBottom: activeTab === "following" ? "2px solid#1d9bf0" : ""
      }} onClick={() => setActiveTab("following")}>
        Following
      </button>
    </div>
  );
}

export default Header;