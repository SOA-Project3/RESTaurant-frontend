"use client";
import { useAppContext } from "@/context";
import { getMenu } from "@/services";
import { useEffect } from "react";

const Desserts = () => {
  const { menu, setMenu } = useAppContext();

  useEffect(() => {
    const fetchMenu = async () => {
      if (!menu) {
        try {
          const menuData = await getMenu();
          setMenu(menuData);
        } catch (error) {
          console.error("Menu fetch error:", error.message);
        }
      }
    };

    if (!menu) fetchMenu();
  }, [menu, setMenu]); // Only re-run the effect if menu or setMenu changes

  return <div>Desserts</div>;
};

export default Desserts;
