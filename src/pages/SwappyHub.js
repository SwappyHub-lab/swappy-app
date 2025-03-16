import React, { useState } from "react";

const SwappyHub = () => {
  const [swappies, setSwappies] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addSwappy = () => {
    if (title && author) {
      const newSwappy = { title, author };
      setSwappies([...swappies, newSwappy]);

      // Clear inputs
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Swappy-Hub</h1>
      <p className="text-lg text-gray-600 mb-6">
        A decentralized self-publishing and distribution system for design students.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Swappy-Unit: GDA</h2>
        <div className="space-y-3 mb-6">
          {swappies.map((swappy, index) => (
            <div key={index} className="p-3 border-b border-gray-300">
              <strong>{swappy.title}</strong> by {swappy.author}
            </div>
          ))}
        </div>

        <h3 className="text-xl font-medium mb-3">Add a New Swappy</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={addSwappy} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Swappy
        </button>
      </div>
    </div>
  );
};

export default SwappyHub;
