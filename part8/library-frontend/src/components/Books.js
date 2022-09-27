import { ALL_BOOKS, BY_GENRE } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [value, setValue] = useState("");
  const genreBooks = useQuery(BY_GENRE, {
    variables: {genre: value}
  });

  if (result.loading || genreBooks.loading) {
    return <div>Loading.........</div>;
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks;
  const genres = genreBooks.data.allBooks;

  const handleClick = (e) => {
    setValue(e.target.value);
  }

  const allGenres = books.flatMap(book => book.genres);
  const uniques = [...new Set(allGenres)];
  
  return (
    <div>
      <h2>books</h2>
      <span>
        {uniques.map(gen => <button key={gen} value={gen} onClick={handleClick}>{gen}</button>)}
        <button value={""} onClick={handleClick}>All</button>
      </span>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {value ? genres.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )) : 
          books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
