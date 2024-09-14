import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

function CommentsTable() {
    const [participants, setParticipants] = useState([]);

    const { user } = useSelector(state => state.auth);

    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        // Fetch workshops from the backend
        axios.get('http://localhost:8000/api/workshops')
            .then(response => {
                setWorkshops(response.data);
            })
            .catch(error => {
                console.error('Error fetching workshops:', error);
            });
    }, []);
    useEffect(() => {
        console.log(user.token);
        // Fetch workshop participants from the backend
        axios.get('http://localhost:8000/api/workshop-participants', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(response => {
                setParticipants(response.data.participants);
            })
            .catch(error => {
                console.error('Error fetching workshop participants:', error);
            });
    }, []);



    // const deleteCommentHandler = () => {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //         customClass: {
    //             confirmButton: "btn btn-success",
    //             cancelButton: "btn btn-danger"
    //         },
    //         buttonsStyling: true
    //     });

    //     swalWithBootstrapButtons.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert comment!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, delete it!",
    //         cancelButtonText: "No, cancel!",
    //         reverseButtons: true
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             swalWithBootstrapButtons.fire({
    //                 title: "Deleted!",
    //                 text: "Comment has been deleted.",
    //                 icon: "success"
    //             });
    //         } else if (
    //             result.dismiss === Swal.DismissReason.cancel
    //         ) {
    //             swalWithBootstrapButtons.fire({
    //                 title: "Cancelled",
    //                 text: "Comment is safe :)",
    //                 icon: "error"
    //             });
    //         }
    //     });
    // };

    return (
        <section className="table-container">
            <div className="table-wrapper">
                <h1 className="table-title">Workshop Participants</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Image</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img
                                    src={participant.user_id.profilePhoto.url}
                                    alt=""
                                    className='w-[100px] h-[100px] object-cover rounded-t-lg'
                                /></td>
                                <td>{participant.user_id.email}</td>
                                <td>{participant.user_id.username}</td>
                                <td>{participant.payment_status}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <div className="table-wrapper">
                <h1 className="table-title">Workshops</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='w-[00px] h-[10px] object-cover '>Count</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price $</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workshops.map((workshop, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{workshop.workshopName}</td>
                                <td>{workshop.category}</td>
                                <td>{workshop.price}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default CommentsTable;
