import React from "react";
import css from "./Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, getContactForEdit } from "../../redux/PhonebookSelector";
import { addContact, editContact } from "../../redux/PhonebookOperation";

export default function Form() {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const { name, phone } = contact;
  const contactForEdit = useSelector(getContactForEdit);

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (
      items.some(
        (item) => item.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert("Контакт с таким именем уже существует!");
      setContact({ ...contact, name: "" });
    } else {
      contactForEdit
        ? dispatch(editContact(contact))
        : dispatch(addContact(contact));
      setContact({ name: "", number: "" });
    }
  };

  useEffect(() => {
    contactForEdit
      ? setContact(contactForEdit)
      : setContact({ name: "", phone: "" });
  }, [contactForEdit]);
  return (
    <form onSubmit={onHandleSubmit} className={css.form} action="">
      <div>
        <label className={css.label} htmlFor="name">
        <span className={css.span}>Name</span>
        
        <input
        className={css.input}
          onChange={onInputChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        </label>
        <label className={css.label} htmlFor="number">
        <span className={css.span}>Number</span>
        
        <input
        className={css.input}
          onChange={onInputChange}
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        </label>
        </div>
        <button className={css.btn} type="submit">
          ДОБАВИТЬ КОНТАКТ
        </button>
      </form>
  );
}
