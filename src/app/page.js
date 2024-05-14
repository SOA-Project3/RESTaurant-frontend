"use client";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { getMenu } from "@/services";
import Menu from "@/components/menu/Menu";



const Home = () => {

  const { menu, setMenu } = useAppContext(); // react context to handle menu as an app-wide variable
  const [meals, setMeals] = useState(null); // state that handles meals in screen

  useEffect(() => {
    const fetchMenu = async () => {
      if (!menu) {
        try {
          const data = await getMenu(); // use service that fetches menu data
          setMenu(data.menu); // set meals in context
          setMeals(data.menu.meal); // set meals in local state
        } catch (error) {
          console.error("Menu fetch error:", error.message);
        }
      }
    };

    if (!menu) fetchMenu(); // if data hasn't been fetched
    else setMeals(menu.meal); // if data is already available, render meals
  }, [menu, setMenu]);

  if (!!meals) return <Menu menu={meals} />; // render Menu
};

export default Home;
