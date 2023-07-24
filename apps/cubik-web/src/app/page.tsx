"use client";
import type { NextPage } from "next";
import LandingPage from "@/app/components/landing-page/landingPage";
import { useUser } from "@/app//context/user";

const Home: NextPage = () => {
  const { user } = useUser();

  console.log("user", user);

  return (
    <>
      <LandingPage />
    </>
  );
};

export default Home;
