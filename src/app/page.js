"use client";
import { useAppContext } from "@/context";
import { useEffect } from "react";

const Home = () => {
  const { menu, setMenu } = useAppContext();

  useEffect(() => {
    if (!menu) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://us-central1-soa-g6-p2.cloudfunctions.net/backend/menu",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
  }, []);
  return <div>Home</div>;
};

export default Home;
