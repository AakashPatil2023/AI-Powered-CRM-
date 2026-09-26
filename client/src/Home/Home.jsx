import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
   

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to CRM
        </h2>

        <p className="text-gray-600 max-w-xl mb-8">
          Manage your tasks easily and keep track of your daily work in one
          simple place.
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </main>
    </div>
  );
}

export default Home;
