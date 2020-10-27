import React, { Component } from "react";
import Container from "./components/Container/Container";
import ContactList from "./components/ContactList/ContacrList";
import ContactForm from "./components/ContactForm/ContactForm";
import { v4 as uuid } from "uuid";
import Filter from "./components/Filter/Filter";
import notification from "./components/Notification/Notification";
// import { CSSTransition } from "react-transition-group";
// import filters from "./filter.module.css";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: uuid(),
      name,
      number,
      formErrors: {
        name: "",
        number: "",
      },
    };

    const { contacts } = this.state;

    this.setState((prevState) => {
      return {
        contacts: [contact, ...prevState.contacts],
      };
    });

    const sameContact = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (sameContact) {
      notification();
      return;
    }
  };

  getFilter = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const visibleFilter = this.getFilter();

    return (
      <>
        <Container title="PhoneBook">
          <ContactForm addContact={this.addContact} />
        </Container>

        <Container title="Contacts">
          <Filter
            contacts={contacts}
            title="Find"
            value={filter}
            onChangeFilter={this.changeFilter}
          />
          <ContactList
            contacts={visibleFilter}
            removeContact={this.removeContact}
          />
        </Container>
      </>
    );
  }
}
