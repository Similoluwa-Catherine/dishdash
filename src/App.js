import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

const App = () => {
  return (
    <CartProvider>
      <Header />
      <Meals />
    </CartProvider>
  );
};

export default App;

