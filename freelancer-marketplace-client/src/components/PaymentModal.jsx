import { useState } from "react";
import axios from "axios";

function PaymentModal({ freelancer, onClose, type = "pay" }) {
  const [form, setForm] = useState({
    name: "",
    upiOrAccount: "",
    amount: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || isNaN(form.amount)) {
      return alert("❌ Enter a valid amount.");
    }

    const token = localStorage.getItem("token");
    if (!token) return alert("❌ You must be logged in");

    try {
      if (type === "pay") {
        // Actually record payment in backend
        await axios.post(
          "https://freelancer-9826.vercel.app/api/payments",
          {
            freelancerId: freelancer._id,
            amount: form.amount,
          },
          {
            headers: { Authorization: token },
          }
        );

        alert(`✅ ₹${form.amount} paid to ${freelancer.name} successfully!`);
      } else {
        // Request Payment mode (freelancer side)
        alert(`📩 Payment request of ₹${form.amount} sent to client (Demo Mode)`);
      }
      onClose();
    } catch (err) {
      console.error("❌ Payment Error:", err);
      alert("❌ Failed to process payment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {type === "pay" ? `Pay ${freelancer.name}` : "Request Payment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={type === "pay" ? "Your Full Name" : "Your Client Name"}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="upiOrAccount"
            value={form.upiOrAccount}
            onChange={handleChange}
            placeholder="UPI ID or Account No."
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {type === "pay" ? "Pay" : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
