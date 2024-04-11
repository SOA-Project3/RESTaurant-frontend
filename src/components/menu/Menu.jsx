import Card from "@/components/card/Card";
import styles from "./menu.module.css";
const Menu = ({ menu }) => {
  return (
    <div className={styles.container}>
      {menu.map((meal) => (
        <div className={styles.card} key={meal.name}>
          <Card
            title={meal.name}
            description={meal.description}
            footer={meal.price}
          />
        </div>
      ))}
    </div>
  );
};

export default Menu;
