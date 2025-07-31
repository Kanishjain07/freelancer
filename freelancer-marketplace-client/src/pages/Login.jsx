import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "axios";
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

 const onSubmit = async (data) => {
  try {
    const res = await axios.post("https://freelancer-9826.vercel.app/api/login", data);

    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/dashboard";
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("❌ Invalid email or password");
  }
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-white px-4">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-gray-100 p-6 rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {/* Email Field */}
      <InputField
        label="Email"
        name="email"
        type="text"
        placeholder="you@example.com"
        register={register}
        error={errors.email}
      />

      {/* Password Field */}
      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        register={register}
        error={errors.password}
      />

      {/* Submit Button */}
      <Button text="Login" />
    </form>
  </div>
);


}

export default Login;
