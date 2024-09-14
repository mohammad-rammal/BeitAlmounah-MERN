import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CategoriesTable() {
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        // Fetch categories from the backend API
        axios.get('http://localhost:8000/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const deleteCategoryHandler = (categoryId) => {
        // Check if user is authorized
        if (!user || !user.isAdmin) {
            toast.error("You are not authorized to delete this Category");
            return;
        }

        // Display confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Category!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Send delete request with authorization token
                axios.delete(`http://localhost:8000/api/Categories/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                    .then(response => {
                        console.log("Category deleted successfully", response.data);
                        toast.success("Category deleted successfully");
                        // Refresh user list
                        setUsers(users.filter(user => user._id !== categoryId));
                    })
                    .catch(error => {
                        console.error('Error deleting Category:', error);
                        toast.error("An error occurred while deleting the Category");
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
            <div className="table-wrapper">
                <h1 className="table-title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Image</th>
                            <th>Category Title</th>
                            <th>Category Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={category.image}
                                        alt=""
                                        className='w-[100px] h-[100px] object-cover rounded-t-lg'
                                    />
                                </td>
                                <td>
                                    <b>{category.name}</b>
                                </td>
                                <td>
                                    <b>{formatDate(category.createdAt)}</b>
                                </td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={() => deleteCategoryHandler(category._id)}>
                                            Delete Category
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default CategoriesTable;
