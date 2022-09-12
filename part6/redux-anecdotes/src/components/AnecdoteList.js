import { useDispatch, useSelector } from "react-redux";
import { voteOnAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter.searchTerm);
    const dispatch = useDispatch();

    const handleClick = (anecdote) => {
        dispatch(voteOnAnecdote(anecdote));
        dispatch(setNotification(`You voted "${anecdote.content}"`, 5));
    }

    return (
        <div>
            {anecdotes.filter(dote => dote.content.includes(filter)).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleClick(anecdote)}>vote</button>
                </div>
                </div>
            ).sort((a, b) => {
                return a.props.children[1].props.children[1] - b.props.children[1].props.children[1];
            }).reverse()}
        </div>
    )
}

export default AnecdoteList;
