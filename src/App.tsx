import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './Homepage';
import NavBar from './NavBar';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import logo from './logo.svg';
import './App.css';
import ClientPortal from './ClientPortal';
import CustomerPortal from './CustomerPortal';
import Inbox from './Inbox';
import ProgressBar from './ProgressBar';
import PaymentPage from './PaymentPage';
import CheckoutForm from './CheckoutForm';
import NotFoundPage from './PageNotFound/PageNotFound';
import AvailableForm from './AvailableForm';
import FinanceSnapshotWebForm from './InteractiveWebForms/FinanceSnapshotWebForm';
import ZeroBasedBudgetWebForm from './InteractiveWebForms/ZeroBasedBudgetWebForm';
import CalendarView from "./CalendarView";
import CustomerAccount from './CustomerAccount';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import History from './History';
import Values from './Values';
import Mission from './Mission';
import AdminOverview from './AdminDashboard/AdminDashboard';
import UploadedDocuments from './UploadedDocuments';
import AdminTable from './AdminDashboard/AdminTable';
import RegistrationForm from './RegistrationForm';
import useAuth from "./hooks/useAuth";
import ProtectedUserRoute from './ProtectedRoute';
import DebtSnowballWebForm from './InteractiveWebForms/DebtSnowballWebForm';
import PersistentLogin from './PersistentLogin';
import HomepageEditor from './Edit/HomepageEdit';
import AboutEditor from './Edit/AboutEdit';
import ContactEditor from './Edit/ContactEdit';
import EditPage from './EditPage';
import InvoiceComponent from './InvoiceCreation/CreateInvoice';
import AdminComponent from './Admin/AdminComponent';
import CustomerInfoView from './CustomerInfoView';
import CustomerInvoiceComponent from './CustomerPortalInvoices/CustomerInvoiceComponent';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import AvailabilityView from './AvailabilityCalendar';

    
function App() {
  const {auth, setAuth}: any = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Homepage');
  const [editedContent, setEditedContent] = useState({
    Homepage: { hero: '', info: '' },
    About: { aboutMe: '', ourMission: '', aboutLilacVentures: '' },
    Contact: { callToAction: '', email: '', phoneNumber: '' },
  });

  useEffect( () => {
    const getUser = async () => {
      const loggedInAuth = localStorage.getItem("auth");
      if(loggedInAuth) {
        const authObj = JSON.parse(loggedInAuth);
        setAuth(authObj);
      }
    }
    getUser();
    
  }, [setAuth]);
  
  return (
    <div className="App">
    
        <header className="App-header">
          <NavBar />
          </header>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/history" element={<History/>} />
          <Route path="/values" element={<Values/>} />
          <Route path="/mission" element={<Mission/>} />
          <Route element={<ProtectedRoute permittedRole='admin' />}>
            <Route path="/adminPortal" element={<AdminComponent/>} >
              <Route index element={<AdminDashboard />} />
              <Route path="/adminPortal/Invoice" element={<InvoiceComponent />}/>
              <Route path="/adminPortal/AdminTable" element={<AdminTable />}/>
              <Route path="/adminPortal/registrationForm" element={<RegistrationForm />} />
              <Route path="/adminPortal/EditPage" element={<EditPage/>} />
              <Route path="/adminPortal/calendar" element={<CalendarView/>}/>
              <Route path="/adminPortal/availability" element={<AvailabilityView/>}/>
              <Route path="/adminPortal/messages" element={<Inbox/>}/>
            </Route>
          </Route>
          <Route element={<ProtectedRoute permittedRole='user' />} >
            <Route path="/customerPortal" element={<CustomerPortal/>}>
              <Route index element={<ProgressBar/>}/> 
              <Route path="/customerPortal/messages" element={<Inbox/>}/>
              <Route path="/customerPortal/forms" element={<AvailableForm/>}/>
              <Route path="/customerPortal/calendar" element={<CalendarView/>}/>
              <Route path="/customerPortal/uploadedDocuments" element={<UploadedDocuments/>}/>
              <Route path="/customerPortal/forms/financeSnapshot" element={<FinanceSnapshotWebForm/>}/>
              <Route path="/customerPortal/forms/zeroBasedBudget" element={<ZeroBasedBudgetWebForm/>}/>
              <Route path="/customerPortal/CustomerAccount" element={<CustomerAccount/>}/>
              <Route path="/customerPortal/invoices" element={ <CustomerInvoiceComponent />} />
            </Route> # end CustomerPortal Route
          </Route> # end Protected Route

          <Route path="*" element = {<NotFoundPage imageUrl="https://media.istockphoto.com/id/1289010387/vector/broken-robot-repairs-service-breaking-mistake-situation-cartoon-vector-flat-character-mascot.jpg?s=612x612&w=0&k=20&c=QY-uy2QyadO0Lq1d_ApnqNHzSrV9NaTzQainZYe2o0U=" />} />
        </Routes>

    </div>
  );
}

export default App;
