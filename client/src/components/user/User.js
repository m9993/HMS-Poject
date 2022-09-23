import React from 'react'
import {deleteApi, getApi, putApi} from '../../service/index'
import moment from 'moment'
import { toast } from 'react-toastify';
import AddModal from './AddModal';

export default function User(props) {
    const [data, setData] = React.useState([])
    const [inputData, setInputData] = React.useState({})

    React.useEffect(() => {
        loadData()
    }, [])

    const loadData=()=>{
        getApi('/auth/get-all-users')
            .then((data) => {
                setData(data.data);
            })
    }

    const _delete=(id)=>{
        deleteApi(`/auth/remove-user/${id}`)
            .then(data=>{
                if(data.success){
                    toast.success(data.message,{theme: "colored"})
                    loadData()
                }else{
                    toast.error(data.message,{theme: "colored"})
                }
            })
    }

    const edit=(id)=>{
        putApi(`/auth/update-user/${inputData.id}`,inputData)
            .then(data=>{
                if(data.success){
                    toast.success(data.message,{theme: "colored"})
                    loadData()
                }else{
                    toast.error(data.message,{theme: "colored"})
                }
            })
    }
    
  return (
    <>
    <div className='d-flex mb-3'>
        <h3>Users</h3>
        <button type="button" className="btn bg-success mx-2" data-bs-toggle="modal" data-bs-target="#userAddModal">
            <i className="fa-sharp fa-solid fa-plus text-white"></i> 
        </button>
    </div>

    <table className="table">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Added At</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item,index) => (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>
                {item.isActive?
                    <span className='badge text-bg-success'>Active</span>
                    :
                    <span className='badge text-bg-danger'>In Active</span>
                }
                </td>
                <td>
                {item.createdAt?
                    moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')
                    : '-'
                }
                </td>
                <td>
                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#userEditModal" onClick={()=>setInputData(item)}>
                        <i className="fa-sharp fa-solid fa-pen text-warning"></i>
                    </button>

                    <button type="button" className="btn" onClick={()=>_delete(item.id)}>
                        <i className="fa-sharp fa-solid fa-trash text-danger"></i>
                    </button>
                </td>
            </tr>
        ))}
      </tbody>
    </table>

    <AddModal loadData={loadData}/>
    

    {/* EDIT */}
    <div className="modal fade" id="userEditModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <input className="form-control" id="firstName" placeholder='Your first name'
                            value={inputData.firstName}
                            onChange={(e) => setInputData({ ...inputData, firstName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input className="form-control" id="lastName" placeholder='Your last name'
                            value={inputData.lastName}
                            onChange={(e) => setInputData({ ...inputData, lastName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com"
                            value={inputData.email}
                            onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                            defaultChecked={inputData.isActive}
                            onClick={(e) => setInputData({ ...inputData, isActive: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Is Active?</label>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={edit}>Save</button>
                </div>
            </div>
        </div>
    </div>
    {/* EDIT */}

    
    </>
  )
}
