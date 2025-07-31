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
      const res = await axios.get("https://freelancer-9826.vercel.app/api/jobs/my-jobs", {
        headers: { Authorization: token },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("❌ Error fetching jobs:", err.message);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://freelancer-9826.vercel.app/api/jobs", form, {
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
      await axios.delete(`https://freelancer-9826.vercel.app/api/jobs/${jobId}`, {
        headers: { Authorization: token },
      });
      alert("✅ Job deleted");
      fetchJobs();
    } catch (err) {
      alert("❌ Failed to delete job");
      console.error(err);
    }
  };

  const handleEditClick = (job) => {
    setEditingJobId(job._id);
    setEditForm({
      title: job.title,
      description: job.description,
      budget: job.budget,
    });
  };

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleToggleFilled = async (jobId) => {
    try {
      await axios.patch(`https://freelancer-9826.vercel.app/api/jobs/${jobId}/toggle-filled`, null, {
        headers: { Authorization: token },
      });
      fetchJobs();
    } catch (err) {
      alert("❌ Failed to update job status");
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://freelancer-9826.vercel.app/api/jobs/${editingJobId}`, editForm, {
        headers: { Authorization: token },
      });
      alert("✅ Job updated");
      setEditingJobId(null);
      fetchJobs();
    } catch (err) {
      alert("❌ Failed to update job");
      console.error(err);
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-8 text-[#404145]">🧾 My Jobs Dashboard</h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-[#404145]">Post New Job</h3>
          <div className="grid grid-cols-1 gap-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Job title" className="border border-gray-300 rounded px-4 py-2" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={4} className="border border-gray-300 rounded px-4 py-2" required />
            <input name="budget" value={form.budget} onChange={handleChange} placeholder="Budget (e.g. 5000)" className="border border-gray-300 rounded px-4 py-2" required />
            <button type="submit" className="bg-emerald-500 text-white rounded py-2 px-4 hover:bg-emerald-600 transition">Post Job</button>
          </div>
        </form>

        <div className="mb-6">
          <label className="font-semibold mr-2">Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded">
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="filled">Filled</option>
          </select>
        </div>

        {jobs
          .filter((job) => {
            if (filter === "open") return job.isFilled === false;
            if (filter === "filled") return job.isFilled === true;
            return true;
          })
          .map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-[#404145]">{job.title}</h3>
                <span className="text-emerald-600 font-bold">₹{job.budget}</span>
              </div>
              <p className="text-gray-600 my-2">{job.description}</p>

              <h4 className="font-semibold mt-4 mb-2">👤 Applicants:</h4>
              {job.applicants && job.applicants.length > 0 ? (
                <ul className="space-y-2">
                  {job.applicants.map((applicant) => (
                    <li key={applicant.userId?._id || Math.random()} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <div>
                        <span className="font-medium text-[#222]">{applicant.userId?.name || "Unknown"}</span>
                        <span className="text-sm text-gray-500"> ({applicant.userId?.email || "N/A"})</span>
                        {applicant.resume && (
                          <a
                            href={`https://freelancer-9826.vercel.app/${applicant.resume}`}
                            className="ml-2 text-blue-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >📎 Resume</a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setChatUser(applicant.userId)} className="bg-emerald-500 text-white px-3 py-1 rounded">💬 Chat</button>
                        <button onClick={() => setPaymentUser(applicant.userId)} className="bg-purple-600 text-white px-3 py-1 rounded">💳 Pay</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">No applicants yet</p>
              )}

              {editingJobId === job._id ? (
                <form onSubmit={handleEditSubmit} className="mt-4 space-y-2">
                  <input name="title" value={editForm.title} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Title" />
                  <textarea name="description" value={editForm.description} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Description" rows={2} />
                  <input name="budget" value={editForm.budget} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Budget" />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">💾 Save</button>
                    <button type="button" onClick={() => setEditingJobId(null)} className="bg-gray-500 text-white px-4 py-1 rounded">❌ Cancel</button>
                    <button onClick={() => handleToggleFilled(job._id)} className={`bg-${job.isFilled ? "gray" : "green"}-600 hover:bg-${job.isFilled ? "gray" : "green"}-700 text-white px-3 py-1 rounded`}>
                      {job.isFilled ? "✅ Filled" : "✔️ Mark Filled"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex gap-3 mt-4">
                  <button onClick={() => handleEditClick(job)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">✏️ Edit</button>
                  <button onClick={() => handleDelete(job._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">🗑️ Delete</button>
                </div>
              )}
            </div>
          ))}

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
      </div>
    </div>
  );
}

export default ClientDashboard;
