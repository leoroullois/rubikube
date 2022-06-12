import { FirebaseError } from "firebase/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";

import AuthBtn from "@components/buttons/auth-btn";
import Wrapper from "@components/wrapper";
import logo from "@public/logos/cube-2-inline.svg";
import { login } from "@store/slices/auth";
import { AppDispatch } from "@store/store";

const matchCodeError = (error: string): string => {
  switch (error) {
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
      return "Wrong password";
    default:
      return "Unknown error";
  }
};

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    console.log("submit");

    try {
      setError("");
      setIsLoading(true);
      await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();
      router.push("/dashboard");
      setEmail("");
      setPassword("");
    } catch (err) {
      const error = err as FirebaseError;
      console.error(error.message);
      console.log(error.cause, error.code);
      setError(error.code);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | RubyCube</title>
      </Head>
      <main>
        <Wrapper className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center bg-gray-400/20 dark:bg-gray-100/5 backdrop-blur-md p-12 gap-y-5 w-full max-w-xl rounded-lg shadow-lg"
          >
            <Image
              src={logo}
              height={50 * 2}
              width={150 * 2}
              alt="Rubik's cube"
            />
            <h1 className="w-full text-2xl font-bold">Log In</h1>
            <h2 className="w-full text-lg font text-gray-500 dark:text-gray-300">
              Welcome back! Please enter your credentials.
            </h2>
            <div className="w-full">
              <label
                htmlFor="email"
                className="text-lg text-left w-full after:content-['*'] after:ml-1 after:text-red-500"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                required
                placeholder="example@email.com"
                value={email}
                onChange={handleEmail}
                className="w-full mt-2 px-4 py-2 rounded-lg shadow-sm focus:ring border border-neutral-900/20 outline-none duration-150"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="Password"
                className="text-lg text-left w-full after:content-['*'] after:ml-1 after:text-red-500"
              >
                Password
              </label>
              <input
                type="password"
                name="Password"
                id="Password"
                placeholder="Enter password here..."
                value={password}
                onChange={handlePassword}
                required
                className="w-full mt-2 px-4 py-2 rounded-lg shadow-sm focus:ring border border-neutral-900/20 outline-none duration-150"
              />
            </div>

            <AuthBtn isLoading={isLoading}>Log In</AuthBtn>

            <p>
              {" "}
              Don&apos;t have an account ?{" "}
              <Link href="/register">
                <a className="text-blue-500 hover:underline">Sign Up</a>
              </Link>
            </p>

            {!!error && (
              <p
                key={error}
                className="list-disc text-red-500 w-full text-left"
              >
                {matchCodeError(error)}
              </p>
            )}
          </form>
        </Wrapper>
      </main>
    </>
  );
};

export default Login;
