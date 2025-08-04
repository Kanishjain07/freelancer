import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Chatbox from "../components/Chatbox";
import PaymentModal from "../components/PaymentModal";

const getUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.id;
};

function HireFreelancer() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [paymentFreelancer, setPaymentFreelancer] = useState(null);
  const [stats, setStats] = useState(null);
  const loggedInUserId = getUserId();
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/api/dashboard/client", {
        headers: { Authorization: token },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("❌ Stats Error:", err));
  }, [token]);

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gigs")
      .then((res) => setGigs(res.data))
      .catch((err) => console.error("❌ Error fetching gigs:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 flex items-center gap-2">
        <span role="img" aria-label="briefcase">💼</span> Hire a Freelancer
      </h2>

      <input
        type="text"
        placeholder="🔍 Search for frontend, logo design, SEO..."
        className="w-full mb-6 p-3 border border-gray-300 rounded-md shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ Client Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-700">Total Projects Posted</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-700">Filled Projects</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.filledJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-700">Total Spent</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">₹{stats.totalSpent}</p>
          </div>
        </div>
      )}

      {/* ✅ Gig Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gigs
          .filter(
            (gig) =>
              gig.title.toLowerCase().includes(search.toLowerCase()) ||
              gig.description.toLowerCase().includes(search.toLowerCase())
          )
          .map((gig) => (
            <div
              key={gig._id}
              className="bg-white border border-gray-200 p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{gig.title}</h3>
              <p className="text-gray-600">{gig.description}</p>
              <p className="text-green-600 font-bold mt-3 text-lg">₹{gig.price}</p>
              <p className="text-sm text-gray-500 mt-1">By {gig.createdBy?.name || "Unknown"}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setChatUser(gig.createdBy)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => setPaymentFreelancer(gig.createdBy)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm"
                >
                  💸 Hire / Pay
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* ✅ Chatbox */}
      {chatUser && (
        <div className="fixed bottom-4 right-4 w-96 bg-white shadow-xl rounded-lg p-4 border">
          <h4 className="font-semibold mb-2">Chat with {chatUser?.name}</h4>
          <Chatbox senderId={loggedInUserId} receiverId={chatUser?._id} />
        </div>
      )}

      {/* ✅ Payment Modal */}
      {paymentFreelancer && (
        <PaymentModal
          freelancer={paymentFreelancer}
          onClose={() => setPaymentFreelancer(null)}
        />
      )}
    </div>
  );
}

export default HireFreelancer;