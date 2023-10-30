import React, { useState } from 'react';
import axios from './api/axios';  

interface Props {
    text: string;
    username: string;
    step: string;
    onFileUploadSuccess: (filename: string) => void;
}

const PdfUpload: React.FC<Props> = ({ text, username, step, onFileUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [errorMsg, setErrorMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setErrorMsg(""); // clear error message when a new file is selected
            setIsSuccess(false); // clear success message when a new file is selected
        }
    };

    const uploadFileToServer = async (file: File) => {
        const formData = new FormData();
        const newFileName = `${text} - ${username}.pdf`;  // Rename the file here. Filename structure: "<text> - <username>.pdf" ex. "Form A - JohnDoe.pdf"
        formData.append('file', file, newFileName); // Pass the new name here. 

        try {
            await axios.post(`/files/${step}`, formData);
            setIsSuccess(true);
            onFileUploadSuccess(newFileName);
        } catch (err) {
            setErrorMsg(`Error uploading the file: ${err}`);
            console.error(`Error uploading the file:`, err);
        }
    };

    // This function initiates a download when provided with a filename
    const downloadFile = (filename: string) => {
        axios.get(`/files/${filename}`, {
            responseType: 'blob',  // This ensures that axios processes the response as a blob
        })
        .then(response => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename); // This ensures the file downloads instead of opening in a new tab/window
            document.body.appendChild(link);
            link.click();
            link.remove();  // This removes the element from the DOM
        })
        .catch(err => {
            console.error("Error while downloading the file: ", err);
        });
    };

    const validateSelectedFile = () => {
        const MAX_FILE_SIZE = 104857600  // 100MB
        if (!selectedFile) {
            setErrorMsg("Please choose a file");
            return;
        }
        const fileSizeKiloBytes = selectedFile.size / 1024;
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            setErrorMsg("File size is greater than maximum limit");
            return;
        }
        setErrorMsg(""); // clear error message if file size is within the maximum limit
        uploadFileToServer(selectedFile);
    };

    const handleResubmit = () => {
        setIsSuccess(false);
    };

    return (
        <div className="Upload-container-pdf" style={{ display: isSuccess ? 'none' : 'block' }}>
            <div className="card-pdf">
                <div className="card-header-pdf">
                    <div className="title-pdf">{text}</div>
                </div>
                <div className="card-body-pdf">
                    <div className="label-pdf">Choose File</div>
                    <input type="file" name='file' onChange={handleFileChange} />
                    <div className="space-between-pdf">
                        <div className="info-message-pdf">Max size: 100MB</div>
                    </div>
                    {isSuccess && 
                        <div 
                            className="success-message-pdf"
                            onClick={() => downloadFile(`${text} - ${username}.pdf`)}
                            style={{ cursor: "pointer" }}
                        >
                            Successfully Uploaded! (Click to download)
                        </div>
                    }
                    <p className="error-message-pdf">{errorMsg}</p>
                </div>
                <button className="btn-pdf" id="submit-btn" onClick={validateSelectedFile}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PdfUpload;
