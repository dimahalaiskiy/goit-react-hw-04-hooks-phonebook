import React, { useState, useEffect } from 'react';
import Title from './Components/Title';
import Phonebook from './Components/PhoneBookField';
import Contacts from './Components/Contacts';
import FilterContactsInput from './Components/FilterContactsInput';
import { Container } from './Components/Title/Title.styled';
import keyGenerator from 'keygenerator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const [contacts, setContacts] = useState([]);
	const [filter, setFilter] = useState('');

	const STORAGE = 'contact';

	useEffect(() => {
		let contactsData = JSON.parse(localStorage.getItem(STORAGE));
		if (contactsData) {
			setContacts(JSON.parse(localStorage.getItem(STORAGE)));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE, JSON.stringify(contacts));
	}, [contacts]);

	const setContactName = (e, name, number) => {
		e.preventDefault();

		let isUniq = contacts?.filter((contact) =>
			contact.name.toLowerCase().includes(name.toLowerCase())
		);
		if (isUniq.length !== 0) {
			toast('Контакт с таким именем уже существует!');
			return;
		}

		setContacts([...contacts, { id: keyGenerator.password(), name, number }]);
	};

	const setFilteredContact = (e) => {
		const { value } = e.target;

		setFilter(value);
	};

	const deleteContact = (contactName) => {
		setContacts(contacts.filter((contact) => contact.id !== contactName.id));
	};

	const filteredContacts = () => {
		return contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));
	};

	return (
		<Container>
			<Title title='Phonebook'>
				<Phonebook addContact={setContactName} contacts={contacts} />
			</Title>
			<Title title='Contacts'></Title>
			<FilterContactsInput setFilter={setFilteredContact} filteredValue={filter} />
			<Contacts filteredContacts={filteredContacts()} deleteContact={deleteContact} />
			<ToastContainer />
		</Container>
	);
};

export default App;
