// import { usestate } from 'react';
import './adminDash.css';
import {BsFiletypePdf, BsFillPersonFill} from 'react-icons/bs'
import {BiDownArrow, BiUpArrow} from 'react-icons/bi'
import { useEffect, useState } from 'react';
import { getUsersAtStep } from '../services/ProgressService';
import { json } from 'node:stream/consumers';


// need API call when someone uploads new doc and Admin has not seen
// for each step -> gets all users. Checks users to see if anyone has docs not seen by admin
// need clickable link to account

type Props = {
    step: number;
    isNewUpload: boolean;
}

function DropDownEntry(users: any) {
    const entries = users['users'];
    console.log(entries);
    return (
        <ul>
        {
            entries.map( (entry: any) => {
                return (
                    <li className='row'>
                        <p>{entry.email}</p>
                        <p>{entry.firstname}</p>
                        <p>{entry.lastName}</p>
                        <p>Hello</p>
                    </li>
                )
            })
        }
        </ul>
    );
}


function StepsDropDown(users: any) {
    return (
        <div className='stepToggle'>
            <div className="row rowHeader">
                <h3>Username</h3>
                <h3>FirstName</h3>
                <h3>LastName</h3>
                <h3>Something</h3>
            </div>
            {users['users'].length !== 0 && <DropDownEntry users={users['users']} />}
        </div>
    )
}

const ToggleItem = ({step, isNewUpload}: Props) =>  {
    const [toggleThisElement, setToggleThisElement] = useState(false);
    const iconStyles = { display: "inline" };
    const [users, setUsers] = useState({});
    const [customer_count, setCustomer_count] = useState(0); 

    useEffect(() => {
        const getUsers = async() => {
            const response = await getUsersAtStep(step);
            setUsers(response.users);
            setCustomer_count(response.users.length);
        }

        getUsers();
    }, [step]);

    return (
        <>
            <div className='step_header'>
                <h2>Step {step}</h2>
                <div className="adminNotifications">
                    {isNewUpload ? <div className='newUpload'><BsFiletypePdf  style={iconStyles}/></div> : <div></div>}
                    <div className='customerCount'>{customer_count}</div>
                    <button onClick={() => setToggleThisElement((prev) => !prev)}>{toggleThisElement ? <BiUpArrow style={iconStyles}/> : <BiDownArrow style={iconStyles}/>}</button>
                </div>
            </div>
            {toggleThisElement && <StepsDropDown users={users} />}
        </>
    );
}

export default function AdminOverview() {
    const isNewUpload = true;
    const stepsSuccess = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className='overview'>
        {
            stepsSuccess.map((step) => {
                return <ToggleItem step={step} isNewUpload={isNewUpload} />;
            })
        }
        </div>
    )
}