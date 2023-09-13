import Input from "@/components/Input";
import Link from "next/link";
import { useState, useCallback } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVaiant) =>
      currentVaiant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-fixed bg-no-repeat bg-cover bg-center ">
      <div className="bg-black h-full w-full lg:bg-opacity-50 sm:bg-opacity-50">
        <Link href={"/"}>
          <nav className="px-11 py-6">
            <img
              src="/images/logo1.png"
              alt="Netflix Logo"
              className="h-11 cursor-pointer"
            />
          </nav>
        </Link>
        <div className="flex justify-center">
          <div className=" bg-black opacity-90 px-16 py-16 self-center mt-2 sm:w-2/5 sm:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl font-bold mb-8">
              {variant === "login" ? "Sign In" : "Sign Up"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email or phone number"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              // onClick={login}
              type="submit"
              className="bg-red-600 text-white py-3 rounded-md w-full mt-4 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Register"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center ">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "New to Netflix?"
                : "Already have an account"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Sign Up now" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
