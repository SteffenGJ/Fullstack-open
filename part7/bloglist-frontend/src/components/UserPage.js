import { getUsers } from "../services/users";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UserPage = () => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log("IAKFKEF");
    getUsers().then(users => setUsers(users));
  }, []);

  const name = useParams().name;


  const user = users && users.find(user => user.username === name);
  console.log(users);
  console.log(user);


  return (
    <div>
      <h2 className="text-xl font-semibold">{user && user.name} - {user && user.username}</h2>
      <ul className="border">
        {user && user.blogs.map(blog => <li className="border" key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

export default UserPage;