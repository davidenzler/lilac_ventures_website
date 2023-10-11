import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import debtSnowballPDF from './LilacVentureForms/debtSnowball.pdf';
import personalFinanceSnapPDF from './LilacVentureForms/personal-financial-snapshot.pdf';
import zeroBasedBudgetPDF from './LilacVentureForms/zero-based-budget.pdf';
import './AvailableForm.css';

/*
This code defines a React component called AvailableForm that displays a list of available forms. 
It imports three PDF files as well as the Link, Outlet, Route, and Routes components from the react-router-dom library.
The render() method of the component returns a JSX structure that contains a header, a container div, and three form items. 
Each form item has a title and a link to download the corresponding PDF file, and optionally a Link to a web form. 
The className attribute is used to add CSS classes to the elements, and the href attribute specifies the URL of the PDF file 
to download.
*/
class AvailableForm extends React.Component {
  render() {
    return (
      <div className='AvailableFormsBody'>
        <h1><u>Available Forms</u></h1>
        <div className="form-container">
          <div className='formItem'>
            Debt SnowBall: <a href={debtSnowballPDF} download="debtSnowball.pdf" className='aAvailableForm'>Download </a>
            OR <Link to="/customerPortal/forms/debtSnowball" className='aAvailableForm'>Web Form</Link>
          </div>
          <div className='formItem'>
            Personal Finance Snapshot: <a href={personalFinanceSnapPDF} download="personal-finance-snapshot.pdf" className='aAvailableForm'>Download</a>
            OR <Link to="/customerPortal/forms/financeSnapshot" className='aAvailableForm'>Web Form</Link>
          </div>
          <div className='formItem'>
            Zero-Based Budget: <a href={zeroBasedBudgetPDF} download="zero-based-budget.pdf" className='aAvailableForm'>Download</a>
            OR <Link to="/customerPortal/forms/zeroBasedBudget" className='aAvailableForm'>Web Form</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AvailableForm;
