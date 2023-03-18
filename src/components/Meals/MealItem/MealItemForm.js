import { useState, useRef } from "react";

const MealItemForm = (props) => {
  const [quantity, setQuantity] = useState("");
  const [quantityIsValid, setQuantityIsValid] = useState(true);


  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));
    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const quantityInputRef = useRef();

  const addMealHandler = event => {
    event.preventDefault();
    const enteredQuantity =  quantityInputRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;

    if (enteredQuantity.trim().length === 0 || enteredQuantityNumber < 1) {
      setQuantityIsValid(false);
      return;
    } else {
      setQuantityIsValid(true);
    }

    props.onAddToCart(enteredQuantityNumber);
    setQuantity("");
  };

  return (
    <div className="mt-lg-0 mt-3">
      <form className="d-flex align-items-center mb-1">
        <label className="form-label fw-bold me-3 mt-1">Quantity</label>
        <input
          ref={quantityInputRef}
          id= "quantity_ + props.id"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onPaste={preventPasteNegative}
          onKeyPress={preventMinus}
          className="input"
        />
      </form>
      {!quantityIsValid ? <p className="text-danger fst-italic">Please enter a valid quantity</p> : "" }
      <button className="add-btn w-100" onClick={addMealHandler}>+ Add</button>
    </div>
  );
};

export default MealItemForm;
