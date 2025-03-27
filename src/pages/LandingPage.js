import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (

    <div style={{ margin: 20, }}>

      {/* Dropdown Sections */}
      <div >
        <style>
          {`
          .hover-box {
            display: flex;
            margin-top: 30px;
            text-align: left;
            max-width: 600px;
            margin: auto;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .hover-box:hover {
            text-decoration: underline;
          }
        `}
        </style>

        <details className="hover-box">
          <summary>How to Publish?</summary>
          <ol>
            <li> <strong>Choose</strong> a physical or digital project (prints, drawings, manuscripts, books, zines, or any other small objects).</li>
            <br></br>
            <li>Pick a <strong>Creative Commons License</strong>  (more info on the Swappy-Publish Card) and attach it to your object.</li>
            <br></br>
            <li> <strong>Scan the QR code</strong> on the unit and add your awesome project to the Swappy Unit.</li>
          </ol>
        </details>

        <details className="hover-box">
          <summary>How to Swap?</summary>
          <ol>
            <li>Go to <strong><a href="https://www.swappyhub.com">www.swappyhub.com</a></strong> and browse through the available Swappy Units and the Swappies inside them.</li>
            <br></br>
            <li>Found something nice?<strong>Start a chat about it!</strong> </li>
            <br></br>
            <li>If the Swappy is in the unit next to you, feel free to <strong>swap or borrow</strong> it. If the Swappy you like is in <strong>another</strong> Swappy Unit, <strong>submit a request</strong> and wait for it to arrive at your unit.</li>
          </ol>
        </details>

        <details className="hover-box">
          <summary>About</summary>
          <ol >
            <p>
              Swappy is a project that gives design students the opportunity to decide whether they want to publish or share their projects with other students and a general audience.
            </p>
            <strong>What happens to my project after the presentation?</strong>
            <p>
              This project is intended to educate students about the afterlife of their projects, encouraging them to think beyond research and production.
            </p>
            <p>
              <strong>Trust each other!</strong>
              <p> Engaging with the system requires trust on multiple levels. First and foremost:<strong>YOU GOT THIS!</strong>  Sharing your design process is <strong> AWESOME AND VALUABLE</strong> to other students too.
              </p>
            </p>
            <p>
              Swappy is all about  <strong>building trust and engagement</strong>  among students and stimulating conversations about projects while also considering how to create a public for ourselves.
            </p>
            <p> <strong>Hope you enjoy it!</strong> <br /> Xoxo, Balint</p>
          </ol>
        </details>
      </div>
      <br></br>
      <div className="logo-box">
        <img className="logo" src="swappy.png" alt="Swappy Logo" />
      </div>

      <strong> <p>A decentralized self-publishing and distribution network for design students.</p>
        <p>Check out the awesome zines, prints, and other design works!</p>
      </strong>

      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column",
 alignItems: "center" }}>
      <img src="GDA.svg" style={{ maxWidth: 200 }}></img>
      <div style={{transform: "rotate(-30deg)"  }}>
        <button className="learn-more" onClick={() => navigate("/GDA")} >
          Graphic Design Arnhem (GDA)
        </button>
       </div>
      </div>
      <br></br>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column",
 alignItems: "center" }}>
      <img src="PDA.svg" style={{ maxWidth: 200 }}></img>
      <br></br>
      <button className="learn-more" onClick={() => navigate("/PDA")}  style={{transform: "rotate(30deg)"  }} >
        Product Design Arnhem (PDA)
      </button>
      </div>

      <br></br>
      {/* <button className="learn-more" onClick={() => navigate("/XPUB")}>
        Experimental Publishing (XPUB)
      </button> */}
    </div>
    
  );
};

export default LandingPage;
