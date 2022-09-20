import { useState } from "react";
import { login } from "../services/login";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationSlice";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(setNotification(`Logged in as ${user.username}`, 5));
      setUsername("");
      setPassword("");
    } catch (e) {
      dispatch(setNotification("Wrong username or password", 5));
    }
  };

  return (
    <div className="container mx-auto my-15 bg-white h-auto px-7 py-10 rounded-3xl w-fit shadow-lg bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col jutstify-evenly gap-4 mx-auto items-center"
      >
        <p className="font-semibold">Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          className="form-input px-4 py-1 rounded-md border border-black"
        />
        <p className="font-semibold">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          className="form-input px-4 py-1 rounded-md border border-black"
        />
        <br />
        <button
          type="submit"
          id="submit-button"
          className="px-6 py-2 text-white bg-cyan-500 rounded-xl"
        >
                Log in
        </button>
      </form>
    </div>
  );
};

export default Login;