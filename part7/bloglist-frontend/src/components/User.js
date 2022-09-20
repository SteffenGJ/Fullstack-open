import { useEffect, useState } from "react";
import { getUsers } from "../services/users";
import { Link } from "react-router-dom";

const User = () => {

  const [users, setUsers] = useState();

  useEffect(() => {
    console.log("EFFECT");
    getUsers().then(users => setUsers(users));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Users</h2>
      <table className="border">
        <thead className="underline">
          <tr>
            <td>Users</td>
            <td>Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user =>
            <tr key={user.name}>
              <td className="underline text-blue-500"><Link to={`/users/${user.username}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default User;