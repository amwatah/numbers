import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const Home = () => {
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const addContatsEndPoint = trpc.contacts.addContacts.useMutation();
  const { data: contacts } = trpc.contacts.getContacts.useQuery();
  const deleteContact = trpc.contacts.deleteContact.useMutation();
  function addContact() {
    addContatsEndPoint.mutate({
      name: contactName,
      phone: parseInt(contactPhone),
    });
  }
  return (
    <div className="  flex min-h-screen  w-screen flex-col items-center gap-2">
      <input
        type="text"
        className=" input-primary input w-1/2"
        placeholder=" contact name "
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
      />
      <input
        type="text"
        className=" input-primary input w-1/2"
        placeholder=" contact number "
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
      />
      <button onClick={addContact} className=" btn w-1/2  ">
        ADD
      </button>

      <section className="contacts-list">
        {contacts?.map((contact) => (
          <div
            key={contact.id}
            className=" contact-card  m-2 flex flex-col items-center gap-3 rounded-md p-2 shadow-lg"
          >
            <div className="flex flex-col justify-evenly">
              <p className=" text-lg"> Name:{contact.name}</p>
              <p className=" text-lg"> Phone:{contact.phone}</p>
            </div>
            <button
              onClick={() => {
                deleteContact.mutate({
                  id: contact.id,
                });
              }}
              className="btn-sm btn"
            >
              DELETE
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
