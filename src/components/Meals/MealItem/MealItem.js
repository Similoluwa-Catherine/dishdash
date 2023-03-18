import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = quantity => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity: quantity,
      price:props.price
    });
  };

  return (
    <li className="meal d-lg-flex justify-content-between">
      <div>
        <h3 className="fs-5 fw-bold">{props.name}</h3>
        <div className="fst-italic">{props.description}</div>
        <div className="price">₦{props.price}</div>
      </div>
      <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
    </li>
  );
};

export default MealItem;
