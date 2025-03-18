import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, getDoc, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import axios from 'axios';

// Main component
const Home = () => {
  // State variables
  const navigate = useNavigate();
  const { unit } = useParams(); // Get the unit from the URL
  const [selectedUnit, setSelectedUnit] = useState(unit || "GDA"); // Default to "GDA"
  const [swappyList, setSwappyList] = useState([]);
  const [unitAddress, setUnitAddress] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    socialmedia: "",
    email: "",
    message: "",
    type: "swap", // Default to swap
  });
  const [image, setImage] = useState(null);
  const [selectedSwappy, setSelectedSwappy] = useState(null);
  const [loading, setLoading] = useState(false);

   // Update selectedUnit when the URL changes
   useEffect(() => {
    if (unit && unit !== selectedUnit) {
      setSelectedUnit(unit);
    }
  }, [unit]);


  // Fetch swappy items and unit address on component mount
useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "Swappy-Units", selectedUnit, "items"), // Use selectedUnit dynamically
    (snapshot) => {
      const sortedSwappies = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
      setSwappyList(sortedSwappies);
    }
  );

  const fetchAddress = async () => {
    try {
      const unitRef = doc(db, "Swappy-Units", selectedUnit); // Use selectedUnit dynamically
      const unitSnap = await getDoc(unitRef);
      if (unitSnap.exists()) {
        setUnitAddress(unitSnap.data().location);
      } else {
        console.warn("No unit address found!");
      }
    } catch (error) {
      console.error("Error fetching unit address:", error);
    }
  };

  fetchAddress();
  return unsubscribe; // Cleanup listener on unmount
}, [selectedUnit]); // Re-run when `selectedUnit` changes

