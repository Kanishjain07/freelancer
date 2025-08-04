import { useState } from "react";
import axios from "axios";

function GigForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    skills: "",
    image: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/gigs", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      }, {
        headers: { Authorization: token },
      });

      alert("✅ Gig posted!");
      setForm({ title: "", description: "", category: "", price: "", skills: "", image: "" });
    } catch (err) {
      alert("❌ Failed to post gig");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-green-600">📢 Post a New Gig</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Gig Title" className="w-full border p-2 rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Frontend)" className="w-full border p-2 rounded" required />
        <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price (₹)" className="w-full border p-2 rounded" required />
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" className="w-full border p-2 rounded" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Post Gig</button>
      </form>
    </div>
  );
}

export default GigForm;
