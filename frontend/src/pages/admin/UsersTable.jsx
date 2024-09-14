import React, { useEffect, useState } from 'react'
// import AdminSideBar from './AdminSideBar'
import "./admin-table1.css";
import "./usersTable.css";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormTable from './FormTable';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const { user } = useSelector(state => state.auth);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [addSection, setAddSection] = useState(false)
    const [editSection, setEditSection] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "",
    })
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user => {
        const roleMatch = roleFilter === 'all' || user.role === roleFilter;
        const searchTermMatch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
        return roleMatch && searchTermMatch;
    });

    const [formDataEdit, setFormDataEdit] = useState({
        username: "",
        email: "",
        role: "",
        _id: ""
    })
    const handleRoleFilter = (e) => {
        setRoleFilter(e.target.value);
    };


    const [dataList, setDataList] = useState([])

    const handleOnChange = (e) => {
        const { value, name } = e.target
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post("http://localhost:8000/api/users", formData)
        console.log(data)
        if (data.data.success) {
            setAddSection(false)
            alert(data.data.message)
            getFetchData()
            setFormData({
                username: "",
                email: "",
                role: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: ""
            })
        }
        getFetchData()
    }



    const getFetchData = async () => {
        const data = await axios.get("http://localhost:8000/")
        console.log(data)
        if (data.data.success) {
            // alert(data.data.message)
            setDataList(data.data.data)
        }
    }

    useEffect(() => {
        getFetchData()
    }, [])
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('Request Payload:', formDataEdit); // Log the formDataEdit object
        axios.put(`http://localhost:8000/api/users/profile/${formDataEdit._id}`, formDataEdit, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(response => {
                console.log('User updated successfully:', response.data);
                toast.success("User updated successfully");
                setEditSection(false);

                getUsers();
            })
            .catch(error => {
                console.error('Error updating user:', error);
                // toast.error("An error occurred while updating the user");
                setEditSection(false);
            });
    };


    const getUsers = () => {
        axios.get('http://localhost:8000/api/users', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                toast.error("An error occurred while fetching users");
            });
    };

    const handleEditOnChange = (e) => {
        const { value, name } = e.target;
        setFormDataEdit((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleEdit = (el) => {
        setFormDataEdit(el)
        setEditSection(true)
    }










    useEffect(() => {
        // Fetch user data from the backend
        axios.get('http://localhost:8000/api/users', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [user]);


    const deleteUserHandler = (userId) => {
        // Check if user is authorized
        if (!user || !user.isAdmin) {
            toast.error("You are not authorized to delete this user");
            return;
        }

        // Display confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Send delete request with authorization token
                axios.delete(`http://localhost:8000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                    .then(response => {
                        console.log("User deleted successfully", response.data);
                        toast.success("User deleted successfully");
                        // Refresh user list
                        setUsers(users.filter(user => user._id !== userId));
                    })
                    .catch(error => {
                        console.error('Error deleting user:', error);
                        toast.error("An error occurred while deleting the user");
                    });
            }
        });
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toDateString();
    };

    return (

        <section className="table-container">

            {
                addSection && (
                    <FormTable
                        handleSubmit={handleSubmit}
                        handleOnChange={handleOnChange}
                        handleClose={() => setAddSection(false)}
                        rest={formData}
                    />
                )

            }
            {
                editSection && (
                    <FormTable
                        handleSubmit={handleUpdate}
                        handleOnChange={handleEditOnChange}
                        handleClose={() => setEditSection(false)}
                        rest={formDataEdit}
                    />
                )
            }
            {/* <AdminSideBar /> */}
            <div className="table-wrapper">
                <h1 className="table-title">Users</h1>
                <div className='searchInp'>
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <select className='filterrole' value={roleFilter} onChange={handleRoleFilter}>
                        <option className='filterrole1' value="all">All Roles</option>
                        <option className='filterrole1' value="trainer">Trainer</option>
                        <option className='filterrole1' value="admin">Admin</option>
                        <option className='filterrole1' value="user">User</option>
                    </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Image</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Register</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user, index) => {
                            // Exclude the user with the specific ID
                            if (user._id === '65ca7f1c33e6cf1bbe1ad075') {
                                return null; // Skip rendering this user
                            }

                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td className="px-4 py-2">
                                        <img
                                            src={user.profilePhoto.url}
                                            alt=""
                                            className='w-[100px] h-[100px] object-cover rounded-t-lg'
                                        />
                                    </td>
                                    <td>
                                        <div className="table-image">
                                            <img src={user.image} className='table-user-image' alt="" />
                                            <span className='table-username'>{user.username}</span>
                                        </div>
                                    </td>
                                    <td>{user.role}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <b>{formatDate(user.createdAt)}</b>
                                    </td>
                                    <td>
                                        <div className="table-button-group">
                                            <button onClick={() => handleEdit(user)}>View User</button>
                                            <button onClick={() => deleteUserHandler(user._id)}>Delete User</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </section>
    )
}

export default UsersTable