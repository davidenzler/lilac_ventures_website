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

function App() {

  return (
    <div className="App">
    
        <header className="App-header">
          <NavBar />
          </header>
          {/** 
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Homepage/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/values" element={<Values/>} />
              <Route path="/mission" element={<Mission/>} />
              <Route path="/CalendarView" element={<CalendarView/>} />
              <Route path="/clientPortal" element={<ClientPortal/>} />

              <Route element={<RequireAuth/>}>
                <Route path="/customerPortal" element={<CustomerPortal/>}/>
              </Route>

              <Route path="progress" element={<ProgressBar/>}/>
              <Route path="messages" element={<Inbox/>}/>
              <Route path="forms" element={<AvailableForm/>}/>
              <Route path="forms/financeSnapshot" element={<FinanceSnapshotWebForm/>}/>
              <Route path="forms/zeroBasedBudget" element={<ZeroBasedBudgetWebForm/>}/>
              <Route path="CustomerAccount" element={<CustomerAccount/>}/>
              <Route path="/PaymentPage" element={<PaymentPage/>}/>
            </Route>
        </Routes>
        */}
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
          <Route path="/customerPortal" element={<CustomerPortal/>}>
          <Route path="progress" element={<ProgressBar/>}/> 
            <Route path="messages" element={<Inbox/>}/>
            <Route path="forms" element={<AvailableForm/>}/>
            <Route path="uploadedDocuments" element={<UploadedDocuments/>}/>
            <Route path="forms/financeSnapshot" element={<FinanceSnapshotWebForm/>}/>
            <Route path="forms/zeroBasedBudget" element={<ZeroBasedBudgetWebForm/>}/>
            <Route path="CustomerAccount" element={<CustomerAccount/>}/>
          </Route>
          <Route path="/PaymentPage" element={<PaymentPage/>}/>
        </Routes>

    </div>
  );
}

export default App;
