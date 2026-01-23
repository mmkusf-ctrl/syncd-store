import { useEffect, useState } from "react";
import "./PageTransition.css";

export default function PageTransition({ routeKey, children }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    setPhase("enter");
    const t = setTimeout(() => setPhase("entered"), 20);
    return () => clearTimeout(t);
  }, [routeKey]);

  return <div className={`pt ${phase}`}>{children}</div>;
}
