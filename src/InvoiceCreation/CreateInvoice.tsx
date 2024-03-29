import React, { useRef, useState, Component, useEffect } from 'react';
import './Invoice.css';
import useAuth from '../hooks/useAuth';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { searchCustomers } from '../services/customerServices';
import { searchProducts } from '../services/productSearch';
import { createInvoice, createInvoiceItem, deleteDraftInvoice, finalizeInvoice, getInvoice } from '../services/invoiceServices';


type Customer = {
    name: string,
    email: string,
    id: string
}

type Product = {
    id: string,
    description: string,
    name: string,
    price: string
}

type InvoiceItem = {
    currency: string,
    customer: string,
    price : {
        id: string,
        product: string
    }
}

type Invoice = {
    id: string,
    collection_method: ['charge_automatically', 'send_invoice'],
    auto_advance: boolean,
    currency: string,
    customer: string,
    description: string,
    lines: InvoiceItem[],
    status: ['draft'],
    due_date: string
}

const ReviewPopUp = ({customer, invoice, memo, footer, onclick, finalizeClick}:any) => {
    const amount_due_usd:number = invoice.amount_due / 100;
    const options = {  maximumFractionDigits: 2   }   
    const formattedNumber = Intl.NumberFormat("en-US",options).format(amount_due_usd); 
    return (
     <section className="reviewModal">
       <div className="modal_content">
        <h1>Invoice Review</h1>
        <section>Send invoice to: {customer.name}</section>
        <section>For total amount: ${formattedNumber}</section>
        { memo ? <section>Memo: {memo}</section> : <></>}
        { footer ? <section>Footer: {footer}</section> : <></> }
        <div className='buttonContainer'>
            <button className='finalize' onClick={finalizeClick}>Finalize Invoice</button>
            <button className="close" onClick={onclick}>Edit Invoice</button>
        </div>
      </div>
     </section>
    );
}


const ConsumerListComponent = ({data, clickHandler}: any) => {
    const dataList:Customer[] = React.useMemo(() => data, [data]);
    return (
        <ul className='searchResults'>
            {
                dataList.map( (elem:any) => {
                    return(
                        <li className='resultsRow' onClick={clickHandler} key={elem.email}>
                            <div className="column">{elem.name}</div>
                            <div className="column">{elem.email}</div>
                        </li>
                    )
                })
            }
        </ul>
    );
}

