"use client";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { getMenu } from "@/services";
import Menu from "@/components/menu/Menu";
const Home = () => {
  const { menu, setMenu } = useAppContext();
  const [meals, setMeals] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!menu) {
        try {
          const data = await getMenu();
          setMenu(data.menu);
          setMeals(data.menu.meal);
        } catch (error) {
          console.error("Menu fetch error:", error.message);
        }
      }
    };

    if (!menu) fetchMenu();
    else setMeals(menu.meal);
  }, [menu, setMenu]); // Only re-run the effect if menu or setMenu changes

  if (!!meals) return <Menu menu={meals} />;
};

export default Home;
