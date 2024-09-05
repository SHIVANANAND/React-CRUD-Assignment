import React from "react";

const AddUser = function({onAdd}) {

    //handleOnSubmit add the target value to onAdd and reset the form
    const handleOnSubmit = function(event) {
        event.preventDefault();
        onAdd(event.target.name.value, event.target.email.value, event.target.phone.value);
        event.target.name.value = "";
        event.target.email.value = "";
        event.target.phone.value = "";
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit} id="addUser">
                <h2>Add User</h2>
                <input placeholder="Name" name="name" />
                <input placeholder="Email" name="email" />
                <input placeholder="Phone" name="phone" />
                <button onSubmit={handleOnSubmit} className="btn-add">Add</button>
            </form>
        </div>
    )
}

export default AddUser;