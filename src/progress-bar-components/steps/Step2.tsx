import React, { useState, useEffect } from "react";
import axios from '../../api/axios';
import { AxiosError } from 'axios';


import PdfUpload from "../../PdfUpload";
import "../../ProgressBar.css";

interface FormProps {
    name: string;
    onUploadSuccess: () => void;
    currentUser: string; // Prop for receiving the current user
}

const Form: React.FC<FormProps> = ({ name, onUploadSuccess, currentUser }) => {
    const [showUpload, setShowUpload] = useState(false);
    const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    useEffect(() => {
        const filename = `${name} - ${currentUser}.pdf`;
        checkFileExists(filename).then(exists => {
            if (exists) {
                setIsUploadSuccessful(true);
                setUploadedFileName(filename);
            }
        });
    }, [currentUser]);

    const handleClick = () => {
        setShowUpload(true);
    };

    const handleUploadSuccess = (filename: string) => {
        setIsUploadSuccessful(true);
        setShowUpload(false);
        setUploadedFileName(filename);
        onUploadSuccess();
    };

    const handleResubmit = () => {
        setIsUploadSuccessful(false);
        setShowUpload(true);
    };

    const checkFileExists = async (filename: string) => {
        try {
            await axios.get(`/files/${filename}`);
            return true; // File exists
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 404) {
                return false; // File does not exist
            }
            console.error(`Error checking file existence:`, axiosError.message);
            return false;
        }
    };

    return (
        <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ marginRight: '20px' }}>Upload your file for {name}: </div>
            <div>
                {!isUploadSuccessful && !showUpload && <button className="pdf-btn" onClick={handleClick}>Upload File</button>}
                {isUploadSuccessful && !showUpload && uploadedFileName && 
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <a href={`http://localhost:8080/files/${uploadedFileName}`} target="_blank" rel="noreferrer" style={{color:"#008000", textDecoration: 'underline'}}>
                            Successfully Uploaded!
                        </a>
                        <button className="pdf-btn" onClick={handleResubmit} style={{ marginLeft: '10px' }}>Resubmit</button>
                    </div>}
            </div>
            {showUpload && <PdfUpload text={name} username={currentUser} step="2" onFileUploadSuccess={handleUploadSuccess} />}
        </div>
    );
}

interface StepProps {
    currentUser: string;
    currentID: string;
}

export default function Step2(props: StepProps) {
    const { currentUser, currentID } = props;
    const formNames = ["Form C"];

    const [uploadedFormCount, setUploadedFormCount] = useState(0);

    useEffect(() => {
        if (uploadedFormCount === formNames.length) {
            axios.get(`/customerProgress/${currentID}`)
            .then(response => {
                const currentProgress = response.data.progress;
                // the value below should be set based on what step file this is
                if (currentProgress === 2) {
                    axios.put(`/customerProgress/${currentID}`, { progress: currentProgress + 1 })
                    .then(response => {
                        console.log("Progress updated successfully:", response.data);
                    })
                    .catch(error => {
                        console.error("Error updating progress:", error);
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching progress:", error);
            });
        }
    }, [uploadedFormCount, currentUser, currentID]);

    return (
        <div>
            <div>Display Things to do for Step 2 Here</div>
            <br />
            {formNames.map((name) => (
                <Form key={name} name={name} onUploadSuccess={() => {
                    console.log(`${name} uploaded successfully!`);
                    setUploadedFormCount(prevCount => prevCount + 1);
                }} currentUser={currentUser} />
            ))}
        </div>
    );
}
