import './style.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import RenderRazorpay from './RazorPay';

function CartPage() {
    const [products, setproducts] = React.useState(localStorage.getItem("allEntries") || [])
    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        orderId: null,
        currency: null,
        amount: null,
        productId: [],
        userId: null
    });

    const [related_products, setrelated_products] = React.useState([])
    const [cart_items, setcart_items] = React.useState([])


    const handleCreateOrder = async () => {

        const result = await axios.post(`http://localhost:8002/apis/razorpay_order/`,
            {
                amount: 200 * 100, //convert amount into lowest unit. here, Dollar->Cents
                currency: "INR",
                keyId: 'rzp_test_t0LPta6Aht96fl',
                keySecret: 'CD2QelWa0ufY4lZFb6j36oOq',
                product_id: JSON.parse(products),
                userId: 1
            }
        );

        console.log(result)

        if (result.data.resp && result.data.resp.orderId) {
            setOrderDetails({
                orderId: result.data.resp.orderId,
                currency: result.data.resp.currency,
                amount: result.data.resp.amount,
                productId: result.data.resp.productId,
                userId: result.data.resp.userId
            });
            setDisplayRazorpay(true);
        };
    }

    React.useEffect(() => {
        axios.post(`http://localhost:8002/apis/get_people_also_bought/`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                mode: 'no-cors',
            }
            ,
            productId: JSON.parse(products)
        }).then((response) => {
            setrelated_products(response.data.resp);
        });

    }, [])

    React.useEffect(() => {
        axios.post(`http://localhost:8002/apis/get_products_by_id/`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                mode: 'no-cors',
            }
            ,
            productId: JSON.parse(products)
        }).then((response) => {
            console.log(response.data.resp)
            setcart_items(response.data.resp)
        });

    }, [])
    return (
        <React.Fragment>
            <div className='container_01'>
                {cart_items ? cart_items.map(pro => {
                    return <div class="row">
                    <div class="column">{pro.name}</div>
                    <div class="column">${pro.price}</div>
                  </div>
                    
                    
                
                }) : null}
            </div>
            <button type="button" class="buy" onClick={handleCreateOrder} >
                Pay
            </button>

            <div className='container'>
                {related_products ? related_products.map(pro => {
                    return <div class="card">
                        <div class="imgBx">
                            <img src={pro.image} alt="" />
                        </div>
                        <div class="contextBx">
                            <h3>{pro.name}</h3>
                            <h2 class="price">${pro.price}<small>.22</small></h2>
                            <button type="button" class="buy">
                                View Product
                            </button>

                        </div>
                    </div>
                }) : null}
            </div>

            {displayRazorpay && (
                <RenderRazorpay
                    amount={orderDetails.amount}
                    currency={orderDetails.currency}
                    orderId={orderDetails.orderId}
                    productId={orderDetails.productId}
                    userId={orderDetails.userId}
                    keyId={'rzp_test_t0LPta6Aht96fl'}
                    keySecret={'CD2QelWa0ufY4lZFb6j36oOq'}
                />
            )
            }
        </React.Fragment>
    );
}

export default CartPage;