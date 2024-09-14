import React from 'react'
import "./usersTable.css"
import { AiOutlineClose } from 'react-icons/ai'

function FormTable({ handleSubmit, handleOnChange, handleClose, rest }) {
    return (
        
        <div className="addContainer" >
            <form onSubmit={handleSubmit}>
                <div className="close-btn" onClick={handleClose} ><AiOutlineClose /></div>
                <div className='imggg'>
                    <img
                        src={rest.profilePhoto.url}
                        alt=""
                        className='w-[150px] h-[150px] object-cover rounded-t-lg'
                    />
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="create-post-upload"
                    />
                </div>

                <label htmlFor="name" >Name : </label>
                <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.username} />

                <label htmlFor="email" >Email : </label>
                <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email} />
                <label htmlFor="text" >Password : </label>
                <input type="password" id="password" name="password" onChange={handleOnChange} value={rest.password} />
                <label htmlFor="text" >Role : </label>
                <input type="text" id="role" name="role" onChange={handleOnChange} value={rest.role} />
                <label htmlFor="text" >First name : </label>
                <input type="text" id="firstName" name="firstName" onChange={handleOnChange} value={rest.firstName} />
                <label htmlFor="text" >Last name : </label>
                <input type="text" id="lastName" name="lastName" onChange={handleOnChange} value={rest.lastName} />
                <label htmlFor="text" >Address : </label>
                <input type="text" id="address" name="address" onChange={handleOnChange} value={rest.address} />
                <label htmlFor="text" >Phone Number : </label>
                <input type="text" id="phoneNumber" name="phoneNumber" onChange={handleOnChange} value={rest.phoneNumber} />



                <button className="btn" >Submit</button>
            </form>
        </div>
    )
}

export default FormTable