import Wrapper from "@components/wrapper";
import Head from "next/head";
import CubeInlineOblique from "@components/logos/cube-2-oblique";
import SignUp from "@components/buttons/border-btn";
import AuthBtn from "@components/buttons/auth-btn";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@store/slices/auth";
import { selectUser } from "@store/selectors";
import { AppDispatch } from "@store/store";
import { useRouter } from "next/router";

const Register = () => {
   const dispatch = useDispatch<AppDispatch>();
   const router = useRouter();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const handleSubmit: FormEventHandler = async (e) => {
      e.preventDefault();
      console.log("submit");
      try {
         await dispatch(
            register({
               email,
               password,
            })
         ).unwrap();

         router.push("/dashboard");

         setEmail("");
         setPassword("");
         setConfirmPassword("");
      } catch (err) {
         console.error("Failed to register", err);
      }
   };

   const handleEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();
      setEmail(e.target.value);
   };
   const handlePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();
      setPassword(e.target.value);
   };
   const handleConfirmPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();
      setConfirmPassword(e.target.value);
   };

   return (
      <>
         <Head>
            <title>Sign Up | RubyCube</title>
         </Head>
         <main>
            <Wrapper className='flex items-center justify-center'>
               <form
                  onSubmit={handleSubmit}
                  className='flex flex-col items-center bg-gray-400/20 px-8 py-4 gap-y-5 w-96'
               >
                  <CubeInlineOblique />
                  <p>Create your account</p>
                  <div className='flex flex-col w-full'>
                     <label htmlFor='email' className='text-left w-full'>
                        Email
                     </label>
                     <input
                        type='text'
                        name='email'
                        id='email'
                        placeholder='example@email.com'
                        className='w-full'
                        onChange={handleEmail}
                        value={email}
                     />
                  </div>
                  <div className='flex flex-col w-full'>
                     <label htmlFor='password' className='text-left w-full'>
                        Password
                     </label>
                     <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter your password...'
                        className='w-full'
                        value={password}
                        onChange={handlePassword}
                     />
                  </div>
                  <div className='flex flex-col w-full'>
                     <label
                        htmlFor='confirm-password'
                        className='text-left w-full'
                     >
                        Confirm password
                     </label>
                     <input
                        type='password'
                        name='confirm-password'
                        id='confirm-password'
                        placeholder='Confirm your password...'
                        className='w-full'
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                     />
                  </div>
                  <AuthBtn>Sign Up</AuthBtn>
               </form>
            </Wrapper>
         </main>
      </>
   );
};

export default Register;

