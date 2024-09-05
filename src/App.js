import React, { useEffect, useState } from 'react';
import User from "./components/User.js";
import AddUser from "./components/AddUser.js";
import EditUser from "./components/EditUser.js";
import './app.css';

const App = function() {

    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // Track the user being edited
    useEffect(function() {
        fetchData();
    }, [])

    //R of CRUD
    const fetchData = async function() {
        await fetch('https://jsonplaceholder.typicode.com/users')
        .then(function(res) { return res.json() })
        .then(function(data) { return setUsers(data) })
        .catch(function(err) { console.log(err) });
    }

    //C of CRUD
    const onAdd = async function(name, email, phone) {
        await fetch('https://jsonplaceholder.typicode.com/users', {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(function(res) { 
            if(res.status !== 201) return;
            return res.json()
        })
        .then(function(data) {    
            return setUsers((users) => [...users, data]);
        })
        .catch(function(err) { console.log(err) });
    }

    //D of CRUD
    const onDelete = async function(id) {
        await fetch('https://jsonplaceholder.typicode.com/users/' + id, {
            method: "DELETE"
        })
        .then(function(res) { 
            if(res.status !== 200) return;
            return setUsers(users.filter((user) => {return user.id !== id}));
        })
        .catch(function(err) { console.log(err) });
    }

    //U of CRUD
    const onEdit = async function(id, updatedUser) {
        await fetch("https://jsonplaceholder.typicode.com/users/" + id, {
            method: "PUT",
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(function(res) { 
            if (res.status !== 200) return;
            return res.json();
        })
        .then(function(data) {    
            setUsers(users.map((user) => (user.id === id ? data : user)));
            setEditingUser(null); // Close the edit form after saving
        })
        .catch(function(err) { console.log(err) });
    }

    // Start editing a user
    const startEdit = (user) => {
        setEditingUser(user);
    }

    return (
        <div className="App">
            <h1>React CRUD Application</h1>
            <AddUser onAdd = {onAdd} />

            {editingUser && (
                <EditUser
                    user={editingUser}
                    onEdit={onEdit}
                    onCancel={() => setEditingUser(null)} // Cancel editing
                />
            )}

            <hr />
            <div>
                {
                    users.map(function(user) {
                        return (
                            <User
                                id={user.id}
                                name = {user.name}
                                email = {user.email}
                                phone = {user.phone}
                                onDelete = {onDelete}
                                onEdit={startEdit} 
                            />
                        )
                    })
                }
            </div>
            <footer>
                <p>© Shivan Anand {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}

export default App;