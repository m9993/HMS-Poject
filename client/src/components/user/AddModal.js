import React from 'react'
import { toast } from 'react-toastify';
import { postApi } from '../../service';

export default function AddModal(props) {
    const [inputData, setInputData] = React.useState({})
    const add=()=>{
        postApi('/auth/register',inputData)
            .then(data=>{
                if(data.success){
                    setInputData({})
                    toast.success(data.message,{theme: "colored"})
                    props.loadData()
                }else{
                    toast.error(data.message,{theme: "colored"})
                }

            })
    }
    return (
        <>
        <div className="modal fade" id="userAddModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input className="form-control" id="firstName" placeholder='Your first name'
                                onChange={(e)=> setInputData({...inputData, firstName:e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input className="form-control" id="lastName" placeholder='Your last name'
                                onChange={(e)=> setInputData({...inputData, lastName:e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" 
                                onChange={(e)=> setInputData({...inputData, email:e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={add}>Add</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
