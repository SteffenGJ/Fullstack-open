import { useState, useEffect } from 'react'
import Numbers from './components/Numbers';
import PersonForm from './components/PersonForm';
import Search from './components/Search';
import personActions from './services/persons';
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = e => {
    e.preventDefault();
    if (persons.map(person => person.name).includes(newName)) {
    personActions.replace(
      persons.filter(person => person.name === newName), {name: newName, phone: phone})
      .catch(err => {
        setErrorMessage(`Information about ${newName} has already been deleted`)
        setTimeout(() => {
          setErrorMessage("")
        }, 5000)
      })
    } else {
    setPersons(prev => [...prev, {name: newName, phone: phone}]);
    
    personActions.create({name: newName, phone: phone})

    setErrorMessage(`${newName} was added to contacts`)

    setTimeout(() => {
        setErrorMessage("")}
      , 5000)
    }
    setNewName("");
    setPhone("");
  }

  useEffect(() => {
    console.log("Effect");
    personActions.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Search search={search} setSearch={setSearch}/>
      <h2>Add new contact</h2>
      <PersonForm newName={newName} setNewName={setNewName} phone={phone} setPhone={setPhone} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} search={search} deletePerson={personActions.deletePerson}/>
    </div>
  )
}

export default App;