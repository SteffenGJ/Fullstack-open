import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/hooks";

const CreateNew = (props) => {
    /*const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')*/
    const content = useField("text");
    const inputContent = {type: content.type, value: content.value, onChange: content.onChange};
    const author = useField("text");
    const inputAuthor = {type: author.type, value: author.value, onChange: author.onChange}
    const info = useField("text");
    const inputInfo = {type: info.type, value: info.value, onChange: info.onChange};

    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      props.setNotification(`A new anecdote "${content.value}" was created`);
      setTimeout(() => {
          props.setNotification("")
      }, 5000);
      content.value = "";
      author.value = "";
      info.value = "";
      navigate("/");
    }

    const handleClick = () => {
        content.reset();
        author.reset();
        info.reset();
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' {...inputContent} />
          </div>
          <div>
            author
            <input name='author' {...inputAuthor} />
          </div>
          <div>
            url for more info
            <input name='info' {...inputInfo} />
          </div>
          <button>create</button>
          <button type="button" onClick={handleClick}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew