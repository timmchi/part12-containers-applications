const Person = ({ person }) => {
    // console.log(person)
    return(
    <div>
    {person.name} {person.phone} 
    </div>
    )
};

const Persons = ({ persons, filter, onDelete }) => {
    return (
      persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => {
        return (
        <div key={person.id}>
            <Person key={person.id} person={person} />
            <button onClick={() => onDelete(person.id)}>delete</button>
        </div>
        )
      }
      )
    )
};

export default Persons;