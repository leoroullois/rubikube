import PrivateRoute from "@components/auth/private-route";
import Wrapper from "@components/wrapper";
import { selectUser } from "@store/selectors";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";

const Presentational = () => {
   const { email } = useSelector(selectUser);
   return (
      <>
         <Head>
            <title>Dashboard - RubyCube</title>
         </Head>
         <main>
            <Wrapper className='flex-col'>
               <h1 className='text-3xl font-bold'>Dashboard</h1>
               <h2 className='text-xl font-semibold'>Your email : {email}</h2>
               <p className='text-gray-700'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  excepturi sint, eligendi, nisi fugit deleniti ad adipisci
                  temporibus tempora dolore aliquam quasi, fugiat iusto. Aliquid
                  perspiciatis dolor amet ab accusantium.
               </p>
            </Wrapper>
         </main>
      </>
   );
};
const Dashboard = () => {
   return (
      <PrivateRoute>
         <Presentational />
      </PrivateRoute>
   );
};
export default Dashboard;

