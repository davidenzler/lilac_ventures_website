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
    const [seenByAdmin, setSeenByAdmin] = useState<boolean>(false);

    useEffect(() => {
        const filename = `${name} - ${currentUser}.pdf`;
        checkFileExists(filename).then(exists => {
            if (exists) {
                setIsUploadSuccessful(true);
                setUploadedFileName(filename);
                fetchSeenByAdminStatus(filename).then(status => {
                    setSeenByAdmin(status);
                });
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

    // Function to fetch the seenByAdmin status based on file name
    const fetchSeenByAdminStatus = async (filename: string) => {
        try {
            const fileId = await getFileIdFromName(filename);
            if (!fileId) return false;
            const response = await axios.get(`files/pdfModel/${fileId}`);
            return response.data.seenByAdmin;
        } catch (error) {
            console.error(`Error fetching seenByAdmin status for filename ${filename}:`, error);
            return false;
        }
    };

    return (
        <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ marginRight: '20px' }}>Upload your file for <a
                href={encodeURI(`${process.env.REACT_APP_API_URL}/files/${name}.pdf`)} // Add ".pdf" to the URL
                target="_blank"
                rel="noreferrer"
                style={{ color: "#9b5bd4", textDecoration: 'underline' }}
            >
            {name}
            </a>: 
            </div>
            <div>
                {!isUploadSuccessful && !showUpload && <button className="pdf-btn" onClick={handleClick}>Upload File</button>}
                {isUploadSuccessful && !showUpload && uploadedFileName && 
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* The below <a> is the correct one to be used for the client page */}
                        <a href={encodeURI(`${process.env.REACT_APP_API_URL}/files/${uploadedFileName}`)} target="_blank" rel="noreferrer" style={{color:"#008000", textDecoration: 'underline'}}>
                            Successfully Uploaded!
                        </a>

                        {/* The below <a> is a test for changing the seenByAdmin value when downloaded. 
                        TODO: REMOVE THE BELOW AND UNCOMMENT THE ABOVE ONCE IMPLEMENTED ON ADMIN PAGE */}
                        {/* <a href={`http://localhost:8080/files/${uploadedFileName}`} target="_blank" rel="noreferrer" style={{color:"#008000", textDecoration: 'underline'}} onClick={async () => {
                            const fileId = await getFileIdFromName(uploadedFileName);
                            if (fileId) {
                                await setAdminViewedStatus(fileId);
                            }
                        }}>
                            Successfully Uploaded!
                        </a> */}

                        {seenByAdmin && 
                            <div style={{ marginLeft: '10px' , color:'green'}} title="File viewed by financial coach" >✔</div>
                        }

                        <button className="pdf-btn" onClick={handleResubmit} style={{ marginLeft: '10px' }}>Resubmit</button>
                        
                    </div>
                }
            </div>
            {showUpload && <PdfUpload text={name} username={currentUser} step="1" onFileUploadSuccess={handleUploadSuccess} />}
        </div>
    );
};

interface StepProps {
  currentUser: string;
  currentID: Promise<any>;
}

const fetchFormNames = async () => {
    try {
      const response = await axios.get('/pdfStepMapping/1');
      const pdfNames = response.data.pdfNames || []; // Get the array of form names
      const trimmedNames = pdfNames.map((name: any) => name.endsWith('.pdf') ? name.slice(0, -4) : name);
      return trimmedNames;
    } catch (error) {
      console.error('Error fetching pdf names:', error);
      return []; // Return an empty array or handle the error as needed
    }
  };
  
  

export default function Step1(props: StepProps) {
    const { currentUser, currentID } = props;
    const [formNames, setFormNames] = useState([]);
    
    useEffect(() => {
        // Fetch and set the form names when the component mounts
        fetchFormNames().then(names => setFormNames(names));
    }, []);
    
    const [uploadedFormCount, setUploadedFormCount] = useState(0);

    // useEffect(() => {
    //     if (uploadedFormCount === formNames.length) {
    //         axios.get(`/customerProgress/${currentID}`)
    //         .then(response => {
    //             const currentProgress = response.data.progress;
    //             if (currentProgress === 1) {
    //                 axios.put(`/customerProgress/${currentID}`, { progress: currentProgress + 1 })
    //                 .then(response => {
    //                     console.log("Progress updated successfully:", response.data);
    //                 })
    //                 .catch(error => {
    //                     console.error("Error updating progress:", error);
    //                 });
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error fetching progress:", error);
    //         });
    //     }
    // }, [uploadedFormCount, currentUser, currentID, formNames]);

    return (
        <div>
            <div>Baby Step 1</div>
            <div>Save $1000 in your emergency fund</div>
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

//The below are used for changing the boolean seenByAdmin. 
const getFileIdFromName = async (filename: string) => {
    try {
        const response = await axios.get(`files/getFileId/${filename}`);
        return response.data.fileId; 
    } catch (error) {
        console.error(`Error fetching fileId for filename ${filename}:`, error);
        return null;
    }
};

// const setAdminViewedStatus = async (fileId: string) => {
//     try {
//         await axios.put(`files/pdfModel/${fileId}/true`);
//     } catch (error) {
//         console.error(`Error setting seenByAdmin for fileId ${fileId}:`, error);
//     }
// };
