import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [payments, setPayments] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: token },
    }).then(res => setUsers(res.data))
      .catch(err => console.error("❌ Users Error:", err));

    axios.get("http://localhost:5000/api/admin/gigs", {
      headers: { Authorization: token },
    }).then(res => setGigs(res.data))
      .catch(err => console.error("❌ Gigs Error:", err));

    axios.get("http://localhost:5000/api/admin/payments", {
      headers: { Authorization: token },
    }).then(res => setPayments(res.data))
      .catch(err => console.error("❌ Payments Error:", err));
  }, [token]);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
      headers: { Authorization: token },
    }).then(() => setUsers(users.filter(user => user._id !== id)));
  };

  const deleteGig = (id) => {
    axios.delete(`http://localhost:5000/api/admin/gig/${id}`, {
      headers: { Authorization: token },
    }).then(() => setGigs(gigs.filter(gig => gig._id !== id)));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">🛠 Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map(user => (
            <div key={user._id} className="border p-4 rounded shadow-sm">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button
                onClick={() => deleteUser(user._id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Gigs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gigs.map(gig => (
            <div key={gig._id} className="border p-4 rounded shadow-sm">
              <p><strong>Title:</strong> {gig.title}</p>
              <p><strong>Price:</strong> ₹{gig.price}</p>
              <button
                onClick={() => deleteGig(gig._id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Payments</h2>
        <table className="min-w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-3 py-2">Client</th>
              <th className="border px-3 py-2">Freelancer</th>
              <th className="border px-3 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id}>
                <td className="border px-3 py-2">{p.client?.name || "N/A"}</td>
                <td className="border px-3 py-2">{p.freelancer?.name || "N/A"}</td>
                <td className="border px-3 py-2">₹{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;