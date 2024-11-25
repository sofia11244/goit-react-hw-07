import PropTypes from 'prop-types';
import ContactListItem from './ContactListItem.jsx';
import styles from './component.module.css';
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../redux/contactsSlice"; // contactsSlice'tan eylemi al

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const nameFilter = useSelector(state => state.filters.nameFilter);

    const filteredContacts =contacts.filter(contact => 
        contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );

    // Silme fonksiyonu belki delete işe yaramz
    const handleDelete = (id) => {
        dispatch(deleteContact(id)); 
    };

    return (
        <ul className={styles.list}>
            {filteredContacts.map(({ id, name, number }) => (
                <ContactListItem
                    key={id}
                    id={id}
                    name={name}
                    number={number}
                    onDelete={handleDelete} 
                />
            ))}
        </ul>
    );
};
ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    onDelete: PropTypes.func,
};
export default ContactList;
