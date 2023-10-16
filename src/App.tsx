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
import ProtectedUserRoute from './ProtectedUserRoute';
import DebtSnowballWebForm from './InteractiveWebForms/DebtSnowballWebForm';

    
function App() {
  const {auth, setAuth}: any = useAuth();
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
          <Route path="/CalendarView" element={<CalendarView/>} />
          <Route path="/adminPortal" element={<AdminOverview/>} />
          <Route path="/AdminTable" element={<AdminTable/>} />
          <Route path="/registrationForm" element={<RegistrationForm/>} />
          <Route element = { <ProtectedUserRoute /> } >
              <Route path="/customerPortal" element={<CustomerPortal/>}>
                <Route path="/customerPortal/progress" element={<ProgressBar/>}/> 
                <Route path="/customerPortal/messages" element={<Inbox/>}/>
                <Route path="/customerPortal/forms" element={<AvailableForm/>}/>
                <Route path="/customerPortal/calendar" element={<CalendarView/>}/>
                <Route path="/customerPortal/uploadedDocuments" element={<UploadedDocuments/>}/>
                <Route path="/customerPortal/forms/financeSnapshot" element={<FinanceSnapshotWebForm/>}/>
                <Route path="/customerPortal/forms/zeroBasedBudget" element={<ZeroBasedBudgetWebForm/>}/>
                <Route path="/customerPortal/CustomerAccount" element={<CustomerAccount/>}/>
              </Route> # end CustomerPortal Route
          </ Route> # end ProtectedUserRoute
          <Route path="/PaymentPage" element={<PaymentPage/>}/>
          <Route path="*" element = {<NotFoundPage imageUrl="https://media.istockphoto.com/id/1289010387/vector/broken-robot-repairs-service-breaking-mistake-situation-cartoon-vector-flat-character-mascot.jpg?s=612x612&w=0&k=20&c=QY-uy2QyadO0Lq1d_ApnqNHzSrV9NaTzQainZYe2o0U=" />} />
        </Routes>

    </div>
  );
}

export default App;
