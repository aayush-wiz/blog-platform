import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Blog Platform
        </Link>
        <div className="space-x-4">
          <Link to="/posts" className="text-white hover:underline">
            Posts
          </Link>
          {token ? (
            <>
              <Link to="/create-post" className="text-white hover:underline">
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-white hover:underline">
                Signup
              </Link>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
