import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to SwappyHub</h1>
      <p>Select a Swappy Unit to continue:</p>

      <button className="learn-more" onClick={() => navigate("/GDA")} >
        Graphic Design Arnhem (GDA)
      </button>
      
      <button className="learn-more" onClick={() => navigate("/PDA")}>
        Product Design Arnhem (PDA)
      </button>

      <button className="learn-more" onClick={() => navigate("/XPUB")} >
        Experimental Publishing (XPUB)
      </button>
    </div>
  );
};

export default LandingPage;
