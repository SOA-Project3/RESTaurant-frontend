import LoginForm from "@/components/loginForm/loginForm";
import styles from "./login.module.css";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/action";

const Login = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
