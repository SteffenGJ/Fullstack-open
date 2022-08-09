const PersonForm = ({newName, setNewName, phone, setPhone, handleSubmit}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/><br/>
          phone: <input value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;