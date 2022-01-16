import css from "./ContactList.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getFilteredContactsMemo,
} from "../../redux/PhonebookSelector";
import { getContacts } from "../../redux/PhonebookOperation";
import { removeContact } from "../../redux/PhonebookOperation";
import { editOnClick } from "../../redux/PhonebookSlicer";

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(getFilteredContactsMemo);
  const deleteContact = (id) => dispatch(removeContact(id));

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <ul className={css.contactlist}>
      {filteredContacts.map(({ id, name, phone }) => 
      name ? (
        <li className={css.item} key={id}>
          <p className={css.name}>{name}:</p>
          <p className={css.number}>{phone}</p>
          <button
            onClick={() => deleteContact(id)}
            className={css.btn}
            type="button"
          >
            СТЕРЕТЬ НАХЕР
          </button>
          <button
              className={css.btn}
              onClick={() => dispatch(editOnClick({ id, name, phone }))}
            >
              ЕДИТ 
            </button>
        </li>
      ) : null)}
    </ul>
  );
}
