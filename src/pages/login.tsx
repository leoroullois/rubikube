import Wrapper from "@components/wrapper";
import Head from "next/head";
import CubeInlineOblique from "@components/logos/cube-2-oblique";
import SignUp from "@components/buttons/border-btn";
import AuthBtn from "@components/buttons/auth-btn";
import {
   ChangeEventHandler,
   FormEventHandler,
   MouseEventHandler,
   useState,
} from "react";
import { useDispatch } from "react-redux";
import { login } from "@store/slices/auth";
import { AppDispatch } from "@store/store";
import Router, { useRouter } from "next/router";

const Login = () => {
   const dispatch = useDispatch<AppDispatch>();
   const router = useRouter();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

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
         console.error("Failed to login", err);
      }
   };
   return (
      <>
         <Head>
            <title>Login | RubyCube</title>
         </Head>
         <main>
            <Wrapper className='flex items-center justify-center'>
               <form
                  onSubmit={handleSubmit}
                  className='flex flex-col items-center bg-gray-400/20 p-12 gap-y-5 w-96'
               >
                  <CubeInlineOblique />
                  <p>Login to your account</p>
                  <label htmlFor='Username' className='text-left w-full'>
                     Username
                  </label>
                  <input
                     type='text'
                     name='Username'
                     id='Username'
                     placeholder='Username'
                     value={email}
                     onChange={handleEmail}
                     className='w-full'
                  />
                  <label htmlFor='Password' className='text-left w-full'>
                     Password
                  </label>
                  <input
                     type='password'
                     name='Password'
                     id='Password'
                     placeholder='Password'
                     value={password}
                     onChange={handlePassword}
                     className='w-full'
                  />
                  <AuthBtn>Login</AuthBtn>
                  <p>
                     {" "}
                     Don&apos;t have an account ?{" "}
                     <SignUp href='/register'>Sign Up</SignUp>
                  </p>
               </form>
            </Wrapper>
         </main>
      </>
   );
};

export default Login;

