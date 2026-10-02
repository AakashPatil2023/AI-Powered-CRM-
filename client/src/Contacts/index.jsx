import { useEffect, useState } from "react";
import AddContact  from "./AddContact";

function Index() {
  const [showAddContact, setShowAddContact] = useState(false);
  const [Contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contacts");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setContacts(
          Array.isArray(data)
            ? data.map((Contact) => ({
                ...Contact,
                id: Contact._id || Contact.id,
              }))
            : [],
        );
      } catch (error) {
        console.error("Failed to fetch contacts", error);
      }
    };

    fetchContact();
  }, []);

  const addNewContact = (newContact) => {
    const contactToAdd = {
      ...newContact, id: newContact._id || newContact.id,
    };

    setContacts((prevContact) => [...prevContact, contactToAdd]);
    setShowAddContact(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between h-32 px-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <button
          onClick={() => setShowAddContact(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Contact
        </button>
      </div>

      {showAddContact && <AddContact onAddContact={addNewContact} onClose={() => setShowAddContact(false)} />}

      <table className="w-full mt-4 border-collapse border text-center border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Number
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
            {Contacts.map((contact) => (
          <tr key={contact.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
            <td className="border border-gray-300 px-4 py-2">{contact.number}</td>

            <td className="border border-gray-300 px-4 py-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                Delete
              </button>
              <button
                data-dialog-target="modal-xl"
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
              >
                Edit
              </button>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
