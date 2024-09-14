import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import Swal from 'sweetalert2';

function AddCategory() {
    const [categories, setCategories] = useState([]);



    const deleteCategoryHandler = (categoryId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
    
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert category deletion!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms deletion, send a delete request to the backend
                axios.delete(`/api/categories/${categoryId}`)
                    .then(response => {
                        // If deletion is successful, show success message
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Category has been deleted.",
                            icon: "success"
                        });
                        // You may also want to update the UI to reflect the deletion
                    })
                    .catch(error => {
                        // If deletion fails, show error message
                        swalWithBootstrapButtons.fire({
                            title: "Error",
                            text: "Failed to delete category.",
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // If user cancels deletion, show cancellation message
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Category deletion cancelled.",
                    icon: "info"
                });
            }
        });
    };

    return (
        <section className="table-container">
            <div className="table-wrapper">
                <h1 className="table-title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Category Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <b>{category.title}</b>
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

export default AddCategory;
