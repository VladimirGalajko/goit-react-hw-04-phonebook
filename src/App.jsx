import { GlobalStyle } from 'GlobalStyle';
import ContactList from 'components/ContactList';
import { Container } from 'components/Container/Container.styled';
import FormAddContact from 'components/FormAddContact';
import { nanoid } from 'nanoid';
// import defaultContacts from './contacts.json';

import { useState } from 'react';
import { Filter } from 'components/Filter';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData && JSON.parse(localData).length) {
      setContacts(JSON.parse(localData));
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);



  const addContact = e => {
    const name = e.name;
    const number = e.number;
    if (contacts.some(contact => contact.name === name)) {
      alert(name + 'is alredy in contacts');
      return;
    }
    const newContact = { id: nanoid(), name, number };
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const contactsToShow = () => {
    const checkFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(checkFilter)
    );
  };

  const delContacts = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(el => el.id !== id);
    });
  };
  const changeFilter = e => {
    setFilter(e.target.value.toLowerCase());
  };

  return (
    <Container>
      <h1>Phonebook 📱</h1>
      <FormAddContact onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={{ contacts, filter }} onChange={changeFilter} />
      <div>
        <ContactList contacts={contactsToShow()} onDelete={delContacts} />
      </div>
      <GlobalStyle />
    </Container>
  );
};
