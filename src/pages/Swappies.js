import { useState } from "react";

const Swappies = () => {
  const [swappies, setSwappies] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addSwappy = () => {
    if (title && author) {
      setSwappies([...swappies, { title, author }]);
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold">Welcome to Swappy-Hub</h1>
      <p className="text-gray-600 text-center max-w-md mt-2">
        A decentralized self-publishing and distribution system for design students.
      </p>

      <div className="bg-white shadow-md rounded p-6 mt-6 max-w-lg w-full border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Swappy-Unit: GDA</h2>
        <div id="swappy-list" className="space-y-2">
          {swappies.map((swappy, index) => (
            <div key={index} className="border-b pb-2 text-lg">
              <strong>{swappy.title}</strong> by {swappy.author}
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6">Add a New Swappy</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mt-2 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 w-full mt-2 rounded"
        />
        <button
          onClick={addSwappy}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 w-full"
        >
          Add Swappy
        </button>
      </div>
    </div>
  );
};

export default Swappies;
