import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [loading,  setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableMeals = async () => {
      const response = await fetch("https://dishdash-a100e-default-rtdb.firebaseio.com/meals.json");

      if(!response.ok) {
        throw new Error ("Something went wrong!")
      };

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchAvailableMeals().catch(error => {
      setLoading(false);
      setError(error.message)
    });
    
  }, []);

  if (loading) {
    return (
      <section>
       <p className="text-center text-black fs-5 mt-5">Loading...</p>
      </section>
      )
    };

  if (error) {
    return (
      <section>
       <p className="text-center text-danger fs-5 mt-5">Something went wrong!</p>
      </section>
      )
    };

  return (
    <section className="meals">
      <Card>
        <ul>
          {meals.map((meal) => (
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
