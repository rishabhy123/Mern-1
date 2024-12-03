import  { useEffect, useRef, useState } from 'react';
import { useCartDispatch, useCartState } from './ContextReducer';
import './Cards.css'
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
        return;
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
        return;
      }
      return;
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
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="card-container">
      <div className="card mt-3">
        <img className="card-img-top" src={props.foodItem.img} alt={props.foodItem.name} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.descriptionFood}</p>
          <div className="container w-100">
            <select className='quantity-selector' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className='size-selector' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='price-display'>Rs.{finalPrice}/-</div>
          </div>
          <hr />
          <button className='add-to-cart-btn' onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
