import { useState, useContext, useEffect } from "react";
import cartIcon from "../../assets/cart.svg";
import Meals from "../../assets/meals.jpg";
import Cart from "../Cart/Cart";
import CartContext from "../../store/cart-context";

const Header = () => {
  const cartContx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [createRender, setCreateRender] = useState(false);
  const cart = () => setCreateRender(true);
  const cartRenderStatus = () => setCreateRender(false);

  const { items } = cartContx; //object destructuring, pulling out items from the cart context

  const cartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const openCart = createRender ?
    <Cart onchange={cartRenderStatus} /> : null;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {                                     
      setBtnIsHighlighted(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };                                       //cleanup function
  }, [items])

  return (
    <div>
    {openCart}
      <header className="d-flex justify-content-between py-3 px-lg-5 px-4 shadow-sm">
        <h1 className="fs-3 fw-bold pt-1">DishDash</h1>
        <button className={`cart-btn ${btnIsHighlighted ? "bump" : ""}`} onClick={cart}>
          <img src={cartIcon} alt="cart" className="cart" />
          <span className="badge ms-2">{cartItems}</span>
        </button>
      </header>
      <div className="table">
        <img src={Meals} alt="A table of foods" className="h-100 table-img" />
      </div>
    </div>
  );
};

export default Header;


