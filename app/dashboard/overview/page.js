'use client';
import { useEffect } from "react";

function Overviewpage() {
      useEffect(() => {
    fetch("/api/visitor", {
      method: "POST"
    });
  }, []);
  return (
    <div>Overviewpage</div>
  )
}

export default Overviewpage