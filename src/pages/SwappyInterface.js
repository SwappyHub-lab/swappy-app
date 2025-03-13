import React, { useState } from "react";

const SwappyInterface = () => {
  const [swappies, setSwappies] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addSwappy = () => {
    if (title && author) {
      const newSwappy = { title, author };
      setSwappies([...swappies, newSwappy]);

      // Clear input fields
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-md shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to Swappy-Hub</h1>
      <p className="text-center mb-4">A decentralized self-publishing and distribution system for design students.</p>

      <h2 className="text-xl font-semibold mb-2">Swappy-Unit: GDA</h2>
      <div className="space-y-2">
        {swappies.map((swappy, index) => (
          <div key={index} className="border-b pb-2">
            <strong>{swappy.title}</strong> by {swappy.author}
          </div>
        ))}
      </div>

      <h3 className="mt-4 text-lg font-semibold">Add a New Swappy</h3>
      <input
        type="text"
        className="w-full p-2 border rounded mt-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-2 border rounded mt-2"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
        onClick={addSwappy}
      >
        Add Swappy
      </button>
    </div>
  );
};

export default SwappyInterface;
