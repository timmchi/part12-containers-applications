import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import phonebookService from './services/phones';

const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
      </div>
    )
  }

const App = () => {
    const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [notifType, setNotifType] = useState('notif');

  useEffect(() => {
    phonebookService
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons);
        });
  }, []);

  const addName = e => {
    e.preventDefault();
    const person = {
        name: newName,
        phone: newNumber,
    }

    const foundId = persons.find(existingPerson => existingPerson.name === person.name)?.id;
    if(foundId) {

        // const foundId = persons.find(existingPerson => existingPerson.name === person.name).id;

        if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`))

        phonebookService
                .update(foundId, person)
                .then(updatedPerson => {
                    setPersons(persons.map(person => person.id !== foundId ? person : updatedPerson));
                    setNewName('');
                    setNewNumber('');

                    setMessage(`${updatedPerson.name}'s number was updated`);
                    console.log(notifType);
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
                })
                .catch(err => {
                    setNotifType('error');
                    setMessage(err.response.data.error);
                    setTimeout(() => {
                        setMessage(null);
                        setNotifType('notif');
                    }, 5000);
                })
        return
    }

    phonebookService
        .create(person)
        .then(createdPerson => {
            setPersons(persons.concat(createdPerson));
            setNewName('');
            setNewNumber('');

            setMessage(`${createdPerson.name} was added`);
            console.log(notifType);
            setTimeout(() => {
                setMessage(null);
                }, 5000);
        })
        .catch(err => {
            setNotifType('error');
                    setMessage(err.response.data.error);
                    setTimeout(() => {
                        setMessage(null);
                        setNotifType('notif');
                    }, 5000);
        });
  };

  const handleNameChange = e => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    // console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  const handleFilterChange = e => {
    // console.log(e.target.value);
    setFilter(e.target.value);
  };

  const deletePerson = (id) => {
    // e.preventDefault();

    if(window.confirm(`Delete ${(persons.find(p => p.id === id)).name} ?`))
    phonebookService
        .deleteObj(id)
        .then(data => {
            console.log(`Successfully deleted persin ${data.name}`);
            setPersons(persons.filter(p => p.id !== id ));
            console.log(data);
            setMessage(`${data.name} was deleted`);
            console.log(notifType);
            setTimeout(() => {
                setMessage(null);
                }, 5000);
        })
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={notifType} />

      <Filter value={filter} onChange={handleFilterChange} />
      
      <h2>Add a new</h2>

      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons filter={filter} persons={persons} onDelete={deletePerson} />
      <Footer />
    </div>
  )
}

export default App
