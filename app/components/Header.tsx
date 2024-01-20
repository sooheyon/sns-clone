"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  const { data: session } = useSession();

  const onClickSignIn = () => {
    signIn();
  };

  const onClickSignOut = () => {
    signOut();
  };

  if (!session) {
    return (
      <div>
        <button onClick={onClickSignIn}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="bg-red-100">
       <button onClick={onClickSignOut}>Sign out</button>
      <Link href='/post/create'>Create</Link>
    </div>
  );
};

export default Header;
