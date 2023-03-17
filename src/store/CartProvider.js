import { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount 
        };
    };

    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id ) //all items not equal to the action.id are kept because this returns true, else items equal to the action.id would be removed because then the statement returns false
        } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount 
        };
    };

    if (action.type === "CLEAR") {
        return initialState;
    };

    return initialState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

    const addItemsToCart = (item) => {
        dispatchCartAction({type: "ADD_ITEM", item: item});
    };

    const removeItemsFromCart = (id) => {
        dispatchCartAction({type: "REMOVE_ITEM", id: id});
    };

    const clearCartItems = () => {
        dispatchCartAction({type: "CLEAR"});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemsToCart,
        removeItem: removeItemsFromCart,
        clearCart: clearCartItems
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;