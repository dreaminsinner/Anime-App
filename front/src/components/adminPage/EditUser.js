import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../home/Footer';
import SideBar from '../home/SideBar';

const EditUser = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = window.location.href;
        const id = url.split('/').pop();
        axios
            .get(`http://localhost:8080/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data);
                setUser((prevUser) => ({
                    ...prevUser,
                    ['password']: null,
                }));
                setSelectedRole(response.data.role);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = window.location.href;
        const id = url.split('/').pop();

        const updatedUser = {
            ...user,
            role: selectedRole,
        };

        axios
            .patch(`http://localhost:8080/adminHome/editUser/${id}`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setMessage('Profile updated successfully!');
            })
            .catch((error) => {
                setMessage(error.response.data);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="bg-black text-white p-8 mx-auto">
                <h1 className="text-3xl font-semibold mb-4 ml-96">Edit {user.username}</h1>
                {message && (
                    <div
                        className={`text-white ${
                            message === 'Profile updated successfully!' ? 'ml-40 bg-green-500 w-1/6' : ' ml-40 bg-red-500 w-1/6'
                        } p-2 rounded-md mb-4`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 ml-28">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="p-2 rounded-md bg-gray-800 text-white w-1/6"
                    />
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        className="p-2 rounded-md bg-gray-800 text-white w-1/6"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        className="p-2 rounded-md bg-gray-800 text-white w-1/6"
                    />
                    <label htmlFor="passwordConfirmation">Confirm Password</label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        onChange={handleInputChange}
                        className="p-2 rounded-md bg-gray-800 text-white w-1/6"
                    />
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                        className="p-2 rounded-md bg-gray-800 text-white w-1/6"
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        className="p-2 rounded-md bg-gray-800 text-white w-1/6"
                    />
                    <label htmlFor="birthday">Birthday</label>
                    <input
                        type="date"
                        name="birthday"
                        value={user.birthday}
                        onChange={handleInputChange}
                        className="p-2 rounded-md bg-gray-800 text-white w-1/6"
                    />

                    <label htmlFor="role">Role</label>
                    <select
                        name="role"
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="p-2 rounded-md bg-gray-800 text-white w-1/6"
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md text-white w-1/6">
                        Save Changes
                    </button>
                </form>
            </div>
            <SideBar />
            <Footer />
        </>
    );
};

export default EditUser;
