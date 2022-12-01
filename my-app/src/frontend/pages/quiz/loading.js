import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ReactLoading
        type="bubbles"
        sx={{ color: "primary.contrastText" }}
        height={300}
        width={150}
      />
    </div>
  );
}
