"use client";

import supabase from "@/utils/supabaseClient";
import React from "react";

const Testing = (thing: any) =>
  // Products: any
  {
    function testing(
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void {
      console.log(thing);
    }

    // if (error || !data?.user) {
    //   redirect('/login')
    // }
    return (
      <>
        {/* <p>Hello {data?.user?.email}</p> */}
        <button onClick={testing}>trest</button>
      </>
    );
  };

export default Testing;
