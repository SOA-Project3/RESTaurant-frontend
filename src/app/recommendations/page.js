"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./recommendations.module.css";
import { useAppContext } from "@/context";
import { getMenu, getRecommendation } from "@/services";

const Recommendations = () => {
  const { menu, setMenu } = useAppContext();
  const [isSending, setIsSending] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [response, setResponse] = useState("");
  const [options, setOptions] = useState(null);

  const [meal, setMeal] = useState("");
  const [drink, setDrink] = useState("");
  const [dessert, setDessert] = useState("");

  const btnTitle = isSending ? "Sending..." : "Send";

  const handleResponse = (res) => {
    setResponse(
      `The combination recommended: ${res.meal}, ${res.drink} and ${res.dessert}`
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    try {
      const result = await getRecommendation(meal, drink, dessert);
      handleResponse(result);
    } catch (error) {
      console.error(error);
      setResponse("Couldn't find a recommendation for that combination.");
      // Handle error (e.g., show an error message)
    }
    setIsSending(false);
  };

  // Handle changing selection
  const handleMealChange = (event) => {
    setMeal(event.target.value);
    setIsDisabled(false);
  };

  const handleDrinkChange = (event) => {
    setDrink(event.target.value);
    setIsDisabled(false);
  };

  const handleDessertChange = (event) => {
    setDessert(event.target.value);
    setIsDisabled(false);
  };

  const handleClear = () => {
    setMeal("");
    setDrink("");
    setDessert("");
    setIsDisabled(true);
  };

  function extractNames(menu) {
    // Extract meal names
    const meals = menu.meal.map((item) => item.name);

    // Extract dessert names
    const desserts = menu.dessert.map((item) => item.name);

    // Extract drink names
    const drinks = menu.drinks.map((item) => item.name);

    // Return the new object with arrays of names
    setOptions({
      meals: meals,
      desserts: desserts,
      drinks: drinks,
    });
  }

  useEffect(() => {
    const fetchMenu = async () => {
      if (!menu) {
        try {
          const data = await getMenu();
          setMenu(data.menu);
          extractNames(data.menu);
        } catch (error) {
          console.error("Menu fetch error:", error.message);
        }
      }
    };

    if (!menu) fetchMenu();
    else extractNames(menu);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={"/chef.svg"} alt="" fill className={styles.img} />
      </div>
      {!!options && (
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.titleContainer}>
              Choose one item to receive a recommendation.
            </div>
            <label>
              Meal:
              <select value={meal} onChange={handleMealChange}>
                <option value="">Select a meal</option>
                {options.meals.map((meal) => (
                  <option key={meal} value={meal}>
                    {meal}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Drink:
              <select value={drink} onChange={handleDrinkChange}>
                <option value="">Select a drink</option>
                {options.drinks.map((drink) => (
                  <option key={drink} value={drink}>
                    {drink}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Dessert:
              <select value={dessert} onChange={handleDessertChange}>
                <option value="">Select a dessert</option>
                {options.desserts.map((dessert) => (
                  <option key={dessert} value={dessert}>
                    {dessert}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="button" onClick={handleClear}>
              Clear Selections
            </button>
            {!isDisabled && <button type="submit">{btnTitle}</button>}
          </form>
          {!!response && (
            <div className={styles.responseContainer}>{response}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
