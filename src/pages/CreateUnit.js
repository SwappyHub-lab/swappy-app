import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateUnit = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleCreateUnit = async (e) => {
    e.preventDefault();
    if (!name || !location) return alert("Please fill in all fields");

    try {
      const docRef = await addDoc(collection(db, "swappy_units"), {
        name,
        location,
        createdBy: auth.currentUser.uid,
      });

      alert("Swappy Unit Created!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding Swappy-Unit:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleCreateUnit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold">Create Swappy Unit</h2>
        <input
          type="text"
          placeholder="Unit Name"
          className="border p-2 my-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 my-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Unit</button>
      </form>
    </div>
  );
};

export default CreateUnit;
