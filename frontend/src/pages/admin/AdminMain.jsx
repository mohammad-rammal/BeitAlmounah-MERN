import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddCategoryForm from './AddCategoryForm'
import AddWorkshopForm from './AddWorkshopForm';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Calendar from './Calendar';
import PanelModes from "../../components/mode/PanelModes";

function AdminMain() {
    const { user } = useSelector(state => state.auth);
    const [postCount, setPostCount] = useState(0);
    const [userCount, setUserCount] = useState(20);
    const [categoryCount, setCategoryCount] = useState(0);
    const [workshopCount, setWorkshopCount] = useState(0);

    const userToken = useSelector(state => state.auth.user.token);

    useEffect(() => {
        fetch("http://localhost:8000/api/posts/count")
            .then((res) => res.json())
            .then((data) => setPostCount(data))
            .catch((error) => console.error('Error fetching post count:', error));
    }, []);
    useEffect(() => {
        fetch("http://localhost:8000/api/workshops/count")
            .then((res) => res.json())
            .then((data) => setWorkshopCount(data))
            .catch((error) => console.error('Error fetching post count:', error));
    }, []);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/count', {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setUserCount(response.data);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        if (userToken) {
            fetchUserCount();
        } else {
            console.error('No token found in localStorage');
        }
    }, [userToken]);

    useEffect(() => {
        fetch("http://localhost:8000/api/categories/count")
            .then((res) => res.json())
            .then((data) => setCategoryCount(data))
            .catch((error) => console.error('Error fetching category count:', error));
    }, []);

    return (
        <div className='admin-main'>
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Users</h5>
                    <div className="admin-card-count"> {userCount}</div>
                    <div className="admin-card-link-wrapper">
                        <Link
                            to="/admin-dashboard/users-table"
                            className='admin-card-link'
                        >
                            See all users
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-person"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h5 className="admin-card-title">Products</h5>
                    <div className="admin-card-count">{postCount}</div>
                    <div className="admin-card-link-wrapper">
                        <Link
                            to="/admin-dashboard/posts-table"
                            className='admin-card-link'
                        >
                            See all posts
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-file-post"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h5 className="admin-card-title">Categories</h5>
                    <div className="admin-card-count">
                        {categoryCount}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link
                            to="/admin-dashboard/categories-table"
                            className='admin-card-link'
                        >
                            See all categories
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-tag-fill"></i>
                        </div>
                    </div>
                </div>

                <div className="admin-main-card">
                    <h5 className="admin-card-title">Workshops</h5>
                    <div className="admin-card-count">{workshopCount}</div>
                    <div className="admin-card-link-wrapper">
                        <Link
                            to="/admin-dashboard/comments-table"
                            className='admin-card-link'
                        >
                            See all workshops
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-chat-left-text"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div ><Calendar /></div>
            {/* <AddCategoryForm />
            
            <AddWorkshopForm /> */}

            {
                user?.isAdmin && (
                    <PanelModes />
                )
            }
        </div>
    )
}

export default AdminMain
