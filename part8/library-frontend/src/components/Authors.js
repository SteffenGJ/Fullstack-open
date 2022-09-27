import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS } from "../queries";
import { SET_BIRTH } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("")

  const result = useQuery(ALL_AUTHORS);
  const [ setBirth ] = useMutation(SET_BIRTH, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors;

  const handleSubmit = (e) => {
    e.preventDefault();

    setBirth({variables: {name: name, setBornTo: Number(year)}})

    setName("");
    setYear("");
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result && authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={handleSubmit}>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          <option>-- Select Author --</option>
          {result && authors.map(auth => <option key={auth.name} value={auth.name}>{auth.name}</option>)}
        </select>
        <input placeholder="Birth year..." type="number" value={year} onChange={(e) => setYear(e.target.value)}/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Authors
