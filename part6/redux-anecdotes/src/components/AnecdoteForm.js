import { connect } from "react-redux";
import {createAnecdotes} from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

    const createAnecdote = async (e) => {
        e.preventDefault();
        const content = e.target.anec.value;
        props.setNotification(`You created "${content}"`, 5);
        e.target.anec.value = "";
        props.createAnecdotes(content);
      }

    return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anec"/></div>
        <button>create</button>
      </form>
    </div>
    )
}

const mapDispatchToProps = {
  createAnecdotes,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);