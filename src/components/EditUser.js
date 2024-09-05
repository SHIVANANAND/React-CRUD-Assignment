import React, { useState } from "react";

const EditUser = function({ user, onEdit, onCancel }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    const handleSubmit = function(event) {
        event.preventDefault();
        onEdit(user.id, { name, email, phone });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add User</h2>
                <input
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit" className="btn-edit">Save</button>
                <button type="button" onClick={onCancel} className="btn-delete">Cancel</button>
            </form>
        </div>
    );
};

export default EditUser;
