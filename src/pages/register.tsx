import Wrapper from "@components/wrapper";
import Head from "next/head";
import CubeInlineOblique from "@components/logos/cube-2-oblique";
import SignUp from "@components/buttons/border-btn";
import AuthBtn from "@components/buttons/auth-btn";

const Register = () => {
   return (
      <>
         <Head>
            <title>Sign Up | RubyCube</title>
         </Head>
         <main>
            <Wrapper className='flex items-center justify-center'>
               <form className='flex flex-col items-center bg-gray-400/20 px-8 py-4 gap-y-5 w-96'>
                  <CubeInlineOblique />
                  <p>Create your account</p>
                  <label htmlFor='Last Name' className='text-left w-full'>
                     Last Name
                  </label>
                  <input
                     type='text'
                     name='Last Name'
                     id='Last Name'
                     placeholder='Last Name'
                     className='w-full'
                  />
                  <label htmlFor='First Name' className='text-left w-full'>
                     First Name
                  </label>
                  <input
                     type='text'
                     name='First Name'
                     id='First Name'
                     placeholder='First Name'
                     className='w-full'
                  />
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
                  <AuthBtn>Sign Up</AuthBtn>
               </form>
            </Wrapper>
         </main>
      </>
   );
};

export default Register;

