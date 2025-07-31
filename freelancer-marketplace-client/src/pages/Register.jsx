import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "axios";

// Zod validation schema
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["client", "freelancer"], {
    required_error: "Role is required",
  }),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Submitted data:", data); // 🐞 Debug

    try {
      const res = await axios.post("http://localhost:5000/api/register", data);
      alert("✅ Registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-100 p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <InputField
          label="Name"
          name="name"
          register={register}
          error={errors.name}
          placeholder="John Doe"
        />

        <InputField
          label="Email"
          name="email"
          register={register}
          error={errors.email}
          placeholder="you@example.com"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="••••••••"
        />

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Role</label>
          <select
            {...register("role")}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">-- Choose Role --</option>
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <Button text="Register" />
      </form>
    </div>
  );
}

export default Register;
