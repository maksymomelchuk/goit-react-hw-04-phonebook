import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import ContactsList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import { ContactForm } from './Phonebook/ContactForm';

const LS_KEY = 'contact_book';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  const onFormSubmit = (name, number) => {
    contacts.find(el => el.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts([
          {
            id: nanoid(),
            name,
            number,
          },
          ...contacts,
        ]);
  };

  const onFilterUpdate = event => {
    setFilter(event.currentTarget.value);
  };

  const onDeleteContact = event => {
    const filteredContacts = contacts.filter(
      contact => contact.id !== event.target.id
    );
    setContacts(filteredContacts);
  };

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit} />
      {contacts.length !== 0 && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Contacts</h2>
          <Filter value={filter} onChange={onFilterUpdate} />
          <ContactsList
            contactsList={visibleContacts}
            onDelete={onDeleteContact}
          />
        </div>
      )}
    </div>
  );
};
