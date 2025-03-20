import React from "react";
import { BallTriangle } from "react-loader-spinner"; // تأكد من استيراد BallTriangle

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-60">
      <BallTriangle
        height={80}
        width={80}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
