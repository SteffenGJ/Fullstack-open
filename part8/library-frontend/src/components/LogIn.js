import { LOG_IN } from "../queries";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";


const LogIn = ({show, setUser}) => {
    const [login, result] = useMutation(LOG_IN);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setUser(token);
            window.localStorage.setItem("user", JSON.stringify(token))
        }
    }, [result.data]) // eslint-disable-line

    if (!show) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login({variables: {username, password}})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>Button</button>
        </form>
    )
}

export default LogIn