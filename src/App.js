import React, { useState } from "react";
import './App.css';
import contacts from "./contacts.json";

function App() {
  const [allContacts, setAllContacts] = useState(contacts);
  const [visibleContacts, setVisibleContacts] = useState(allContacts.slice(0, 5));

//FILTRAR CONTACTOS QUE NO SE HAN MOSTRADO 
  const getRandomUnshownContact = () => {
    const NoMostradosContactos = allContacts.filter(contact => !visibleContacts.includes(contact));
    if (NoMostradosContactos.length === 0) {
      return null; 
    }
    const randomIndex = Math.floor(Math.random() * NoMostradosContactos.length);
    return NoMostradosContactos[randomIndex];
  };

  const addRandomContact = () => {
    const newContact = getRandomUnshownContact();
    if (newContact) {
      setVisibleContacts(prevVisibleContact => [...prevVisibleContact, newContact]);
    }
  };

  const sortByProperty = (property) => {
    const sortedContacts = [...visibleContacts].sort((a, b) => {
      if (property === "name") {
        return a[property].localeCompare(b[property]);
      } else if (property === "popularity") {
        return b[property] - a[property];
      }
      return 0;
    });
    setVisibleContacts(sortedContacts);
  };

  const deleteContact = (contactId) => {
    const updatedContacts = visibleContacts.filter(contact => contact.id !== contactId);
    setVisibleContacts(updatedContacts);
  };

  return (
    <div className="App">
      <header className="App-header">

        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>
                <button onClick={() => sortByProperty("name")}>Nombre</button>
              </th>
              <th>
                <button onClick={() => sortByProperty("popularity")}>Popularidad</button>
              </th>
              <th>Ganó un Oscar</th>
              <th>Ganó un Emmy</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {visibleContacts.map(contacto => (
              <tr key={contacto.id}>
                <td>
                  <img src={contacto.pictureUrl} alt={contacto.name} style={{ width: "50px" }} />
                </td>
                <td>{contacto.name}</td>
                <td>{contacto.popularity.toFixed(2)}</td>
                <td>{contacto.wonOscar ? <span>🏆</span> : null}</td>
                <td>{contacto.wonEmmy ? <span>🏆</span> : null}</td>
                <td><button onClick={() => deleteContact(contacto.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRandomContact}>Agregar contacto aleatorio</button>
        
      
      </header>
    </div>
  );
}

export default App;
