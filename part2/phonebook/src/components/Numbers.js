const Numbers = ({persons, search, deletePerson}) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))
            .map(person => {
                return (
                <div key={person.phone}>
                    <p>{person.name} {person.phone}</p>
                    <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
                </div>
                )
            })}
        </div>
    )
}

export default Numbers;