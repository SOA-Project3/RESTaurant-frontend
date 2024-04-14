"use client";
import { useAppContext } from "@/context";
import { getMenu } from "@/services";
import { useEffect, useState } from "react";
import Menu from "@/components/menu/Menu";

const Desserts = () => {
  const { menu, setMenu } = useAppContext();
  const [desserts, setDesserts] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!menu) {
        try {
          const data = await getMenu();
          setMenu(data.menu);
          setDesserts(data.menu.dessert);
        } catch (error) {
          console.error("Menu fetch error:", error.message);
        }
      }
    };

    if (!menu) fetchMenu();
    else setDesserts(menu.dessert);
  }, [menu, setMenu]); // Only re-run the effect if menu or setMenu changes

  if (!!desserts) return <Menu menu={desserts} />;
};

export default Desserts;
