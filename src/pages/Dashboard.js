import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnits = async () => {
      const querySnapshot = await getDocs(collection(db, "swappy_units"));
      setUnits(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUnits();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Swappy Units</h1>
      <button onClick={() => navigate("/create-unit")} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Create Swappy Unit
      </button>
      <ul>
        {units.map(unit => (
          <li key={unit.id} className="p-4 border rounded my-2">
            <h2 className="text-lg font-bold">{unit.name}</h2>
            <p>{unit.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
