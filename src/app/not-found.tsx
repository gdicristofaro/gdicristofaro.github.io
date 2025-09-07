"use client";

import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);
  return <div></div>;
};

export default NotFound;