import React, { useEffect, useState } from 'react';

import "./Inbox.css";
import useAuth from './hooks/useAuth';
import axios from './api/axios';

interface Message{
    sender: string;
    receiver: string;
    timestamp: string;
    subject: string;
    content: string;
    isArchivedBySender: string;
    isArchivedByReceiver: string;
    isReadBySender: string;
    isReadByReceiver: string;
    isDeletedBySender: string;
    isDeletedByReceiver: string;
    _id: string;
}

interface RecipientSelection{
    firstname: string;
    lastName: string;
    email: string;
}


function Inbox() {
    const [selectedFolder, setFolder] = useState('received');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [currentMessageList, setCurrentMessageList] = useState<Message[]>([]);
    const [messageSearchFilter, setMessageSearchFilter] = useState('');

    const [isComposing, setIsComposing] = useState(false);
    const [composeReceiver, setComposeReceiver] = useState('');
    const [composeSubject, setComposeSubject] = useState('');
    const [composeReceiverList, setComposeReceiverList] = useState<RecipientSelection[]>([]);
    const [composeBody, setComposeBody] = useState('');

    const [archiveButtonText, setArchiveButtonText] = useState('Archive');
    const [deleteButtonText, setDeleteButtonText] = useState('Delete');

    const { auth }:any = useAuth();
    const clientEmail: string = auth.user;
    const adminRecipientInfo: RecipientSelection = {
        firstname: 'Gail',
        lastName: 'Tateyama',
        email: 'admin@example.com',
    };
    const role: string = auth.roles.join("");

    useEffect(() => {
        fetchInbox('received');
    }, []);

    useEffect(() => {
        if (!isComposing) {
            setComposeReceiverList([]);
            // clear receiver, subject, and body fields? 
            return;
        }
        if (role === 'admin') {
            fetchAllClients();
        }
        else {
            setComposeReceiverList([adminRecipientInfo])
            setComposeReceiver(adminRecipientInfo.email);
        }
    }, [isComposing]);


    const handleFolderSelection = (newFolder: string) => {
        setSelectedMessage(null);
        setFolder(newFolder);
        fetchInbox(newFolder);
    }

    const handleMessageSelection = (selectedMessage: Message) => {
        console.log(selectedMessage);
        setSelectedMessage(selectedMessage);
    }

    const handleComposeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComposeBody(event.target.value);
        //console.log(event.target.value);
    }

    const handleComposeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComposeSubject(event.target.value);
        //console.log(event.target.value);
    }

    const handleReply = () => {
        if (selectedMessage === null) {
            console.log('attempted to reply, but no message is selected.');
            return;
        }
        setSelectedMessage(null);
        setIsComposing(true);
        setComposeReceiver(selectedMessage.sender);
        setComposeSubject(`RE: ${selectedMessage.subject}`);   
    }

    const handleFlagMessage = (action : string, flag : boolean) => {
        if (action !== 'archive' && action !== 'delete') {
            console.log('action must be \'archive\' or \'delete\'')
            return;
        }
        if (selectedMessage != null) {
            flagMessage(selectedMessage._id, action, flag);
        }       
        else
            console.log('attempted to flag a message, but no message is currently selected.')
    }

    const sendMessage = async(sender: string, receiver: string, subject: string, body: string) => {
        console.log("sender: %s \n receiver: %s \n subject: %s \n body: %s", sender, receiver, subject, body);
        const apiUrl = `http://localhost:8080/messages/`;
        const data = {
            senderEmail: sender,
            receiverEmail: receiver,
            subject: subject,
            content: body,
        };
        try {
            const response = await axios.post(apiUrl, data);

            console.log('Message sent:', response.data);
            
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    const flagMessage = async (messageId: string, action: string, flag: Boolean) => {
        console.log("messageId: %s \n action: %s \n flag: %s ", messageId, action, flag);
        const apiUrl = `http://localhost:8080/messages/`;

        const data = {
            user: clientEmail,
            messageId: messageId,
            action: action,
            flagValue: flag,
        };
        try {
            const response = await axios.put(apiUrl, data);
            console.log('Message flagged:', response.data);

            setSelectedMessage(null);
            setFolder(selectedFolder);
            fetchInbox(selectedFolder);

        } catch (error) {
            console.error('Failed to flag message:', error);
        }
    };

    function getArchiveFlag() {
        if (selectedMessage == null) {
            console.log('attempted to get archive flag, but no message is selected.');
            return false;
        }          
        else {
            if (selectedMessage.isArchivedByReceiver && selectedMessage.receiver === clientEmail) {
                return false;
            }
            else if (!selectedMessage.isArchivedByReceiver && selectedMessage.receiver === clientEmail) {
                return true;
            }
            else if (selectedMessage.isArchivedBySender && selectedMessage.sender === clientEmail) {
                return false;
            }
            else if (!selectedMessage.isArchivedBySender && selectedMessage.sender === clientEmail) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    function getDeleteFlag() {
        if (selectedMessage == null) {
            console.log('attempted to get delete flag, but no message is selected.');
            return false;
        }
        else {
            if (selectedMessage.isDeletedByReceiver && selectedMessage.receiver === clientEmail) {
                return false;
            }
            else if (!selectedMessage.isDeletedByReceiver && selectedMessage.receiver === clientEmail) {
                return true;
            }
            else if (selectedMessage.isDeletedBySender && selectedMessage.sender === clientEmail) {
                return false;
            }
            else if (!selectedMessage.isDeletedBySender && selectedMessage.sender === clientEmail) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    function getArchiveButtonText() {
        var result = "";
        if (selectedMessage === null) {
            console.log('attempted to get archive button text, but no message is selected.');
        }
        else {
            if (selectedMessage.isArchivedByReceiver && selectedMessage.receiver === clientEmail) {
                return "Unarchive";
            }
            else if (!selectedMessage.isArchivedByReceiver && selectedMessage.receiver === clientEmail) {
                return "Archive";
            }
            else if (selectedMessage.isArchivedBySender && selectedMessage.sender === clientEmail) {
                return "Unarchive";
            }
            else if (!selectedMessage.isArchivedBySender && selectedMessage.sender === clientEmail) {
                return "Archive";
            }
            else {
                return "Archive";
            }
        }

        console.log("setting archive button to " + result);
        return result;
    }
    
    function getDeleteButtonText() {
        if (selectedMessage === null) {
            console.log('attempted to get delete button text, but no message is selected.');
            return "";
        }
        else {
            if (selectedMessage.isDeletedByReceiver && selectedMessage.receiver === clientEmail) {
                return "Restore";
            }
            else if (!selectedMessage.isDeletedByReceiver && selectedMessage.receiver === clientEmail) {
                return "Delete";
            }
            else if (selectedMessage.isDeletedBySender && selectedMessage.sender === clientEmail) {
                return "Restore";
            }
            else if (!selectedMessage.isDeletedBySender && selectedMessage.sender === clientEmail) {
                return "Delete";
            }
            else {
                return "Delete";
            }
        }
    }

    const openedMessage = (
        selectedMessage == null ? <div></div>
            :
            <div style = {{overflow:'hidden'}}>
                <div className="messageContainer">
                    <div className="messageHeader">{
                        displayMessageHeader(selectedMessage.sender,
                            selectedMessage.subject,
                            formatDateTimeFull(selectedMessage.timestamp))}
                    </div>
                    <div className="messageContent">
                        <pre>{selectedMessage.content}</pre>
                    </div>
                    <div className="messageToolbar">
                        <button className="toolbarSelection" onClick={() => handleReply()} disabled = {selectedMessage.sender === clientEmail}>Reply</button>
                        <button className="toolbarSelection" onClick={() => handleFlagMessage('archive', getArchiveFlag())}>{getArchiveButtonText()}</button>
                        <button className="toolbarSelection" onClick={() => handleFlagMessage('delete', getDeleteFlag())}>{getDeleteButtonText()}</button>
                    </div>
                </div>
            </div>)

    
    const fetchAllClients = async () => {
        const apiUrl = `http://localhost:8080/clientInfoUpdate/`;

        axios
            .get(apiUrl)
            .then((response) => {
                setComposeReceiverList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching clients:', error);
            });
    }

    const composeWindow = (
        <div className='composeContainer'>
            <div className="composeTop">
                <div style={{ backgroundColor: 'rgb(93, 124, 153)', color: 'white', position: 'relative', textAlign: 'center', height: '25%', }}>
                    <div style={{ position: 'relative', transform: 'translateY(25%)' }}>New Message</div>
                </div>
                {/* <input
                    style={{ width: '100%', height: '37.5%', borderBottom: 'solid', borderColor: 'grey', borderBottomWidth: '1px', paddingLeft: '1%' }}
                    name='composeReceiver'
                    type="text"
                    placeholder="To:"
                    value={composeReceiver}
                    onChange={e => setComposeReceiver(e.target.value)} >
                </input> */}
                <select
                    style={{ width: '100%', height: '37.5%', borderBottom: 'solid', borderColor: 'grey', borderBottomWidth: '1px', paddingLeft: '1%' }}
                    name='composeReceiver'
                    placeholder='To:'
                    value={composeReceiver}
                    onChange={e => setComposeReceiver(e.target.value)}>
                    <option value="" disabled> To: </option>
                    {
                        composeReceiverList.filter((recipient: RecipientSelection) => recipient.email !== clientEmail)
                            .map((recipient: RecipientSelection) => (
                            <option key={recipient.email}
                                value={recipient.email}>
                                {`${recipient.lastName}, ${recipient.firstname} (${recipient.email})`}
                            </option>
                        ))
                    } 
                </select>
                <br></br>
                <input
                    style={{ width: '100%', height: '37.5%', borderBottom: 'solid', borderColor: 'grey', borderBottomWidth: '1px', paddingLeft: '1%' }}
                    name='composeSubject'
                    type="text"
                    placeholder="Subject:"
                    value={composeSubject}
                    onChange={handleComposeSubject}>

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
                        sendMessage(clientEmail, composeReceiver, composeSubject, composeBody);
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

    

    const fetchInbox = async (folder: string) => {
        console.log(clientEmail);
        console.log(role);
        console.log(typeof role[0]);
        console.log('fetching inbox: ' + folder);
        const apiUrl = `http://localhost:8080/messages/${clientEmail}/${folder}`;

        axios
            .get(apiUrl)
            .then((response) => {
                setCurrentMessageList(response.data);
                console.log(currentMessageList);
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }

    const filteredMessages = currentMessageList.filter((message: Message) => {
        return message.content.includes(messageSearchFilter) ||
            message.subject.includes(messageSearchFilter) ||
            message.sender.includes(messageSearchFilter) ||
            message.receiver.includes(messageSearchFilter);
    })

    return (
        <>
            <div className="inboxContainer">
                <span>
                    <div className="inboxList">
                        <button onClick={() => { setIsComposing(true) }} className='composeMessage'>Compose New Message</button><br></br>
                        <button onClick={() => handleFolderSelection('received')} className="inboxSelection">Inbox</button><br></br>
                        <button onClick={() => handleFolderSelection('sent')} className="inboxSelection">Sent</button><br></br>
                        <button onClick={() => handleFolderSelection('archived')} className="inboxSelection">Archived</button><br></br>
                        <button onClick={() => handleFolderSelection('deleted')} className='inboxSelection'>Trash</button><br></br>
                    </div>
                </span>
                <span>
                    <div className="messageList">
                        <input className='searchBar'
                            type="text" placeholder='Search...'
                            value={messageSearchFilter}
                            onChange={e => setMessageSearchFilter(e.target.value)}>

                        </input>
                        {
                            filteredMessages.map((message: Message, index) => (
                                <button key={index}
                                    className="messageSelection"
                                    onClick={() => handleMessageSelection(message)}>
                                    {message.sender}
                                    <p style={{ fontSize: 14 }}>{message.subject}</p>
                                    <p style={{ fontSize: 14 }}>{formatDateTimeShort(message.timestamp)}</p>
                                </button>

                            ))
                        }
                    </div>
                </span>

                {isComposing ? (composeWindow) : openedMessage}
            </div>
        </>
    );
}

function formatDateTimeShort(timestamp:string) {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    let hours = date.getHours();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month}/${day}/${year}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${hours}:${minutes}${amOrPm}`;
}

function formatDateTimeFull(timestamp: string) {
    const date = new Date(timestamp);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;

    return `${month} ${day}, ${year} ${formattedHours}:${minutes}${amOrPm}`;
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

export default Inbox;