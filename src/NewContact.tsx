import { useState, FC, FormEvent } from "react";
import { contactType } from "./contact.type";

type NewContractTypes = {
  contacts: Array<contactType>;
  callBack: Function;
};

export const NewContact: FC<NewContractTypes> = ({ contacts, callBack }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const indexID = contacts.length - 1;

  const onSubmit = (
    event: FormEvent,
    name: string,
    mobile: string,
    email: string,
    adress: string
  ) => {
    event.preventDefault();
    const newContact: contactType = {
      ID: contacts[indexID].ID + 1,
      InfoID: contacts[indexID].InfoID + 1,
      Info: {
        ID: contacts[indexID].Info.ID + 1,
        DefaultEmailID: contacts[indexID].Info.DefaultEmailID + 1,
        DefaultPhoneID: contacts[indexID].Info.DefaultPhoneID + 1,
        InvoiceAddressID: contacts[indexID].Info.InvoiceAddressID + 1,
        Name: name,
        DefaultPhone: {
          ID: contacts[indexID].Info.DefaultPhoneID + 1,
          BusinessRelationID:
            contacts[indexID].Info.DefaultPhone.BusinessRelationID + 1,
          CountryCode: "+999",
          Description: "",
          Number: mobile,
          Type: "Mobil",
        },
        DefaultEmail: {
          ID: contacts[indexID].Info.DefaultEmail.ID + 1,
          BusinessRelationID:
            contacts[indexID].Info.DefaultEmail.BusinessRelationID + 1,
          Deleted: false,
          Description: null,
          EmailAddress: email,
        },
        InvoiceAddress: {
          ID: contacts[indexID].Info.InvoiceAddress.ID + 1,
          AddressLine1: adress,
          AddressLine2: "",
          AddressLine3: "",
          BusinessRelationID:
            contacts[indexID].Info.InvoiceAddress.BusinessRelationID + 1,
          City: "Andeby",
          Country: "DisneyWorld",
          CountryCode: "DW",
          PostalCode: "341234-A",
          Region: null,
        },
      },
      Comment: "Comment",
    };
    callBack(newContact);
  };

  return (
    <form onSubmit={(e) => onSubmit(e, name, mobile, email, adress)}>
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
  );
};
