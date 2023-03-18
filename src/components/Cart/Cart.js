import { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = ({ onchange }) => {
  const cartCtx = useContext(CartContext);
  const [checkOut, setCheckOut] = useState(false);
  const [show, setShow] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    onchange();
  };

  const hasItems = cartCtx.items.length > 0;

  const addCartItem = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const removeCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const checkOutHandler = () => {
    setCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://dishdash-a100e-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }).then((response) => {
        if(!response.ok) {
          throw new Error ("Something went wrong!")
        }
        return response;
      }).then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        cartCtx.clearCart();
      }).catch((error) => {
        setIsSubmitting(false);
        setError(error.message);
      })

    

    
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
        {isSubmitting && !error && (
          <p className="text-center text-black p-3">Sending order details...</p>
        )}
        {error && !isSubmitting && (
          <p className="text-center text-danger p-3">Something went wrong, please try again.</p>
        )}
        {submitted ? (
          <div className="p-3">
            <p>
              Successfully sent order details. Your order will be delivered
              shortly. Thank you!
            </p>
            <button
              type="button"
              className="close-btn float-end me-3"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        ) : (
          <Modal.Body>
            <div className="modal-header">
              <h4 className="modal-title">Cart</h4>
              <button
                aria-label="Close"
                onClick={handleClose}
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              {hasItems ? (
                <div>
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
                            <span className="quantity">x {item.quantity}</span>
                          </div>
                        </div>
                        <div>
                          <button
                            className="cartitem-btn"
                            onClick={removeCartItem.bind(null, item.id)}
                          >
                            −
                          </button>
                          <button
                            className="cartitem-btn"
                            onClick={addCartItem.bind(null, item)}
                          >
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between fw-bold fs-4">
                    <span>Total quantity</span>
                    <span>₦{cartCtx.totalQuantity}</span>
                  </div>
                  {checkOut && (
                    <Checkout
                      onConfirm={submitOrderHandler}
                      onCancel={handleClose}
                    />
                  )}
                  {!checkOut ? (
                    <div className="float-end mt-4">
                      <button
                        type="button"
                        className="close-btn me-2"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                      {hasItems && (
                        <button className="order-btn" onClick={checkOutHandler}>
                          Order
                        </button>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <p className="text-center fs-5">Cart is empty</p>
              )}
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default Cart;
