import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { StyledContainer, StyledTitle } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = value => {
    setFilter(value);
  };

  const handleSubmit = ({ name, number }) => {
    const id = nanoid();

    const contactExists = contacts.some(contact => contact.name === name);

    if (contactExists) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts(prevContacts => [...prevContacts, { id, name, number }]);
    }
  };

  const handleDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filterContactsList;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <StyledContainer>
      <StyledTitle>Phonebook</StyledTitle>
      <ContactForm addContact={handleSubmit} />
      <StyledTitle>Contacts</StyledTitle>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
    </StyledContainer>
  );
};
