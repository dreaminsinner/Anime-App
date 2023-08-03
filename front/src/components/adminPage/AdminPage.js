import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../home/Footer';
import SideBar from '../home/SideBar';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios
            .get('http://localhost:8080/adminHome/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data);
                setLoading(false);
            });
    }, []);

    const handleEditUser = (id) => {
        window.location.href = `http://localhost:3000/adminPage/editUser/`+ id;
    };

    const handleDeleteUser = (username) => {
        const token = localStorage.getItem('token');

        axios
            .delete(`http://localhost:8080/adminHome/deleteUser/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setMessage({ text: 'User deleted successfully', color: 'green' });
                setUsers(users.filter(user => user.username !== username));
            })
            .catch((error) => {
                setMessage({ text: error.response.data, color: 'red' });
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col bg-black min-h-screen">
            <div className="bg-black text-white p-8 mx-auto">
                <h1 className="text-3xl font-semibold mb-4 text-center">Admin Page</h1>

            </div>
            {message && (
                <div
                    className={`bg-${message.color}-500 text-white p-2 mx-auto rounded-md`}
                >
                    {message.text}
                </div>
            )}

            <div className="bg-black text-white mx-auto my-auto justify-center items-center">
                <div className="flex ">
                    <Link
                        to="/adminPage/addUser"
                        className="bg-green-600 text-white px-4 py-4 rounded-md"
                    >
                        Add new user
                    </Link>
                </div>
                <table className="table-auto w-full border-collapse border-white border">
                    <thead>
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.username}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.firstName}</td>
                            <td className="border p-2">{user.lastName}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => handleEditUser(user.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.username)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
            <SideBar />
        </div>
    );
};

export default AdminPage;
