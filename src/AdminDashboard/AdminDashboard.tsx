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
        <div>
            <ul>
            {
                users.map((entry: any) => {
                    return (
                        <li className='row'>
                            <p>{entry.email}</p>
                            <p>{entry.firstName}</p>
                            <p>{entry.lastName}</p>
                            <p>Hello</p>
                        </li>
                    )
                })
            }
            </ul>
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
        </div>
    );
}

function StepsDropDown({users, pdfs}: {users: any, pdfs: string[]}) {
    return (
        <div className='stepToggle'>
            <div className="row rowHeader">
                <h3>Username</h3>
                <h3>FirstName</h3>
                <h3>LastName</h3>
                <h3>Something</h3>
            </div>
            {users.length !== 0 && <DropDownEntry users={users} pdfs={pdfs} />}
        </div>
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
        <>
            <div className='step_header'>
                <h2>Step {step}</h2>
                <div className="adminNotifications">
                    {isNewUpload ? <div className='newUpload'><BsFiletypePdf  style={iconStyles}/></div> : <div></div>}
                    <div className='customerCount'>{customer_count}</div>
                    <button onClick={() => setToggleThisElement((prev) => !prev)}>{toggleThisElement ? <BiUpArrow style={iconStyles}/> : <BiDownArrow style={iconStyles}/>}</button>
                </div>
            </div>
            {toggleThisElement && <StepsDropDown users={users} pdfs={pdfs} />}
        </>
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
        <div className='overview'>
        {
            stepsSuccess.map((step) => {
                return <ToggleItem step={step} isNewUpload={stepsUploadStatus[step] || false} />;
            })
        }
        </div>
    );
}
