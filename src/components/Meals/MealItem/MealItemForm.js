import { useState, useRef } from "react";

const MealItemForm = (props) => {
  const [amount, setAmount] = useState("");
  const [amountIsValid, setAmountIsValid] = useState(true);


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

  const amountInputRef = useRef();

  const addMealHandler = event => {
    event.preventDefault();
    const enteredAmount =  amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
    setAmount("");
  };

  return (
    <div className="mt-lg-0 mt-3">
      <form className="d-flex align-items-center mb-1">
        <label className="form-label fw-bold me-3 mt-1">Amount</label>
        <input
          ref={amountInputRef}
          id= "amount_ + props.id"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onPaste={preventPasteNegative}
          onKeyPress={preventMinus}
          className="input"
        />
      </form>
      {!amountIsValid && <p className="text-danger fst-italic">Please enter a valid amount</p>}
      <button className="add-btn w-100" onClick={addMealHandler}>+ Add</button>
    </div>
  );
};

export default MealItemForm;
