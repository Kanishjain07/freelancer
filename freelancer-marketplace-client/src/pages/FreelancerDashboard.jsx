import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Chatbox from "../components/Chatbox";

const getUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.id;
};

function FreelancerDashboard() {
  const [gigs, setGigs] = useState([]);
  const [newGig, setNewGig] = useState({ title: "", description: "", price: "" });
  const [chatUser, setChatUser] = useState(null);
  const [stats, setStats] = useState(null);

  const userId = getUserId();
  const token = localStorage.getItem("token");

  // ✅ Load freelancer stats
  useEffect(() => {
    if (!token) return;
    axios
      .get("https://freelancer-9826.vercel.app/api/dashboard/freelancer", {
        headers: { Authorization: token },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("❌ Stats Error:", err));
  }, [token]);

  // ✅ Load gigs created by freelancer
 useEffect(() => {
  if (!token) return;

  // Fetch both gigs and freelancer stats
  const fetchDashboardData = async () => {
    try {
      // Fetch gigs
      const gigRes = await axios.get("https://freelancer-9826.vercel.app/api/gigs/my-gigs", {
        headers: { Authorization: token },
      });
      setGigs(gigRes.data);

      // Fetch freelancer stats
      const statsRes = await axios.get("https://freelancer-9826.vercel.app/api/dashboard/freelancer", {
        headers: { Authorization: token },
      });
      //setFreelancerStats(statsRes.data); // You should define this state
    } catch (err) {
      console.error("❌ Error fetching dashboard data:", err);
    }
  };
  

  fetchDashboardData();
}, [token]);

  const handleCreateGig = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://freelancer-9826.vercel.app/api/gigs", newGig, {
        headers: { Authorization: token },
      });
      setGigs([...gigs, res.data]);
      setNewGig({ title: "", description: "", price: "" });
      alert("✅ Gig created!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create gig");
    }
  };

  const handleDeleteGig = async (gigId) => {
    try {
      await axios.delete(`https://freelancer-9826.vercel.app/api/gigs/${gigId}`, {
        headers: { Authorization: token },
      });
      setGigs(gigs.filter((gig) => gig._id !== gigId));
    } catch (err) {
      alert("❌ Could not delete gig");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">📌 My Gigs</h2>

      {/* ✅ Gig Form */}
      <form onSubmit={handleCreateGig} className="space-y-4 bg-gray-100 p-4 rounded mb-8">
        <input
          type="text"
          placeholder="Title"
          value={newGig.title}
          onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newGig.description}
          onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newGig.price}
          onChange={(e) => setNewGig({ ...newGig, price: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Publish Gig
        </button>
      </form>

      {/* ✅ Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-700">Total Gigs</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalGigs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-700">Completed Projects</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.completedJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-700">Total Earnings</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">₹{stats.totalEarnings}</p>
          </div>
        </div>
      )}

      {/* ✅ Gig Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {gigs.map((gig) => (
          <div key={gig._id} className="border p-4 rounded shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{gig.title}</h3>
            <p className="text-gray-700 mb-2">{gig.description}</p>
            <p className="text-green-600 font-bold">₹{gig.price}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleDeleteGig(gig._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => setChatUser(gig.createdBy)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Chat UI */}
      {chatUser && (
        <div className="fixed bottom-4 right-4 w-96 bg-white border p-4 shadow-lg rounded">
          <h4 className="font-semibold mb-2">Chat</h4>
          <Chatbox senderId={userId} receiverId={chatUser?._id || chatUser} />
        </div>
      )}
    </div>
  );
}

export default FreelancerDashboard;
