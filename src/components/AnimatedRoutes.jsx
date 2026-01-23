import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AnimatedRoutes.css";

export default function AnimatedRoutes({ children }) {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    // trigger transition on path change
    setKey(location.pathname);
  }, [location.pathname]);

  return (
    <div className="route-shell">
      <div key={key} className="route-fade">
        {children}
      </div>
    </div>
  );
}
