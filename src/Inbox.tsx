import React, { useEffect, useState } from 'react';

import "./Inbox.css";
import useAuth from './hooks/useAuth';
import axios from './api/axios';

interface Message {
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

interface RecipientSelection {
    firstName: string;
    lastName: string;
    email: string;
}


function Inbox() {
    const [selectedFolder, setFolder] = useState('received');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [selectedRecipientInfo, setSelectedRecipientInfo] = useState('');

    const [currentMessageList, setCurrentMessageList] = useState<Message[]>([]);
    const [currentRecipientInfoList, setCurrentRecipientInfoList] = useState<RecipientSelection[]>([]);
    const [messageSearchFilter, setMessageSearchFilter] = useState('');

    const [isComposing, setIsComposing] = useState(false);
    const [composeReceiver, setComposeReceiver] = useState('');
    const [composeSubject, setComposeSubject] = useState('');
    const [composeReceiverList, setComposeReceiverList] = useState<RecipientSelection[]>([]);
    const [composeBody, setComposeBody] = useState('');

    const { auth }: any = useAuth();
    const clientEmail: string = auth.user;
    const role: string = auth.roles;
    console.log("AUTH @inbox: ", auth);
    useEffect(() => {
        fetchInbox('received');
    }, []);

    useEffect(() => {
        fetchRecipientDetails();
    }, [currentMessageList]);

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
            fetchAdmins();
        }
    }, [isComposing]);


    const handleFolderSelection = (newFolder: string) => {
        setSelectedMessage(null);
        setFolder(newFolder);
        fetchInbox(newFolder);
    }

    const handleMessageSelection = (selectedMessage: Message, recipientInfo: string) => {
        //console.log(selectedMessage);
        setSelectedMessage(selectedMessage);
        setSelectedRecipientInfo(recipientInfo);
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

    const handleFlagMessage = (action: string, flag: boolean) => {
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

    const sendMessage = async (sender: string, receiver: string, subject: string, body: string) => {
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

        //console.log("setting archive button to " + result);
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
            <div style={{ overflow: 'hidden' }}>
                <div className="messageContainer">
                    <div className="messageHeader">{
                        displayMessageHeader(selectedRecipientInfo,
                            selectedMessage.subject,
                            formatDateTimeFull(selectedMessage.timestamp))}
                    </div>
                    <div className="messageContent">
                        <pre>{selectedMessage.content}</pre>
                    </div>
                    <div className="messageToolbar">
                        <button className="toolbarSelection" onClick={() => handleReply()} disabled={selectedMessage.sender === clientEmail}>Reply</button>
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
                //console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching clients:', error);
            });
    }

    const fetchAdmins = async () => {
        const apiUrl = `http://localhost:8080/admins/`;

        axios
            .get(apiUrl)
            .then((response) => {
                setComposeReceiverList(response.data);
                setComposeReceiver(response.data[0].email);
                //console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching admins:', error);
            });
    }

    const fetchRecipientDetails = async () => {
        if (role === 'user') {
            try {
                const updatedRecipientInfoList = await Promise.all(
                    currentMessageList.map(async (message) => {
                        const param = selectedFolder === 'sent' ||
                            ((selectedFolder === 'archived' || selectedFolder === 'deleted') && message.sender === clientEmail)
                            ? message.receiver : message.sender;
                        const apiUrl = `http://localhost:8080/admins/${param}`;
                        const response = await axios.get(apiUrl);
                        const admin = response.data.client;
                        //console.log(admin);
                        const recipient: RecipientSelection = {
                            firstName: admin.firstName,
                            lastName: admin.lastName,
                            email: admin.email,
                        };
                        //console.log(recipient);

                        return recipient;
                    })
                );
                //console.log(updatedRecipientInfoList);
                setCurrentRecipientInfoList(updatedRecipientInfoList);
            } catch (error) {
                console.error('Error retrieving client info:', error);
            }
        }
        else {
            try {
                const updatedRecipientInfoList = await Promise.all(
                    currentMessageList.map(async (message) => {
                        const param = selectedFolder === 'sent' ||
                            ((selectedFolder === 'archived' || selectedFolder === 'deleted') && message.sender === clientEmail)
                            ? message.receiver : message.sender;
                        const apiUrl = `http://localhost:8080/clientInfoUpdate/clientDetails/${param}`;
                        const response = await axios.get(apiUrl);
                        const client = response.data.client;
                        const recipient: RecipientSelection = {
                            firstName: client.firstName,
                            lastName: client.lastName,
                            email: client.email,
                        };
                        //console.log(recipient);

                        return recipient;
                    })
                );
                //console.log(updatedRecipientInfoList);
                setCurrentRecipientInfoList(updatedRecipientInfoList);
            } catch (error) {
                console.error('Error retrieving client info:', error);
            }
        }
        
    }

    const composeWindow = (
        <div className='composeContainer'>
            <div className="composeTop">
                <div style={{ backgroundColor: 'rgb(93, 124, 153)', color: 'white', position: 'relative', textAlign: 'center', height: '25%', }}>
                    <div style={{ position: 'relative', transform: 'translateY(25%)' }}>New Message</div>
                </div>
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
                                    {`${recipient.lastName}, ${recipient.firstName} (${recipient.email})`}
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
        // console.log("user email: " + clientEmail);
        // console.log("user role: " + role);
        // console.log('fetching inbox: ' + folder);
        const apiUrl = `http://localhost:8080/messages/${clientEmail}/${folder}`;

        axios
            .get(apiUrl)
            .then((response) => {
                const sortedMessages = response.data.sort((a: Message, b: Message) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);

                    // descending order
                    return dateB.getTime() - dateA.getTime();
                });
                setCurrentMessageList(sortedMessages);
                //console.log(currentMessageList);
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }

    const filteredMessages = currentMessageList
        .filter((message: Message, index) => {
            return (
                message.content.toLowerCase().includes(messageSearchFilter.toLowerCase()) ||
                message.subject.toLowerCase().includes(messageSearchFilter.toLowerCase()) ||
                message.sender.toLowerCase().includes(messageSearchFilter.toLowerCase()) ||
                message.receiver.toLowerCase().includes(messageSearchFilter.toLowerCase()) ||
                currentRecipientInfoList[index].firstName.toLowerCase().includes(messageSearchFilter.toLowerCase()) ||
                currentRecipientInfoList[index].lastName.toLowerCase().includes(messageSearchFilter.toLowerCase())
            );

        });
    
    const filteredRecipientInfo = currentRecipientInfoList
        .filter((value: RecipientSelection, index) => {
            return filteredMessages.includes(currentMessageList[index]);
        })

    function getMessageName(index: number, message: Message, displayPrefixAndEmail: boolean) : string {
        // TODO: fetch admin name from DB?
        // let returnString = role === 'user' ? 'Gail Tateyama' :
        //     `${filteredRecipientInfo[index]?.firstName} ${filteredRecipientInfo[index]?.lastName}`;
        let returnString = `${filteredRecipientInfo[index]?.firstName} ${filteredRecipientInfo[index]?.lastName}`;

        if (selectedFolder === 'sent') {
            let prefix:string = 'To: ';
            returnString = prefix + returnString;

            if (displayPrefixAndEmail) {
                let email: string = ` (${message.receiver})`;
                returnString = returnString + email;
            }
        }
        else if ((selectedFolder === 'archived' || selectedFolder === 'deleted')
            && message.sender === clientEmail) {
            let prefix: string = 'To: ';
            returnString = prefix + returnString;

            if (displayPrefixAndEmail) {
                let email: string = ` (${message.receiver})`;
                returnString = returnString + email;
            }
        }
        else {
            if (displayPrefixAndEmail) {
                let prefix: string = 'From: ';
                let email: string = ` (${message.sender})`;
                returnString = prefix + returnString;
                returnString = returnString + email;   
            }
        }
        

        return returnString;
    }

    return (
        <>
            <div className="inboxContainer">
                <div className="inboxList">
                    <button onClick={() => { setIsComposing(true) }} className='composeMessage'>Compose New Message</button><br></br>
                    <button onClick={() => handleFolderSelection('received')} className="inboxSelection">Inbox</button><br></br>
                    <button onClick={() => handleFolderSelection('sent')} className="inboxSelection">Sent</button><br></br>
                    <button onClick={() => handleFolderSelection('archived')} className="inboxSelection">Archived</button><br></br>
                    <button onClick={() => handleFolderSelection('deleted')} className='inboxSelection'>Trash</button><br></br>
                </div>
                <div className="messageList">
                    <input className='searchBar'
                        type="text" placeholder='Search...'
                        value={messageSearchFilter}
                        onChange={e => setMessageSearchFilter(e.target.value)}>

                    </input>
                    {
                        filteredMessages                       
                            .map((message: Message, index) => (
                                
                                <button key={index}
                                    className="messageSelection"
                                    onClick={() =>handleMessageSelection(message, getMessageName(index, message, true))}>
                                    {getMessageName(index, message, false)}
                                    <p style={{ fontSize: 14 }}>{message.subject}</p>
                                    <p style={{ fontSize: 14 }}>{formatDateTimeShort(message.timestamp)}</p>
                                </button>
                            ))
                    }
                </div>

                {isComposing ? (composeWindow) : openedMessage}
            </div>
        </>
    );
}

function formatDateTimeShort(timestamp: string) {
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

function displayMessageHeader(sender: string, subject: string, date: string) {
    return (
        <div className="messageHeader">{sender}
            <br></br>
            <p style={{ fontWeight: 'bold', display: 'inline' }}>Subject: </p> <p style={{ display: 'inline' }}>{subject}</p>
            <br></br>
            <p style={{ fontWeight: 'bold', display: 'inline' }}>Date: </p> <p style={{ display: 'inline' }}>{date}</p>
        </div>
    )
}

export default Inbox;