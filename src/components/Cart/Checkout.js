import { useState } from "react";
import Button from "react-bootstrap/Button";

const Checkout = (props) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const disableConfirmOrder = !name || !street || !city;

  const confirmOrder = (event) => {
    event.preventDefault();

    props.onConfirm({
        name,
        street,
        city
    });
  };

  return (
    <div className="mt-4">
      <p className="fw-bold">Please enter your delivery details below</p>
      <form>
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mt-2">
          <label className="form-label">Street</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mt-2">
          <label className="form-label">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mt-4">
          <Button
            className="order-btn"
            disabled={disableConfirmOrder}
            variant="secondary"
            onClick={confirmOrder}
          >
            Confirm Order
          </Button>
          <Button
            type="button"
            className="close-btn ms-2"
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
