"use client";
import { useAppContext } from "@/context";

const Drinks = () => {
  const { menu, setMenu } = useAppContext();
  return <div>{menu.dessert}</div>;
};

export default Drinks;
