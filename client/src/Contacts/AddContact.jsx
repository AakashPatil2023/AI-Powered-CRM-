import { useState } from "react"

function AddContact({ onAddContact, onClose}) {
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const handleAddContact = async () => {
        if(!email.trim()) return;

        try {
            const response = await fetch("http://localhost:5000/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email:email,
                    number: number
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }

            const data = await response.json();
            onAddContact(data);
            onClose();

            setEmail("");
            setNumber("");
        } catch (error) {
            console.error("Failed to add Contact", error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">

                <h3 className="text-xl font-semibold mb-5">
                    Add Contact
                </h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Contact
                    </label>

                    <input
                        type="email"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Number
                    </label>

                    <input
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleAddContact}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Confirm
                    </button>

                </div>
            </div>
        </div>
    );
}

export default AddContact;