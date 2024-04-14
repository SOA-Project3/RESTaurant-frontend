"use client";
import { useAppContext } from "@/context";
import { getMenu } from "@/services";
import { useEffect, useState } from "react";
import Menu from "@/components/menu/Menu";

const Drinks = () => {
  const { menu, setMenu } = useAppContext();
  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!menu) {
        try {
          const data = await getMenu();
          setMenu(data.menu);
          setDrinks(data.menu.drinks);
        } catch (error) {
          console.error("Menu fetch error:", error.message);
        }
      }
    };

    if (!menu) fetchMenu();
    else setDrinks(menu.drinks);
  }, [menu, setMenu]); // Only re-run the effect if menu or setMenu changes

  if (!!drinks) return <Menu menu={drinks} />;
};

export default Drinks;
