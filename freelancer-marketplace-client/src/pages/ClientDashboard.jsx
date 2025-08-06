
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ChatBox from "../components/Chatbox";
import PaymentModal from "../components/PaymentModal";

function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", budget: "" });
  const [editingJobId, setEditingJobId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", budget: "" });
  const [filter, setFilter] = useState("all");
  const [chatUser, setChatUser] = useState(null);
  const [paymentUser, setPaymentUser] = useState(null);

  const token = localStorage.getItem("token");
  const loggedInUserId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    if (!token) return;
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/my-jobs", {
        headers: { Authorization: token },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("❌ Error fetching jobs:", err.message);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/jobs", form, {
        headers: { Authorization: token },
      });
      alert("✅ Job posted!");
      setForm({ title: "", description: "", budget: "" });
      fetchJobs();
    } catch (err) {
      alert("❌ Failed to post job");
      console.error(err);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: token },
      });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFilled = async (jobId) => {
    try {
      await axios.patch(`http://localhost:5000/api/jobs/${jobId}/toggle-filled`, null, {
        headers: { Authorization: token },
      });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/jobs/${editingJobId}`, editForm, {
        headers: { Authorization: token },
      });
      setEditingJobId(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen">
       
    <aside className="w-64 bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">Client Panel</h2>
      <ul className="space-y-4">
        <li><a href="#" className="text-gray-700 hover:text-indigo-600">📁 My Projects</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-600">💰 Payments</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-600">💬 Messages</a></li>
        <li><a href="#" className="text-gray-700 hover:text-indigo-600">⚙️ Settings</a></li>
      </ul>
    </aside>

      
      <main className="flex-1 p-6 bg-[#f5f5f5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">📌 Post a New Job</h2>
          <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg mb-10">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="w-full mb-4 p-2 border rounded" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Job Description" rows={4} className="w-full mb-4 p-2 border rounded" required />
            <input name="budget" value={form.budget} onChange={handleChange} placeholder="Budget" className="w-full mb-4 p-2 border rounded" required />
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Submit</button>
          </form>

          <h3 className="text-2xl font-semibold mb-4">📄 Posted Jobs</h3>
          {jobs.filter(j => filter === "all" || (filter === "open" ? !j.isFilled : j.isFilled)).map(job => (
            <div key={job._id} className="bg-white rounded-lg shadow-md mb-6 p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold">{job.title}</h4>
                <span className="text-green-600 font-bold">₹{job.budget}</span>
              </div>
              <p className="text-gray-600 mb-3">{job.description}</p>
              
              <img src="/images/sample-gig.jpg" alt="gig" className="w-full h-40 object-cover rounded mb-3" />

              <div className="flex gap-2">
                <button onClick={() => handleEditClick(job)} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                <button onClick={() => handleToggleFilled(job._id)} className="bg-indigo-500 text-white px-3 py-1 rounded">
                  {job.isFilled ? "Filled" : "Mark Filled"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {chatUser && (
          <div className="fixed bottom-4 right-4 w-96 bg-white shadow-lg rounded p-4">
            <h4 className="font-bold mb-2">Chat with {chatUser.name}</h4>
            <ChatBox senderId={loggedInUserId} receiverId={chatUser._id} />
          </div>
        )}

        {paymentUser && (
          <PaymentModal
            freelancer={paymentUser}
            onClose={() => setPaymentUser(null)}
          />
        )}
      </main>
    </div>
  );
}

export default ClientDashboard;
