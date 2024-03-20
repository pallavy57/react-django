import './style.css';
import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Products() {
  const [products, setproducts] = React.useState([])
  React.useEffect(() => {
    axios.post(`http://localhost:8002/apis/getProducts/`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        mode: 'no-cors',
      }
    }).then((response) => {
      setproducts(response.data.resp);
    });

  }, [])


  const navigate = useNavigate();

  function handleClick(pro) {
    return navigate(`/ppage/${pro.id}`,{state:{pro:pro}});
  }
  return (
    <React.Fragment>
      <div className='container'>
        {products.map(pro => {
          return <div class="card">
            <div class="imgBx">
              <img src={pro.image} alt="" />
            </div>
            <div class="contextBx">
              <h3>{pro.name}</h3>
              <h2 class="price">${pro.price}<small>.22</small></h2>
              <button type="button" class="buy" onClick={() => handleClick(pro)}>
                View Product
              </button>

            </div>
          </div>
        })}
      </div>

    </React.Fragment>
  );
}

export default Products;
