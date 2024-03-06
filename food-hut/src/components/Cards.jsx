import React, { useEffect, useRef, useState } from 'react';
import { useCartDispatch, useCartState } from './ContextReducer';

export default function Cards(props) {
  let options = props.options;
  let dispatch = useCartDispatch();
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItems;
  let data = useCartState();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddtoCart = async () => {

    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE_ITEM",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty
        });
        return
      }
      else if (food.size !== size) {
        await dispatch({
          type: "ADD_ITEM",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size
        });
        return
      }
      return
    }
    await dispatch({
      type: "ADD_ITEM",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size
    });
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{ width: "20vw", maxHeight: "420px" }}>
        <img className="card-img-top" src={props.foodItem.img} style={{ height: "150px", objectFit: "fill" }} alt={props.foodItem.name} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.descriptionFood}</p>
          <div className="container w-100">
            <select className='h-100 m-2 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className='m-2 h-100 rounded bg-success' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='fs-5 d-inline'>Rs.{finalPrice}/-</div>
          </div>
          <hr />
          <button className='btn btn-success justify-center ms-5' onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
