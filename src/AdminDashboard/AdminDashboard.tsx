import React, { useEffect, useState } from 'react';
import './adminDash.css';
import axios from '../api/axios';
import {BsFiletypePdf, BsFillPersonFill} from 'react-icons/bs';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi';
import { getUsersAtStep } from '../services/ProgressService';
import { getPDFUploads, deletePDFUpload } from '../services/pdfUploadsService';

type Props = {
    step: number;
    isNewUpload: boolean;
}

type UploadStatus = {
    [key: number]: boolean;
};

function DropDownEntry({users, pdfs}: {users: any, pdfs: string[]}) {
    return (
        <>
        <tbody className='listBody'>
            {
                users.map((entry: any) => {
                    return (
                        <tr>
                            <td>{entry.email}</td>
                            <td>{entry.firstName}</td>
                            <td>{entry.lastName}</td>
                        </tr>
                    )
                })
            }
        </tbody>
        {
            pdfs.length > 0 && (
                <div className="newUploads">
                    <h3>New Uploads:</h3>
                    <ul>
                    {
                        pdfs.map(pdfName => (
                            <li>
                                <a href={`http://localhost:8080/files/${pdfName}`} target="_blank" rel="noopener noreferrer" onClick={async () => {
                                    const fileId = await getFileIdFromName(pdfName);
                                    if (fileId) {
                                        await setAdminViewedStatus(fileId);
                                    }
                                    await deletePDFUpload(pdfName);
                                }}>{pdfName}</a>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            )
        }
        </>
    );
}

function StepsDropDown({users, pdfs}: {users: any, pdfs: string[]}) {
    return (
        <table className='stepToggle'>
            <thead className="rowHeader">
                <tr>
                    <th>Username</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                </tr>
            </thead>
            {users.length !== 0 && <DropDownEntry users={users} pdfs={pdfs} />}
        </table>
    )
}

const ToggleItem = ({step, isNewUpload}: Props) =>  {
    const [toggleThisElement, setToggleThisElement] = useState(false);
    const iconStyles = { display: "inline" };
    const [users, setUsers] = useState([]);
    const [pdfs, setPdfs] = useState<string[]>([]);
    const [customer_count, setCustomer_count] = useState(0); 

    useEffect(() => {
        const fetchData = async() => {
            const userResponse = await getUsersAtStep(step);
            setUsers(userResponse.users);
            setCustomer_count(userResponse.users.length);
            
            const pdfUploads = await getPDFUploads(step.toString());
            setPdfs(pdfUploads.map((upload: any) => upload.pdf_name)); 
        }

        fetchData();
    }, [step]);

    return (
        <tr>
            <div className='step_header'>
                <h2>Step {step}</h2>
                <div className="adminNotifications">
                    {isNewUpload ? <div className='newUpload'><BsFiletypePdf  style={iconStyles}/></div> : <div></div>}
                    <div className='customerCount'>{customer_count}</div>
                    <button onClick={() => setToggleThisElement((prev) => !prev)}>{toggleThisElement ? <BiUpArrow style={iconStyles}/> : <BiDownArrow style={iconStyles}/>}</button>
                </div>
            </div>
            {toggleThisElement && <StepsDropDown users={users} pdfs={pdfs} />}
        </tr>
    );
}

const getFileIdFromName = async (filename: string) => {
    try {
        const response = await axios.get(`files/getFileId/${filename}`);
        return response.data.fileId; 
    } catch (error) {
        console.error(`Error fetching fileId for filename ${filename}:`, error);
        return null;
    }
};

const setAdminViewedStatus = async (fileId: string) => {
    try {
        await axios.put(`files/pdfModel/${fileId}/true`);
    } catch (error) {
        console.error(`Error setting seenByAdmin for fileId ${fileId}:`, error);
    }
};

export default function AdminOverview() {
    const [stepsUploadStatus, setStepsUploadStatus] = useState<UploadStatus>({});
    const stepsSuccess = [1, 2, 3, 4, 5, 6, 7];

    useEffect(() => {
        const fetchNewUploads = async () => {
            const status: any = {};
            for (const step of stepsSuccess) {
                const uploads = await getPDFUploads(step.toString());
                status[step] = uploads && uploads.length > 0; 
            }
            setStepsUploadStatus(status);
        }
        fetchNewUploads();
    }, []);

    return (
        <table className='overview'>
        {
            stepsSuccess.map((step) => {
                return <ToggleItem step={step} isNewUpload={stepsUploadStatus[step] || false} />;
            })
        }
        </table>
    );
}
