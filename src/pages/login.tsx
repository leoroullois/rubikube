import Wrapper from "@components/wrapper";
import Head from "next/head";
import CubeInlineOblique from "@components/logos/cube-2-oblique";
import SignUp from "@components/buttons/border-btn";
import AuthBtn from "@components/buttons/auth-btn";

const Login = () => {
   return (
      <>
         <Head>
            <title>Login | RubyCube</title>
         </Head>
         <main>
            <Wrapper className='flex items-center justify-center'>
               <form className='flex flex-col items-center bg-gray-400/20 p-12 gap-y-5 w-96'>
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

