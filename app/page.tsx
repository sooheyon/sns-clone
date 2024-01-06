'use client'

import { NextPage } from "next";
import { signIn,signOut,  useSession } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const onClickSignIn = ()=>{
    signIn()
  }

  const onClickSignOut = ()=>{
    signOut()
  }

  useEffect(()=>{
    console.log(session)
  },[session])

  if(!session) {
    return <div>
      <button onClick={onClickSignIn}>Sign In</button>
    </div>
  }


  return <div className="bg-red-100">
    <button onClick={onClickSignOut}>Sign out</button>
  </div>;
};

export default Home;
