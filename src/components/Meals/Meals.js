import AvailableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <div className="container-fluid">
      <section className="summary">
        <h2 className="fs-4 mb-3">Delicious Food, Delivered To You</h2>
        <p className="fs-6"> 
          Choose your favorite meal from our broad selection of available meals, cooked with high-quality ingredients, just-in-time
           by experienced chefs and enjoy a delicious lunch or dinner at home.
        </p>
      </section>
      <AvailableMeals />

    </div>
  ); 
};

export default Meals;
