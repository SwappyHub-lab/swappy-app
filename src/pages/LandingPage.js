import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to SwappyHub</h1>
      <p>Select a Swappy Unit to continue:</p>

      <button className="learn-more" onClick={() => navigate("/GDA")} style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
        📚 Graphic Design Arnhem (GDA)
      </button>
      
      <button className="learn-more" onClick={() => navigate("/PDA")} style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
        🎨 Product Design Arnhem (PDA)
      </button>
    </div>
  );
};

export default LandingPage;
