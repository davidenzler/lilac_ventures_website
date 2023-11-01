import React, { useRef, useState, Component, useEffect } from 'react';
import './Invoice.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { searchCustomers } from '../services/customerSearch';
import { searchProducts } from '../services/productSearch';
import { priceLookup } from '../services/priceLookup';
import { createInvoice, createInvoiceItem, getInvoice } from '../services/invoiceServices';


type Customer = {
    name: string,
    email: string,
    id: string
}

type Product = {
    active: boolean,
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

const ReviewPopUp = ({setReviewVisibility, customer, invoice}:any) => {
    console.log("INVOICE OBJ: ", invoice);
    const amount_due_usd:number = invoice.amount_due / 100;
    const options = {  maximumFractionDigits: 2   }   
    const formattedNumber = Intl.NumberFormat("en-US",options).format(amount_due_usd); 
    return (
     <section className="reviewModal">
       <div className="modal_content">
        <span className="close" onClick={() => setReviewVisibility(() => false)}>&times;</span>
        <h1>Invoice Review</h1>
        <section>Send invoice to: {customer.name}</section>
        <section>For total amount: ${formattedNumber}</section>
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
                            <div className="firstColumn">{elem.name}</div>
                            <div className="secondColumn">{elem.email}</div>
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
                            <div className="firstColumn">{elem.name}</div>
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
    const customerSearchName = "customerSearch";
    const ProductSearchName = "ProductSearch";
    const [customer, setCustomer] = useState<Customer>();
    const [isMemo, setisMemo] = useState(false);
    const [memo, setMemo] = useState('');
    const [footer, setFooter] = useState('');
    const [product, setProduct] = useState<Product>();
    const [showMemoText, setShowMemoText] = useState(false);
    const [showFooterText, setShowFooterText] = useState(false);
    const [dueDate, setDueDate] = useState(null);
    const [invoiceItem, setInvoiceItem] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [reviewVisibility, setReviewVisibility] = useState(false);
    const [draftInvoice, setDraftInvoice] = useState<any>(null);


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
        const searchResults: any = await searchCustomers(e.target.value)
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
        const searchResults: any = await searchProducts(e.target.value)
        .then((response: any) => response.json())
        if(searchResults.length === 0) {
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
        
        const invoice = await createInvoice(newInvoice)
            .then( (response:any) => response.json())
            .then( (invoiceObj) => invoiceObj['invoiceResponse']);
        setInvoice(invoice);
        console.log("INVOICE ID: ", invoice.id)

        const invoiceItem = await createInvoiceItem({customer:customer?.id, price:product?.price, invoice: invoice?.id})
            .then( (response:any) => response.json())
            .then((invoiceResponse) => invoiceResponse['invoiceItemResponse']);
        setInvoiceItem(invoiceItem);
        const draft = await getInvoice(invoice.id)
        .then( (response:any) => response.json());
        setReviewVisibility(true);
        setDraftInvoice(draft);
    }

    return(
        <>
        {reviewVisibility ? <ReviewPopUp setReviewVisibility={setReviewVisibility} customer={customer} invoice={draftInvoice}/> : <></>}
        <section className='invoicePageContainer'>
            <section className='invoicesection addCustomer'>
                <h2>
                    Customer
                </h2>
                <div className='searchField'>
                    <SearchBoxComponent 
                        onChange={customerSearchInputHandler}
                        placeholder="Find or add new customer"
                        name="customerSearch"
                        id="customerSearch"
                        className="searchbox"
                    />
                    { showCustomerMenu ? <ConsumerListComponent data={customerList} clickHandler={clickCustomerHandler} /> : <></> }
                </div>
            </section>
            <section className='invoicesection addInvoiceProduct'>
                <h2>
                    Products
                </h2>
                <div className='searchField'>
                    <SearchBoxComponent 
                        onChange={productSearchInputHandler}
                        placeholder="Find or add new Product"
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
                        <input type="checkbox" id="memoCheckbox" name="memoCheckbox" onClick={handleCheckboxClick }/>
                        <label htmlFor="memo">Memo</label>
                    </div>
                    {showMemoText ? <textarea id="memoText" name="memoText" onInput={handleTextAreaOnChange}></textarea> : <></>}
                </section>
                <section className='optionalSetting'>
                    <div className="optionCheckboxContainer">
                        <input type="checkbox" id="footerCheckbox" name="footerCheckbox" onClick={handleCheckboxClick }/>
                        <label htmlFor='footer'>Footer</label>
                    </div>
                     {showFooterText ? <textarea id="footerText" name="footerText" onInput={handleTextAreaOnChange}></textarea> : <></>}
                </section>
            </section>

            <button className='reviewInvoiceButton' onClick={handleReviewButtonClick}>Review Invoice</button>
        </section>
        </>
    );
}


export default InvoiceComponent;