import React from 'react';
import { useCartState, useCartDispatch } from '../components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const data = useCartState();
  const dispatch = useCartDispatch();

  if (!Array.isArray(data) || data.length === 0) {
    return <div className='m-5 w-100 text-center fs-3'>Oops!!! Empty Cart</div>;
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
  
    try {
      const response = await fetch("http://localhost:5000/api/orderdata", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });
  
      console.log("Order response:", response);
  
      if (response.status === 200) {
        dispatch({ type: "DROP_ITEM" });
      } else {
        console.error("Checkout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };
   


  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleRemoveItem = (index) => {
    dispatch({ type: 'REMOVE_ITEM', index });
  };

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => handleRemoveItem(index)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-3' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
