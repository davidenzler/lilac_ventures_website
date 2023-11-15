import './CustomerInvoice.css'
import React, { useRef, useState, useEffect } from 'react'
import { getCustomerinvoices } from '../services/invoiceServices';
import useAuth from '../hooks/useAuth';
import { BsDownload } from 'react-icons/bs';

interface InvoiceType {
    due_date: number,
    hosted_invoice_url: string,
    invoice_pdf: string,
    subtotal: number
}

interface InvoiceArray {
    listOfInvoices: InvoiceType[];
}

const InvoiceListComponent = ({ listOfInvoices }:InvoiceArray) => {
    return(
        <table className='invoiceList'>
            <thead>
            <tr className='tableHeadings'>
                <th>Amount Due</th>
                <th>Due Date</th>
                <th>Pay</th>
                <th>Download PDF</th>
            </tr>
            </thead>
            <tbody>
            {
                listOfInvoices.map( (invoice: InvoiceType) => {
                    console.log(invoice);
                    return (
                        <tr className='invoiceRow'>
                            <td>${invoice.subtotal / 100}</td>
                            <td>{new Date( (invoice.due_date * 1000) ).toLocaleString()}</td>
                            <td><button className='payInvoiceButton' name='payInvoice'><a href={invoice.hosted_invoice_url}>Pay</a></button></td>
                            <td><button className='pdfButton' name='pdfButton' value='downloadPdf'><a href={invoice.invoice_pdf}><BsDownload /></a></button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    );
}
const CustomerInvoiceComponent = () => {
    const { auth }: any = useAuth();
    const [ invoiceList, setInvoiceList ] = useState<InvoiceType[]>([]);
    const accessToken = auth.accessToken;
    
    useEffect( () => {
        // declare the data fetching function
        const getInvoices = async () => {
            const invoicesResponse = await getCustomerinvoices(accessToken)
            .then( (response:any) => response.json())
            setInvoiceList(() => Array.from(invoicesResponse) );
        }
        getInvoices()
        .catch(console.error);
    }, [accessToken, setInvoiceList]);

    return (
        <section className='customerInvoices'>
            <h1>Invoices</h1>
            { invoiceList ? <InvoiceListComponent listOfInvoices={invoiceList} /> : <h2>No Invoices Due</h2>}
        </section>
    )
}

export default CustomerInvoiceComponent;