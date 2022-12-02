import React from "react";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";

export default function Loading() {
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    const value = localStorage.getItem("theme");
    console.log("type: " + typeof value);
    console.log("value: " + value);
    value == "true" ? setBgColor("#F5ECE3") : setBgColor("#02407F");
  });
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/*
       */}
      <ReactLoading type="bubbles" color={bgColor} height={150} width={150} />
    </div>
  );
}
