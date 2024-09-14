import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import the useSelector hook

function AddCategoryForm() {
    const [title, setTitle] = useState("");
    const userToken = useSelector(state => state.auth.user.token); // Get the user token from Redux state
    const [file, setFile] = useState(null);
    // Form Submit Handler
    const formSubmitHandler = async (e) => {
        e.preventDefault();

        if (title.trim() === "") {
            return toast.error("Category Title is required");
        }

        try {
            // Send POST request to create category with authorization header
            await axios.post("http://localhost:8000/api/categories", { title }, {
                headers: {
                    Authorization: `Bearer ${userToken}` // Include the user token in the request headers
                }
            });
            toast.success("Category created successfully");
            setTitle(""); // Clear the title input field after successful creation
        } catch (error) {
            console.error("Error creating category:", error);
            if (error.response) {
                toast.error(error.response.data.message || "Failed to create category. Please try again.");
            } else if (error.request) {
                toast.error("No response received from the server. Please try again later.");
            } else {
                toast.error("An error occurred while creating the category. Please try again later.");
            }
        }
    };

    return (
        <div className="add-category">
            <h6 className="add-category-title">Add New Category</h6>
            <form onSubmit={formSubmitHandler}>
                <div className="add-category-form-group">
                    <label htmlFor="title">Category Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Category Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="create-post-upload"
                        onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <button className="add-category-btn" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddCategoryForm;