// Change unit and update the URL
const changeUnit = (newUnit) => {
  setSelectedUnit(newUnit);
  navigate(`/${newUnit}`); // Updates the URL
};

  // Handle form input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "swappy_images");
    formData.append("cloud_name", "drlpcl0wa");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/drlpcl0wa/image/upload", formData);
      setImage(res.data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image!");
    }
    setLoading(false);
  };

  // Add a new swappy item
  const addSwappy = async () => {
    if (!formData.title || !formData.author) {
      alert("Title and Author are required!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "Swappy-Units", selectedUnit, "items"), {
        ...formData,
        imageUrl: image || "",
        chatMessages: [],
        createdAt: new Date()
      });
      setFormData({
        title: "",
        author: "",
        description: "",
        socialmedia: "",
        email: "",
        message: "",
        type: "swap"
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding Swappy:", error);
      alert("Failed to add Swappy. Check console for details.");
    }
    setLoading(false);
  };

  // Handle request for a swappy item
  const handleRequest = async (swappyId, isRequested) => {
    try {
      await updateDoc(doc(db,"Swappy-Units",selectedUnit, "items", swappyId), { requested: !isRequested });

      // Update both the chat interface and swappy list
      setSwappyList((prevList) =>
        prevList.map((swappy) =>
          swappy.id === swappyId ? { ...swappy, requested: !isRequested } : swappy
        )
      );

      if (selectedSwappy && selectedSwappy.id === swappyId) {
        setSelectedSwappy({ ...selectedSwappy, requested: !isRequested });
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  // Handle swap of a swappy item
  const handleSwap = async (swappyId) => {
    if (!window.confirm("Are you sure to remove this item?")) return;

    try {
      await deleteDoc(doc(db, "Swappy-Units", selectedUnit, "items", swappyId));
    } catch (error) {
      console.error("Error removing Swappy:", error);
    }
  };

  // Toggle borrow status of a swappy item
  const toggleBorrow = async (swappyId, isBorrowed) => {
    if (isBorrowed) {
      const feedback = prompt("What is your thought on this Swappy? Say a few words...");

      if (feedback !== null && feedback.trim() !== "") {
        try {
          await updateDoc(doc(db, "Swappy-Units", selectedUnit, "items", swappyId), {
            borrowed: false,
            feedback: feedback
          });
        } catch (error) {
          console.error("Error saving feedback:", error);
        }
      } else {
        alert("Feedback is required before putting back.");
        return;
      }
    } else {
      try {
        await updateDoc(doc(db, "Swappy-Units", selectedUnit, "items", swappyId), { borrowed: true });
      } catch (error) {
        console.error("Error updating borrow status:", error);
      }
    }

    setSwappyList((prevList) =>
      prevList.map((item) =>
        item.id === swappyId ? { ...item, borrowed: !isBorrowed } : item
      )
    );

    if (selectedSwappy && selectedSwappy.id === swappyId) {
      setSelectedSwappy({ ...selectedSwappy, borrowed: !isBorrowed });
    }
  };

  // Handle putting back a borrowed swappy item
  const handlePutBack = async (swappyId) => {
    const comment = window.prompt("What is your thought on this Swappy? Say a few words...");

    if (!comment) return; // If no comment, do nothing

    try {
      const swappyRef = doc(db,"Swappy-Units", selectedUnit, "items", swappyId);
      const swappySnap = await getDoc(swappyRef);

      if (swappySnap.exists()) {
        const swappyData = swappySnap.data();
        const updatedMessages = [...swappyData.chatMessages, comment]; // Add comment to chat messages

        await updateDoc(swappyRef, {
          chatMessages: updatedMessages,
          borrowed: false, // Mark as "not borrowed"
        });

        if (selectedSwappy?.id === swappyId) {
          setSelectedSwappy({ ...selectedSwappy, chatMessages: updatedMessages, borrowed: false });
        }
      }
    } catch (error) {
      console.error("Error updating Swappy item:", error);
    }
  };


  // Open chat for a swappy item
  const openChat = (swappy) => setSelectedSwappy(swappy);

  // Send a chat message
  const sendMessage = async () => {
    if (!selectedSwappy || !formData.message.trim()) return;

    const updatedMessages = [...selectedSwappy.chatMessages, formData.message];

    try {
      await updateDoc(doc(db, "swappy-items", selectedSwappy.id), {
        chatMessages: updatedMessages,
        messageCount: updatedMessages.length,
      });

      setSelectedSwappy({ ...selectedSwappy, chatMessages: updatedMessages });
      setFormData({ ...formData, message: "" });
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div>
      {/* Navigation buttons */}
      <button onClick={() => changeUnit("GDA")} disabled={selectedUnit === "GDA"}>
        GDA
      </button>
      <button onClick={() => changeUnit("PDA")} disabled={selectedUnit === "PDA"}>
        PDA
      </button>

     

      {/* Other UI elements */}
    </div>



      <h1>Welcome to Swappy-Hub</h1>

      <p>A decentralized self-publishing and distribution network for design students.</p>
      <p>Share your zines, prints, and other design work with your peers!</p>
      <div class="logo-box">
        <img class="logo" src="swappy.png" alt="" />
      </div>
      <div className="header">
      <h2>{selectedUnit === "GDA" ? "Graphic Design Arnhem" : "Product Design Arnhem"}</h2>
      </div>
      {unitAddress && (
        <p>
          <strong>Location:</strong>{" "}
          <a href={unitAddress} target="_blank" rel="noopener noreferrer">
            {unitAddress}
          </a>
        </p>
      )}

      {/* Add Swappy Form */}
      <div className="container">
        <button className="learn-more" onClick={addSwappy} disabled={loading}>
          {loading ? "Adding..." : "Add Swappy"}
        </button>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
        <input className="input-description" type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="text" name="socialmedia" placeholder="Social Media" value={formData.socialmedia} onChange={handleChange} />
        {/* <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /> */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div className="info-container">

          <p className="info-text">
            <label>
              <input type="radio" name="type" value="swap" checked={formData.type === "swap"} onChange={handleChange} />
              <strong>Swap option:</strong> If you chose this option then other people can take your Swappy out of the shelf and bring it home.
              Ideal choice for easy prints and objects. Ideal choice if you have more copies of the Swappy such as zines, prints, tiny objects, etc.
            </label>
          </p>

          <p className="info-text">
            <label>
              <input type="radio" name="type" value="lend" checked={formData.type === "lend"} onChange={handleChange} />
              <strong>Lend option:</strong> If your Swappy is a one and only copy, you may not want others to take it home. Understandable!
              The lending option allows anyone to flip through or examine your Swappy as long as they put it back in the unit.
            </label>
          </p>
        </div>
        <button className="learn-more" onClick={addSwappy} disabled={loading}>
          {loading ? "Uploading...Just a second :)" : "Add Swappy"}
        </button>
      </div>

      {/* Chat Section */}
      {selectedSwappy && (
        <div className="containerChat-box">

          <button className="learn-more" onClick={() => setSelectedSwappy(null)}>Close Chat</button>

          <h3>Chat about {selectedSwappy.title}</h3>

          <div className="chat-messages">
            {selectedSwappy.chatMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}

          </div>
          <div className="container">
            <input type="text" name="message" placeholder="Ask something or leave a reply..." value={formData.message || ""} onChange={handleChange} />
            <button className="learn-more" onClick={sendMessage}>Send</button>
          </div>

          {/* Borrow/Put Back Button */}
          {selectedSwappy.type !== "swap" && (
            <button className="learn-more borrow-button" onClick={() => {
              if (selectedSwappy.borrowed) {
                handlePutBack(selectedSwappy.id);
              } else {
                toggleBorrow(selectedSwappy.id, selectedSwappy.borrowed);
              }
            }}>
              {selectedSwappy.borrowed ? "Put Back" : "Borrow"}
            </button>
          )}

          {/* Request Button (Moved inside Chat UI) */}
          {selectedSwappy.type !== "lend" && (
            <div className="swapRequestButtonContainer">
              {selectedSwappy.requested}

              <button className="learn-more" onClick={() => handleRequest(selectedSwappy.id, selectedSwappy.requested)}>
                {selectedSwappy.requested ? "Cancel Request" : "Request This Swappy"}
              </button>

              <button className="learn-more" onClick={() => handleSwap(selectedSwappy.id)}>Swap This Swappy</button>


            </div>
          )}
        </div>

      )}

      {/* Display Swappy Items */}
      <div className="containerSwappies">
        {swappyList.map((swappy) => (
          <div key={swappy.id} className={`swappy-item ${swappy.requested ? 'requested' : ''}`}>
            <h3><strong>{swappy.title} by {swappy.author}</strong></h3>

            {swappy.requested && <span className="requested-label">✅ Requested</span>}
            {swappy.borrowed && <p className="borrowed-tag">📌 Borrowed</p>}
            {swappy.chatMessages.length > 0 && (
              <p className="latest-message"><strong>🗨️ :</strong> "{swappy.chatMessages[swappy.chatMessages.length - 1]}"</p>
            )}


            {swappy.imageUrl && <img src={swappy.imageUrl} alt="Swappy Thumbnail" width="300" />}
            <p><strong></strong> {swappy.type === "lend" ? "‼️ Borrow Only ‼️ Please return when you finished examining it :) Thank you!" : "Available for Swap"}</p>
            <button className="learn-more chat-button" onClick={() => openChat(swappy)}>
              Open Chat
              {swappy.messageCount > 0 && (
                <span className="chat-notification">{swappy.messageCount}</span>
              )}
            </button>

            <details className="swappy-details">
              <summary>Read more</summary>
              <p className="description-text">{swappy.description}</p>
              <p>
                <strong>Connect to </strong>
                <a href={swappy.socialmedia.startsWith("http") ? swappy.socialmedia : `https://instagram.com/${swappy.socialmedia.replace("@", "")}`} target="_blank" rel="noopener noreferrer">
                  {swappy.socialmedia}
                </a>
              </p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;