import React, { useState, useEffect } from 'react';
import axios from './api/axios'; 
import './AvailableForm.css';
import  useAuth  from './hooks/useAuth';

function UploadedDocuments() {
    const { auth }:any = useAuth();
    //TODO: change the hardcoded values below
    const formNames = ["Personal Finance Snapshot", "Debt Snowball", "Zero-Based Budget"];
    const [currentUser] = useState(auth.user);

    const [availableFiles, setAvailableFiles] = useState<string[]>([]);

    useEffect(() => {
        async function checkFileExistence() {
            const existingFiles: string[] = [];

            for (let form of formNames) {
                const filename = `${form} - ${currentUser}.pdf`;
                try {
                    await axios.get(`/files/${filename}`);
                    existingFiles.push(filename);
                } catch (error) {
                    // File doesn't exist or some other error occurred, handle it appropriately
                }
            }

            setAvailableFiles(existingFiles);
        }

        checkFileExistence();
    }, [currentUser]);

    return (
        <div className='AvailableFormsBody'>
            <h1><u>Uploaded Documents</u></h1>
            <div className="form-container">
                {availableFiles.map(fileName => (
                    <div className='formItem' key={fileName}>
                        {fileName}: 
                        <a 
                            href={`http://localhost:8080/files/${fileName}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className='aAvailableForm'>
                            Download
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UploadedDocuments;
