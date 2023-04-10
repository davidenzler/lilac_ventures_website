import React, { useState } from 'react';

// PdfUpload component
export default function PdfUpload({text, onFileUploadSuccess}:{text:string, onFileUploadSuccess: Function}) {
    // useState hook to manage selected file, error message, and upload success state
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [errorMsg, setErrorMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // handleFileChange function to update selected file and clear error message on file selection
    const handleFileChange = (event: any) => {
        if(event.target.files.length > 0){
            setSelectedFile(event.target.files[0]);
            setErrorMsg(""); // clear error message when a new file is selected
            setIsSuccess(false) // clear success message when a new file is selected
        }
    };
    

    // validateSelectedFile function to check file size and trigger file upload success callback
    const validateSelectedFile = () => {
        const MAX_FILE_SIZE = 104857600  // 100MB
        if (!selectedFile) {
            setErrorMsg("Please choose a file");
            setIsSuccess(false) // set success message to false if no file selected
            return
        }
        const fileSizeKiloBytes = selectedFile.size / 1024
        if(fileSizeKiloBytes > MAX_FILE_SIZE){
            setErrorMsg("File size is greater than maximum limit");
            setIsSuccess(false) // set success message to false if file size greater than maximum limit
            return
        }
        setErrorMsg("") // clear error message if file size is within the maximum limit
        setIsSuccess(true) // set success message to true
        onFileUploadSuccess(); // trigger file upload success callback
        //********Add code below to do something with the file for backend uses**************
    };
    
    // return JSX that displays upload card with title, file upload input, max file size message, error message and success message
    // submit button calls validateSelectedFile function on click
    return (
        <div className="Upload-container-pdf" style={{display: isSuccess ? 'none' : 'block'}}>
            <div className="card-pdf">
                <div className="card-header-pdf">
                    <div className="title-pdf">{text}</div>
                </div>

                <div className="card-body-pdf">
                    <div className="label-pdf">Choose File</div>
                    <input type="file" name='file' onChange={handleFileChange}/>

                    <div className="space-between-pdf">
                    <div className="info-message-pdf">Max size: 100MB</div>
                    </div>
                    {isSuccess ? <div className="success-message-pdf">Upload Sucessful</div> : null}
                    <p className="error-message-pdf">{errorMsg}</p>                   
                </div>
                <button className="btn-pdf" id="submit-btn" onClick={validateSelectedFile}>
                    Submit
                </button>
            </div>
        </div>
    );
}
