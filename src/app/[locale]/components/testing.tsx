"use client";

import React from "react";

const Testing = (Products: any) => {
  function testing(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    console.log(Products);
  }
  return <button onClick={testing}>trest</button>;
};

export default Testing;
