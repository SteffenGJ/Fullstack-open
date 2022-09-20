import { Link } from "react-router-dom";

const Header = ({ user }) => {

  return (
    <div className="">
      <div className="flex justify-evenly items-center bg-blue-200 rounded-lg py-4">
        <Link to={"/"}>Blogs</Link>
        <Link to={"/users"}>Users</Link>
        <p className="text-lg">Hello {user.name}!</p>
        <button
          onClick={() => window.localStorage.clear()}
          className="px-6 py-2 text-white bg-cyan-500 rounded-xl"
        >
                Log out
        </button>
      </div>
    </div>
  );
};

export default Header;