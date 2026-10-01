import { useState } from "react";

function ContactIndex() {
  const [contacts, setContact] = useState([
    { id: 1, email: "aakash@gmail.com", number: "123456789" },
    { id: 2, email: "aakash@gmail.com", number: "123456789" },
  ]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between h-32 px-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add Contact
        </button>
      </div>

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
            {contacts.map((contact) => (
                <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{contact.number}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
                        <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button" >Edit</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactIndex;
