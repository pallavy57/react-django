import './style.css';
import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import RenderRazorpay from './RazorPay';
import axios from 'axios';
function PPage() {
  const location = useLocation();
  console.log(location.state.pro.id)
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
    productId:null,
    userId:null
  });

  const handleCreateOrder = async () => {
    const result = await axios.post(`http://localhost:8002/apis/razorpay_order/`,
      {
        amount: 200 * 100, //convert amount into lowest unit. here, Dollar->Cents
        currency: "INR",
        keyId: 'rzp_test_t0LPta6Aht96fl',
        keySecret: 'CD2QelWa0ufY4lZFb6j36oOq',
        product_id:location.state.pro.id,
        userId:1
      }
    );

    console.log(result);

    if (result.data.resp && result.data.resp.orderId) {
      setOrderDetails({
        orderId: result.data.resp.orderId,
        currency: result.data.resp.currency,
        amount: result.data.resp.amount,
        productId:result.data.resp.productId,
        userId:result.data.resp.userId
      });
      setDisplayRazorpay(true);
    };
  }
console.log(displayRazorpay);
  
    return (
      <React.Fragment>
        <label>
          Pick a fruit:
          <select name="selectedFruit">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </label>
        <button type="button" class="buy" onClick={handleCreateOrder} >
          Pay
        </button>

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

  export default PPage;