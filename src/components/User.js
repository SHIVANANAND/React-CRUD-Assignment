import React from "react";
import "./user.css"

const User = function({id, name, email, phone, onDelete, onEdit}) {

    const handleDelete = function() {
        return onDelete(id);
    }

    const handleEdit = function() {
        onEdit({ id, name, email, phone });
    }

    return(
        <div className="list">
            <span>{name}</span>
            <span>{email}</span>
            <span>{phone}</span>
            <span className="actions">
                <button onClick={handleEdit} className="btn-edit">Edit</button>
                <button onClick={handleDelete} className="btn-delete">Delete</button>
            </span>
        </div>
    )
}

export default User