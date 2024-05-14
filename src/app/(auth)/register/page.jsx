import styles from "./register.module.css";
import RegisterForm from "@/components/registerForm/registerForm";
import { registerUser } from "@/lib/action";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm registerAction={registerUser} redirect={true} />
        <Link href="/login">
          Already have an account? <b>Login</b>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
