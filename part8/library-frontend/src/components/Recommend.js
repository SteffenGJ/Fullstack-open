import { useQuery } from "@apollo/client";
import { BY_GENRE } from "../queries";

const Recommend = ({show, me}) => {
    const genreBooks = useQuery(BY_GENRE, {
        variables: {genre: me && me.favoriteGenre}
      });

    if (!show) {
        return null
    }

    if (genreBooks.loading) {
        return <div>LOADINg.....</div>
    }

    const genre = genreBooks.data.allBooks;

    return (
        <div>
            <p>Hello {me && me.username}! Here are our recommendations for you:</p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {genre.map(a => (
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

export default Recommend;