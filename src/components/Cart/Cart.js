import { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import CartContext from "../../store/cart-context";

const Cart = ({ onchange }) => {
  const cartCtx = useContext(CartContext);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onchange();
  };

  const hasItems = cartCtx.items.length > 0;

  const addCartItem = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const removeCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
        scrollable={true}
      >
        <div className="modal-header px-4">
          <h4 className="modal-title">Cart</h4>
          <button
            aria-label="Close"
            onClick={handleClose}
            className="btn-close"
            data-bs-dismiss="modal"
          />
        </div>
        <Modal.Body>
          <div className="modal-body">
           {hasItems ? <div>
           <ul className="cart-items">
              {cartCtx.items.map((item) => (
                <li
                  key={item.id}
                  className="cart-item d-flex justify-content-between"
                >
                  <div className="mb-3">
                    <h2 className="fs-5 fw-bold">{item.name}</h2>
                    <div className="cart-summary">
                      <span className="price">₦{item.price}</span>
                      <span className="amount">x {item.amount}</span>
                    </div>
                  </div>
                  <div>
                    <button className="cartitem-btn" onClick={removeCartItem.bind(null, item.id)}>−</button>
                    <button className="cartitem-btn" onClick={addCartItem.bind(null, item)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fw-bold fs-4">
              <span>Total Amount</span>
              <span>₦{cartCtx.totalAmount}</span>
            </div>
            <div className="float-end mt-4">
              <button className="close-btn me-2" onClick={handleClose}>
                Close
              </button>
              {hasItems && <button className="order-btn">Order</button>}
            </div>
           </div> : <p className="text-center fs-5">Cart is empty</p>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;
