import React from 'react';
import { FaBold } from 'react-icons/fa';
import "./Inbox.css";
import useAuth from './hooks/useAuth';

function Inbox() {
    const { auth }: any = useAuth();

    return(
        <>
        {/* <div className='header'>Inbox</div> */}
        <div className="container">
            <div className="inboxList">
                <div className="inboxSelection">Inbox</div>
                <div className="inboxSelection">Sent</div>
                <div className="inboxSelection">Archived</div>
                <div className='inboxSelection'>Trash</div>
                <div className='composeMessage'>Compose New Message</div>
            </div>
            <div className="messageList">
                <div className="searchBar">
                    <input type="text" placeholder='Search...'></input>
                </div>
                <div className="messageSelection">{displayMessagePreview("John Doe", "Fwd: Required Forms","3/4/23")}</div>
                <div className="messageSelection">{displayMessagePreview("Brad Lee", "RE: Next Appointment","3/1/23")}</div>
            </div>
            <div className="messageContainer">
                <div className="messageHeader">{displayMessageHeader("John Doe", "Fwd: Required Forms", "3/4/23")}</div>
                <div className="messageContent">{messageText}</div>
                <div className="messageToolbar"><button>Reply</button><button>Archive</button><button>Delete</button></div>
            </div>
        </div>
        </>
    );
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

const messageText = (
    "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
)

export default Inbox;