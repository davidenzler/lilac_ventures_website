import React, { useState } from 'react';
import "./Inbox.css";
import useAuth from './hooks/useAuth';
import axios from './api/axios';

const apiUrl = '/messages';

function Inbox() {
    const { auth }: any = useAuth();
    const [selectedFolder, setFolder] = useState('received');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isComposing, setIsComposing] = useState(false);
    const [composeReceiver, setComposeReceiver] = useState('');
    const [composeSubject, setComposeSubject] = useState('');
    const [composeBody, setComposeBody] = useState('');

    const handleFolderSelection = (newFolder: string) => {
        setFolder(newFolder);
        // console.log(newFolder);
    }

    const handleComposeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComposeBody(event.target.value);
        console.log(event.target.value);
    }

    const handleComposeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComposeSubject(event.target.value);
        console.log(event.target.value);
    }

    const markMessageIsArchived = async (isArchived: boolean, messageId: string) => {
        // try {
        //     const response = await axios.post(`/messages/archive/${messageId}`);
        //     // Handle the response here
        //     console.log(response.data.message);
        // } catch (error) {
        //     // Handle errors here
        //     console.error(error);
        // }
    };

    const markMessageIsDeleted = async (isArchived: boolean, messageId: string) => {
        // try {
        //     const response = await axios.post(`/messages/delete/${messageId}`);
        //     // Handle the response here
        //     console.log(response.data.message);
        // } catch (error) {
        //     // Handle errors here
        //     console.error(error);
        // }
    };

    const openedMessage = (<div><div className="messageContainer">
        <div className="messageHeader">{displayMessageHeader("John Doe", "Fwd: Required Forms", "3/4/23")}</div>
        <div className="messageContent">{messageText}</div>
        <div className="messageToolbar">
        <button className="toolbarSelection">Reply</button>
        <button className="toolbarSelection">Archive</button>
        <button className="toolbarSelection">Delete</button>
        </div>
    </div></div>)

    const composeWindow = (
        <div className='composeContainer'>
            <div className="composeTop">
                    <div style={{ backgroundColor: 'rgb(93, 124, 153)', color: 'white', position:'relative', textAlign:'center', height:'25%',  }}>
                        <div style={{position:'relative', transform:'translateY(25%)'}}>New Message</div>
                    </div>
                <input
                    style={{ width: '100%', height: '37.5%', borderBottom: 'solid', borderColor: 'grey', borderBottomWidth: '1px', paddingLeft: '1%' }}
                    name='composeReceiver'
                    type="text"
                    placeholder="To:"
                    value= {composeReceiver}
                    onChange = {e=> setComposeReceiver(e.target.value)} >
                </input>
                <br></br>
                <input
                    style={{ width: '100%', height: '37.5%', borderBottom: 'solid', borderColor: 'grey', borderBottomWidth: '1px', paddingLeft: '1%' }}
                    name='composeSubject'
                    type="text"
                    placeholder="Subject:"
                    value = {composeSubject}
                    onChange = {handleComposeSubject}>
                    
                </input>
                </div>
                <div className="composeBody">
                <textarea
                    style={{ width: '100%', height: '100%', overflow: 'scroll', paddingLeft: '1%', paddingRight: '1%' }}
                    name='composeBody'
                    placeholder="Your message:"
                    value={composeBody}
                    onChange={handleComposeBody}>
                    </textarea>

                </div>
                <div className="composeFooter">
                <button
                    className='sendButton'
                    disabled={!composeBody || !composeReceiver || !composeSubject}
                    onClick={() => {
                        sendMessage(auth.user, composeReceiver, composeSubject, composeBody);
                        setComposeBody('');
                        setComposeReceiver('');
                        setComposeSubject('');
                        setIsComposing(false);
                    }}>
                    Send
                </button>
                <button
                    onClick={() => { setIsComposing(false) }}
                    style={{ backgroundColor: 'rgb(93, 124, 153)', color: 'white', width: '25%', height: '100%' }}>
                    Cancel
                </button>
            
                </div>
        </div>
    )
    return(
        <>
        {/* <div className='header'>Inbox</div> */}
        <div className="container">
            <div className="inboxList">
                <button onClick={() => { setIsComposing(true) }} className='composeMessage'>Compose New Message</button><br></br>
                <button onClick={() => handleFolderSelection('received')} className="inboxSelection">Inbox</button><br></br>
                <button onClick={() => handleFolderSelection('sent')} className="inboxSelection">Sent</button><br></br>
                <button onClick={() => handleFolderSelection('archived')} className="inboxSelection">Archived</button><br></br>
                <button onClick={() => handleFolderSelection('deleted')} className='inboxSelection'>Trash</button><br></br>
            </div>
            <div className="messageList">
                <div className="searchBar">
                    <input type="text" placeholder='Search...'></input>
                </div>
                    <div>{populateInbox(selectedFolder)}</div>     
                </div>

                {isComposing ? (composeWindow) : openedMessage}                     
        </div>
        </>
    );
}

function sendMessage(sender: string, receiver: string, subject: string, body: string) {
    console.log("sender: %s \n receiver: %s \n subject: %s \n body: %s", sender, receiver, subject, body);
}

function displayMessagePreview(sender:string, subject:string, date:string){
    return(
        <div className ="messageSelection">
            {sender}
            <p style={{fontSize:14}}>{subject}</p>
            <p style={{fontSize:14}}>{date}</p>
    </div>
    )
}

function displayMessageHeader(sender:string, subject:string, date:string){
    return(
        <div className="messageHeader">From: {sender} 
        <br></br>
        <p style={{fontWeight:'bold', display:'inline'}}>Subject: </p> <p style={{display:'inline'}}>{subject}</p>
        <br></br>
        <p style={{fontWeight:'bold', display:'inline'}}>Date: </p> <p style={{display:'inline'}}>{date}</p>
        </div>
    )
}



function markMessageIsDeleted(isDeleted: boolean, messageId: string) {
     // axios
    //     .get(apiUrl, {
    //         params: {
    //             clientEmail,
    //             folder,
    //         },
    //     })
    //     .then((response) => {
    //         // Update the state with the fetched messages
    //         messages = (response.data);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching messages:', error);
    //     });
}

function populateInbox(folder:string) {
    // const clientEmail = 'test@example.com'
    // var messages = [''];
    // axios
    //     .get(apiUrl, {
    //         params: {
    //             clientEmail,
    //             folder,
    //         },
    //     })
    //     .then((response) => {
    //         // Update the state with the fetched messages
    //         messages = (response.data);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching messages:', error);
    //     });

    // console.log(messages);

    return (<div><button className="messageSelection">{displayMessagePreview("John Doe", "Fwd: Required Forms","3/4/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("Brad Lee", "RE: Next Appointment", "3/1/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("John Doe", "Fwd: Required Forms", "3/4/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("Brad Lee", "RE: Next Appointment", "3/1/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("John Doe", "Fwd: Required Forms", "3/4/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("Brad Lee", "RE: Next Appointment", "3/1/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("John Doe", "Fwd: Required Forms", "3/4/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("Brad Lee", "RE: Next Appointment", "3/1/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("John Doe", "Fwd: Required Forms", "3/4/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("Brad Lee", "RE: Next Appointment", "3/1/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("John Doe", "Fwd: Required Forms", "3/4/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("Brad Lee", "RE: Next Appointment", "3/1/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("John Doe", "Fwd: Required Forms", "3/4/23")}</button>
                    <button className="messageSelection">{displayMessagePreview("Brad Lee", "RE: Next Appointment", "3/1/23")}</button></div>)
}

const messageText = (
    "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
)

export default Inbox;