const ProductListComponent = ({data, clickHandler}: any) => {
    const dataList:Product[] = React.useMemo(() => data, [data]);
    return (
        <div className='searchResults'>
            {
                dataList.map( (elem:any) => {
                    return(
                        <div className='resultsRow' onClick={clickHandler}>
                            <div className="column">{elem.name}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

const SearchBoxComponent = ({onChange, name, placeholder, className, id, onBlur}: any) => {

    return (
        <input className={className} type="text" id={id} name={name} placeholder={placeholder} onChange={onChange} />
    );
}

const InvoiceComponent = () => {
    const [showCustomerMenu, setShowCustomerMenu] = useState(false);
    const [showProductMenu, setShowProductMenu] = useState(false);
    const [productList, setProductList] = useState<Product[]>([]);
    const [customerList, setCustomerList] = useState<Customer[]>([]);  
    const [customer, setCustomer] = useState<Customer>();
    const [memo, setMemo] = useState('');
    const [footer, setFooter] = useState('');
    const [product, setProduct] = useState<Product>();
    const [showMemoText, setShowMemoText] = useState(false);
    const [showFooterText, setShowFooterText] = useState(false);
    const [dueDate, setDueDate] = useState(null);
    const [invoiceItem, setInvoiceItem] = useState(null);
    const [reviewVisibility, setReviewVisibility] = useState(false);
    const [draftInvoice, setDraftInvoice] = useState<any>(null);
    const [editDraft, setEditDraft] = useState(false);
    const { auth }:any = useAuth();
    const accessToken = auth.accessToken;

    useEffect( () => {
        const customerSearchBox = document.getElementById('customerSearch') as HTMLInputElement;
        const productSearchBox = document.getElementById('productSearch') as HTMLInputElement;
        const date = document.getElementById('dueDate') as HTMLInputElement
        // const memoElem = document.getElementById('memoCheckbox') as HTMLInputElement
        // const footerElem = document.getElementById('footCheckbox') as HTMLInputElement

        customer ? customerSearchBox.value = customer!.name : customerSearchBox.value = '';
        product ? productSearchBox.value = product.name : productSearchBox.value = '';
        dueDate ? date.value = dueDate : date.value = '';
        // memo ? memoElem.value = memo : memoElem.value = '';
        // footer ? footerElem.value = footer : footerElem.value = '';
    }, [customer, product, dueDate, memo, footer]);

    document.addEventListener('click', (e) => {
        const { target } = e;
        if (target instanceof HTMLElement && target.parentElement) {
            const classList = target.parentElement.className; // classNames as string
            const targetClass = 'search';
            if(!classList.includes(targetClass)) {
                setShowCustomerMenu(() => false);
                setShowProductMenu(() => false);
            }
        }
    });

    let customerSearchInputHandler = async (e:any) => {
        const searchResults: any = await searchCustomers(e.target.value, accessToken)
        .then((response: any) => response.json())
        if(searchResults['message']) {
            setCustomerList([]);
            setShowCustomerMenu( false);
        } else {
            let results:Customer[] = searchResults['customerList'];
            setCustomerList( results );
            setShowCustomerMenu(true);
        }
    };

    let productSearchInputHandler = async (e:any) => {
        const searchResults: any = await searchProducts(e.target.value, auth.accessToken)
        .then((response: any) => response.json())
        if(searchResults['message']) {
            setProductList([]);
            setShowProductMenu( () => false);
        } else {
            let results:Product[] = searchResults['productList'];
            setProductList( () => results);
            setShowProductMenu(true);
        }
    };


    const clickCustomerHandler = async (e:any) => {
        let selection;
        e.target.className === 'resultsRow' ? selection = e.target : selection = e.target.parentElement;
        const searchBox = document.getElementById('customerSearch') as HTMLInputElement;
        let values:any = []
        let row_elems = selection.childNodes;
        for (let i=0; i < row_elems.length; i++) {
            values.push(row_elems[i].innerText);
        }
        let customer = customerList?.find(custie => custie.email === values[1]);
        setCustomer( customer!);
        searchBox.value = customer!.name;
        setShowCustomerMenu(false);

    }

    const clickProductHandler = async (e:any) => {
        let selection;
        e.target.className === 'resultsRow' ? selection = e.target : selection = e.target.parentElement;
        const searchBox = document.getElementById('productSearch') as HTMLInputElement;
        let values:any = []
        let row_elems = selection.childNodes;
        for (let i=0; i < row_elems.length; i++) {
            values.push(row_elems[i].innerText);
        }
        let product = productList?.find(product => product.name === values[0]);
        setProduct( () => product!);
        searchBox.value = product!.name;
        setShowProductMenu(false);
    }

    const handleCheckboxClick = (e:any) => {
        const isChecked = e.target.checked;
        switch(e.target.id) {
            case('memoCheckbox'):
                if(isChecked) {
                    setShowMemoText(() => true);
                } else {
                    setShowMemoText(() => false);
                    setMemo(() => '');
                }
                break;
            case('footerCheckbox'):
                if(isChecked) {
                    setShowFooterText(() => true);
                } else {
                    setShowFooterText(() => false);
                    setFooter(() => '');
                }
                break;
        }
    }

    const handleTextAreaOnChange = (e:any) => {
        switch(e.target.id) {
            case('memoText'):
                setMemo(() => e.target?.value!)
                break;
            case('footerText'):
                setFooter(() => e.target?.value!)
                break;
        }
    }

    const handleDueDateOnChange = (e:any) => {
        setDueDate(e.target.value);
    }

    const handleReviewButtonClick = async (e:any) => {
        const newInvoice = {
            collection_method: "send_invoice",
            auto_advance: "false",
            currency: "usd",
            customer: customer?.id,
            status: "draft",
            due_date: dueDate,
        }
        
        const invoice = await createInvoice(newInvoice, accessToken)
            .then( (response:any) => response.json())
            .then( (invoiceObj) => invoiceObj['invoiceResponse']);

        const invoiceItem = await createInvoiceItem({customer:customer?.id, price:product?.price, invoice: invoice?.id}, accessToken)
            .then( (response:any) => response.json())
            .then((invoiceResponse) => invoiceResponse['invoiceItemResponse']);
        setInvoiceItem(invoiceItem);
        const draft = await getInvoice(invoice.id, accessToken)
        .then( (response:any) => response.json());
        setReviewVisibility(true);
        setDraftInvoice(draft);
    }
    
    const deleteInvoice = async (e:any) => {
        const deleteInvoiceResponse = await deleteDraftInvoice(draftInvoice.id, accessToken);
        setDraftInvoice(null);
        setReviewVisibility(() => false); 
        setEditDraft(() => true);
    }

    const finalizeDraftInvoice = async (e:any) => {
        const finalizeResponse = await finalizeInvoice(draftInvoice.id, accessToken);
        setReviewVisibility(false);
    }
    const handleCancelButtonClick = async (e:any) => {
        if(draftInvoice != null) {
            const invoiceId = draftInvoice.id;
            const results = await deleteDraftInvoice(invoiceId, accessToken)
            .then( (response:any) => response.json())
        }
        // clear all the fields
        setCustomer({
            name: '',
            email: '',
            id: ''
        });
        
        setProduct({
            id: '',
            description: '',
            name: '',
            price: ''
        });

        setDueDate(null);
        setMemo('');
        setFooter('');
        setShowFooterText(false);
        setShowMemoText(false);
    }

    return(
        <>
        {reviewVisibility ? 
        <ReviewPopUp customer={customer} 
            invoice={draftInvoice} 
            memo={memo} 
            footer={footer} 
            onclick={deleteInvoice} 
            finalizeClick={finalizeDraftInvoice}/> : 
        <></>}
        <section className='invoicePageContainer'>
            <section className='invoicesection addCustomer'>
                <h2>
                    Customer
                </h2>
                <div className='searchField'>
                    <SearchBoxComponent 
                        onChange={customerSearchInputHandler}
                        placeholder="Find customer"
                        name="customerSearch"
                        id="customerSearch"
                        className="searchbox"
                    />
                    { showCustomerMenu ? <ConsumerListComponent data={customerList} clickHandler={clickCustomerHandler} /> : <></> }
                </div>
            </section>
            <section className='invoicesection addInvoiceProduct'>
                <h2>
                    Services
                </h2>
                <div className='searchField'>
                    <SearchBoxComponent 
                        onChange={productSearchInputHandler}
                        placeholder="Find Service"
                        name="productSearch"
                        id="productSearch"
                        className="searchbox"
                    />
                    
                    { showProductMenu ? <ProductListComponent data={productList} clickHandler={clickProductHandler} /> : <></> }
                </div>
            </section>
            <section className='invoicesection dueDate'>
                <h2>
                    Due Date
                </h2>
                <label htmlFor="dueDate">Invoice Payment Due Date:</label>
                <input type="date" id="dueDate" name="dueDate" onChange={handleDueDateOnChange}></input>
            </section>
            <section className='invoicesection moreOptions'>
                <h2>
                    More Options
                </h2>
                <section className='optionalSetting'>
                    <div className="optionCheckboxContainer">
                        <input type="checkbox" id="memoCheckbox" name="memoCheckbox" onClick={handleCheckboxClick } checked={showMemoText}/>
                        <label htmlFor="memo">Memo</label>
                    </div>
                    {showMemoText ? <textarea id="memoText" name="memoText" onInput={handleTextAreaOnChange}></textarea> : <></>}
                </section>
                <section className='optionalSetting'>
                    <div className="optionCheckboxContainer">
                        <input type="checkbox" id="footerCheckbox" name="footerCheckbox" onClick={handleCheckboxClick} checked={showFooterText}/>
                        <label htmlFor='footer'>Footer</label>
                    </div>
                     {showFooterText ? <textarea id="footerText" name="footerText" onInput={handleTextAreaOnChange}></textarea> : <></>}
                </section>
            </section>
            <div className='buttonContainer'>
                <button className='reviewInvoiceButton' onClick={handleReviewButtonClick}>Review Invoice</button>
                <button className='cancelButton' onClick={handleCancelButtonClick}>Cancel Invoice</button>
            </div>
            
        </section>
        </>
    );
}


export default InvoiceComponent;