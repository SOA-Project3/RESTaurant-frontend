"use client";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { getMenu } from "@/services";
import Menu from "@/components/menu/Menu";
const Home = () => {
  const { menu, setMenu } = useAppContext();

  const [fetchedMenu, setFetchedMenu] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!menu) {
        try {
          const menuData = await getMenu();
          setMenu(menuData);
          setFetchedMenu(menuData);
          console.log(menuData.menu.meal);
        } catch (error) {
          console.error("Menu fetch error:", error.message);
        }
      }
    };

    if (!menu) fetchMenu();
  }, [menu, setMenu]); // Only re-run the effect if menu or setMenu changes

  if (!!fetchedMenu) return <Menu menu={fetchedMenu.menu} />;
};

export default Home;
