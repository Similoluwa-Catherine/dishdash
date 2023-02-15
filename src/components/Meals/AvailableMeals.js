import { dummyMeals } from "../../helpers.js/dummyMeals";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  return (
    <section className="meals">
      <Card>
        <ul>
          {dummyMeals.map((meal) => (
            <MealItem 
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
