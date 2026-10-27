import { useForm } from "react-hook-form";
import styles from "../styles/Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkUser } from "../api/authApi";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function Login() {
  const { setAccessTokens } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be 6 characters"),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const sendData = async (data) => {
    try {
      const res = await checkUser(data.email, data.password);

      if (res.status == 200) {
        setAccessTokens(res.data.accessToken);
        reset();
        console.log(res.data);
        console.log(res.data.name);
        console.log(data);

        localStorage.setItem("username", res.data.name);
        navigate("/chat");
      }
    } catch (error) {
      console.log(
        "this is error msg console from login catch",
        error.response?.data?.msg || "login failed",
      );
      setError(error.response?.data?.msg);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h2>Welcome Back!</h2>
          <form onSubmit={handleSubmit(sendData)}>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name=""
                id=""
                {...register("email")}
                placeholder="e.g., name@example.com"
              />
              {errors.email && (
                <div className={styles.errorMsg}>{errors.email.message}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                name=""
                id=""
                {...register("password")}
                placeholder="Password must be 6 characters"
              />
              {errors.password && (
                <div className={styles.errorMsg}>{errors.password.message}</div>
              )}
            </div>

            <div className={styles.forgotPassword}>
              <div className={styles.errorblock}>{error} </div>
              <Link to="#">Forgot Password ?</Link>
            </div>
            <button type="submit" className={styles.loginBtn}>
              Sign in
            </button>
          </form>
          <div className={styles.divider}>
            <span>or</span>
          </div>
          <div className="googleAuth">
            <button className={styles.googleLogin}>Continue with Google</button>
          </div>
          <div className={styles.register}>
            <span>No account?</span>
            <Link to="/">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
