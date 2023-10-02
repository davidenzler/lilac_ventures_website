import React, { useState } from 'react';
import{
    BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
    from 'react-icons/bs';
import './AdminView.css'
import DataTable from 'react-data-table-component';
import AdminProgBar from './AdminProgBar'

function AdminView(){
    const columns =[
        {
            name: 'Name',
            selector: (row: { name: any; }) => row.name,
            sortable: true
        },
        {
            name: "Email",
            selector: (row:{ email: any}) => row.email,
            sortable:true
        },
        {
            name:"Phone Number",
            selector:(row:{pNumber: any}) => row.pNumber,
            sortable:true
        },
        {
            name: "Status",
            selector:(row:{status: any}) => row.status,
            sortable:true

        },
    ];

    const data = [
        {
            id: 1,
            name: 'John Smith',
            email:'JohnSmith@email.com',
            pNumber:'123-4567-8901',
            status: 'Done'
        },
        {
            id:2,
            name:'Abby Doe',
            email:'jond@email.com',
            pNumber:'444-888-0987',
            status:"Not Done"
        },
        {
            id:3,
            name: 'Bernie Burns',
            email: 'BB@email.comm',
            pNumber: '916-555-555',
            status:"Done"

        }

    ]
    const [records, setRecords] = useState(data);
    
    function handleFilter(event: { target: { value: string; }; }){
        const newData = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }
    return(
        
        <main className = 'main-container'>
            <div className = 'main-title'>
                <h3>ADMIN DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className = 'card'>
                    <div className='card-inner'>
                        <h3>SEND FILE</h3>
                        <BsFillArchiveFill className = 'card_icon'/>
                    </div>
                    <h3 className = 'send_button'>SEND</h3>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOMER FINISHED?</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>YES</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Customers</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>33</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3> STEP TO FREEDOM CURRENTLY ON</h3>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                    <h1>5</h1>
                </div>

            </div>
            <AdminProgBar />
    
                <div className = 'text-end'><input type="text" onChange = {handleFilter} /></div>
                <DataTable
                    columns = {columns}
                    data = {data}
                    selectableRows
                    fixedHeader
                    pagination
            
                ></DataTable>
    
            
        </main>
    );
}

export default AdminView;