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

      {/* Popular Categories */}
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

      {/* Featured Gigs with Images */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Featured Gigs
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg shadow hover:shadow-lg p-4 transition">
            <img
              src="/images/gig1.jpg"
              alt="Web design gig"
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg mb-1">I will design a stunning website</h3>
            <p className="text-sm text-gray-500">Starting at ₹5000</p>
          </div>

          <div className="border rounded-lg shadow hover:shadow-lg p-4 transition">
            <img
              src="/images/gig2.jpg"
              alt="Graphic design gig"
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg mb-1">I will create custom graphics</h3>
            <p className="text-sm text-gray-500">Starting at ₹3000</p>
          </div>

          <div className="border rounded-lg shadow hover:shadow-lg p-4 transition">
            <img
              src="/images/gig3.jpg"
              alt="Content writing gig"
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg mb-1">I will write SEO blog posts</h3>
            <p className="text-sm text-gray-500">Starting at ₹1500</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-10 px-6 text-center rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-2">📧 Email: support@freelancemarketplace.com</p>
        <p className="text-gray-600">📞 Phone: +91-9876543210</p>
      </section>
    </div>
  );
}

export default Home;
