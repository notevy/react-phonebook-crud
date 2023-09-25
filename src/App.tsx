import { useState, useEffect } from "react";
import "./App.css";
import { mockData } from "./assets/mockData";
import styled from "styled-components";
import { ContactDetails } from "./ContactDetails";
import { contactType } from "./contact.type";
import { NewContact } from "./NewContact";

const ContactCard = styled.div`
  background: transparent;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 2px 2px rgba(170, 170, 170, 0.5);
  color: #000000;
  margin: 2em 1em;
  padding: 1em 10em;
  &:focus,
  &:hover {
    box-shadow: 0px 0px 5px 5px rgba(170, 170, 170, 0.5);
    background-color: #eae8e8c5;
  }
`;

const App = () => {
  const [contacts, setContacts] = useState(mockData);
  const [showDetail, setShowDetail] = useState(false);
  const [showNewContact, setShowNewContact] = useState(false);
  const [contactID, setContactID] = useState<contactType>(mockData[0]);
  const [filteredList, setFilteredList] = useState(contacts);

  const onClick = (e: contactType) => {
    setShowDetail(true);
    console.log(e);
    setContactID(e);
    // setShowDetail(!showDetail);
  };

  const onClickBackButton = () => {
    setShowDetail(false);
  };

  const onClickDeleteButton = (value: number) => {
    setShowDetail(false);
    setContacts((contacts) => {
      return contacts.filter((id) => id.ID !== value);
    });
  };

  const onClickNewContactButton = () => {
    setShowNewContact(true);
  };

  const callBackNewContact = (newContactData: contactType) => {
    setContacts((array) => [...array, newContactData]);
  };

  const callBackEditiContact = () => {
    setContacts([...contacts]);
  };

  useEffect(() => {
    setFilteredList(contacts);
  }, [contacts]);

  const filterBySearch = (event: any) => {
    const query = event.target.value;

    var updatedList = [...contacts];

    updatedList = updatedList.filter((item) => {
      return item.Info.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };

  return (
    <>
      {!showDetail && (
        <div>
          <input placeholder="Søk på navn" onChange={filterBySearch} />
          {filteredList.map((e, i) => (
            <ContactCard key={i} onClick={() => onClick(e)} tabIndex={0}>
              <p>{e.Info.Name}</p>
              <p>{e.Info.DefaultPhone.Number}</p>
              <p>{e.Info.DefaultEmail.EmailAddress}</p>
            </ContactCard>
          ))}
          <button onClick={onClickNewContactButton}>Ny kontakt</button>
        </div>
      )}
      {showDetail && (
        <div>
          <ContactDetails contact={contactID} callBack={callBackEditiContact} />
          <button onClick={onClickBackButton}>Tilbake</button>

          <button onClick={() => onClickDeleteButton(contactID.ID)}>
            Slett kontakt
          </button>
        </div>
      )}
      {showNewContact && (
        <NewContact contacts={contacts} callBack={callBackNewContact} />
      )}
    </>
  );
};

export default App;
