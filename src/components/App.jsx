import React from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { StyledContainer, StyledTitle } from './App.styled';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = value => {
    this.setState({ filter: value });
  };

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const id = nanoid();

    const contactExists = contacts.some(contact => contact.name === name);

    contactExists
      ? alert(`${name} is already in contacts.`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { id, name, number }],
        }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = () => {
    const filterContactsList = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return filterContactsList;
  };

  render() {
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();

    return (
      <StyledContainer>
        <StyledTitle>Phonebook</StyledTitle>
        <ContactForm handleSubmit={this.handleSubmit} />
        <StyledTitle>Contacts</StyledTitle>
        <Filter filter={filter} handleChange={this.handleChange} />
        <ContactList contacts={contacts} handleDelete={this.handleDelete} />
      </StyledContainer>
    );
  }
}
