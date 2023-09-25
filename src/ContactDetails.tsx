import { useState, FC, FormEvent } from "react";
import styled from "styled-components";
import { contactType } from "./contact.type";

const ContactCard = styled.div`
  background: transparent;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 2px 2px rgba(170, 170, 170, 0.5);
  color: #000000;
  margin: 2em 1em;
  padding: 1em 10em;
`;

type ContactDetailProps = {
  contact: contactType;
  callBack: Function;
};

export const ContactDetails: FC<ContactDetailProps> = ({
  contact,
  callBack,
}) => {
  const [name, setName] = useState(contact.Info.Name);
  const [mobile, setMobile] = useState(contact.Info.DefaultPhone.Number);
  const [email, setEmail] = useState(contact.Info.DefaultEmail.EmailAddress);
  const [adress, setAdress] = useState(
    contact.Info.InvoiceAddress.AddressLine1
  );
  const [editing, setEditing] = useState(false);

  const onClickEdit = () => {
    setEditing(true);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    contact.Info.Name = name;
    contact.Info.DefaultPhone.Number = mobile;
    contact.Info.DefaultEmail.EmailAddress = email;
    contact.Info.InvoiceAddress.AddressLine1 = adress;
    callBack(contact);
  };

  return (
    <>
      {!editing && (
        <ContactCard tabIndex={0}>
          <p>{contact.Info.Name}</p>
          <p>{contact.Info.DefaultPhone.Number}</p>
          <p>{contact.Info.DefaultEmail.EmailAddress}</p>
          <p>{contact.Info.InvoiceAddress.AddressLine1}</p>
        </ContactCard>
      )}
      <button onClick={() => onClickEdit()}>Rediger kontakt</button>
      {editing && (
        <ContactCard>
          <form onSubmit={(e) => onSubmit(e)}>
            <label>
              Navn
              <input
                type="text"
                value={name}
                placeholder="Navn"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Telefon/Mobil
              <input
                type="text"
                value={mobile}
                placeholder="Mobil"
                onChange={(e) => setMobile(e.target.value)}
              />
            </label>
            <label>
              E-post
              <input
                type="text"
                value={email}
                placeholder="E-post"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Addresse
              <input
                type="text"
                value={adress}
                placeholder="Addresse"
                onChange={(e) => setAdress(e.target.value)}
              />
            </label>
            <input type="submit" />
          </form>
        </ContactCard>
      )}
    </>
  );
};
