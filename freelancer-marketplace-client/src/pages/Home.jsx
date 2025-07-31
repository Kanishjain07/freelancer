import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
          Find the perfect freelance services for your business
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Connect with talented freelancers & clients — fast, secure, and easy.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
          >
            Join as Freelancer
          </Link>
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Hire a Freelancer
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {["Web Dev", "Graphic Design", "SEO", "Content Writing"].map((category) => (
            <div
              key={category}
              className="border rounded-lg p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <span className="text-xl font-semibold text-indigo-600">{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Gigs */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Featured Gigs
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div key={id} className="border rounded-lg shadow hover:shadow-lg p-4 transition">
              <div className="h-40 bg-gray-200 mb-3 rounded" />
              <h3 className="font-semibold text-lg mb-1">I will design a stunning website</h3>
              <p className="text-sm text-gray-500">Starting at ₹5000</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
