import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { FaDollarSign, FaTree } from 'react-icons/fa';
import Swal from 'sweetalert2';

function PostsTable() {
    const [product, setProduct] = useState([]);
    const [showDollar, setShowDollar] = useState(true);
    const { user } = useSelector(state => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        fetchPosts();
    }, []);

    // const fetchPosts = () => {
    //     axios.get('http://localhost:8000/api/posts')
    //         .then(response => {
    //             setProduct(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching posts:', error);
    //         });
    // };

    const fetchPosts = (pageNumber = 1) => {
        axios.get(`http://localhost:8000/api/posts?pageNumber=${pageNumber}`)
            .then(response => {
                setProduct(response.data.posts);
                setTotalPages(response.data.totalPages);
                setCurrentPage(pageNumber);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };
    const handlePageChange = (pageNumber) => {
        fetchPosts(pageNumber);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-item ${currentPage === i ? 'bg-green-500 text-white p-2' : 'bg-gray-300 text-gray-700'} hover:bg-green-600 hover:text-white p-2`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    const deletePostHandler = (postId) => {
        if (!user || !user.isAdmin) {
            toast.error("You are not authorized to delete this post");
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                    .then(response => {
                        console.log("Post deleted successfully", response.data);
                        toast.success("product deleted successfully");
                        fetchPosts();
                    })
                    .catch(error => {
                        console.error('Error deleting post:', error);
                        toast.error("An error occurred while deleting the post");
                    });
            }
        });
    };

    const approvePost = (postId) => {
        axios.put(`http://localhost:8000/api/posts/approve/${postId}`)
            .then(response => {
                console.log("Post approved successfully", response.data);
                toast.success("Product approved successfully");
                fetchPosts();
            })
            .catch(error => {
                console.error('Error approving post:', error);
            });
    };

    const toggleCurrency = () => {
        setShowDollar(prevState => !prevState);
    };

    return (
        <section className="table-container">
            <div className="table-wrapper">
                <h1 className="table-title">Products</h1>
                <button onClick={toggleCurrency} className="my-custom-button bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    {showDollar ? (
                        <>
                            <span>Show in <FaDollarSign className="ml-5" /></span>

                        </>
                    ) : (
                        <>
                            <span>Show in <FaTree className="ml-5" /></span>

                        </>
                    )}
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price {showDollar ? "$" : "LL"}</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((post, index) => (
                            <tr key={post._id} className="bg-gray-100 border-b border-gray-200">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{post.seller}</td>
                                <td className="px-4 py-2">{post.title}</td>
                                <td className="px-4 py-2">{post.Category}</td>
                                <td className="px-4 py-2 max-w-xs break-all">{post.description}</td>
                                <td className="px-4 py-2 w-24 text-center">
                                    {showDollar ? post.price : post.price * 1500}
                                </td>
                                <td className="px-4 py-2">
                                    <img
                                        src={post.image}
                                        alt=""
                                        className='w-[100px] h-[100px] object-cover rounded-t-lg'
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <div className="table-button-group">
                                        {!post.approve[0] === true && (
                                            <button onClick={() => approvePost(post._id)} className="my-custom-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                Approve Post
                                            </button>
                                        )}
                                        <button onClick={() => deletePostHandler(post._id)} className="my-custom-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete Product
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination flex justify-center mt-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`pagination-item ${currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed p-1' : 'bg-green-500 text-white hover:bg-green-600 hover:text-white p-1 '}`}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {renderPagination()}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`pagination-item ${currentPage === totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed p-1' : 'bg-green-500 text-white hover:bg-green-600 hover:text-white p-1'}`}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* <ToastContainer /> */}
        </section>
    );

}

export default PostsTable;
