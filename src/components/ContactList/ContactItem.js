import React from "react";
import PropTypes from "prop-types";
import style from "./ContactList.module.css";

export default function ContactItem({ name, number, removeContact, id }) {
  return (
    <li key={id} className={style.item}>
      {name} {number}
      <button
        type="button"
        className={style.button}
        onClick={() => removeContact(id)}
      >
        Delete Contact
      </button>
    </li>
  );
}
ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string,
};
