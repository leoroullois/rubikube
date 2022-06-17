import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import PrivateRoute from "@components/auth/private-route";
import AllTimes from "@components/dashboard/all-times";
import Averages from "@components/dashboard/averages";
import MoreStats from "@components/dashboard/more-stats";
import Overview from "@components/dashboard/overview";
import YourTimes from "@components/dashboard/your-times";
import Wrapper from "@components/wrapper";

const Dashboard: NextPage = () => {
  return (
    <PrivateRoute>
      <Head>
        <title>Dashboard - RubyCube</title>
      </Head>
      <main>
        <Wrapper className="flex-col gap-y-5 py-5">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h2>👋 Hey there, welcome to your dashboard !</h2>
          <p className="text-gray-700">
            Here you have access to advanced statistics about your solves.
            Including your best time, your averages, your total number of
            solves, and some beautiful graphics...
          </p>
          <div className="flex flex-col justify-between md:flex-row flex-wrap gap-y-5 gap-x-3">
            <Overview />
            <YourTimes />
            <Averages />
            <MoreStats />
            <AllTimes />
          </div>
        </Wrapper>
      </main>
    </PrivateRoute>
  );
};

export default Dashboard;
