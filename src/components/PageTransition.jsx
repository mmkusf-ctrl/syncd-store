import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger fade-in on mount
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`page ${visible ? "page--in" : ""}`}>
      {children}
    </div>
  );
}

import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`page ${show ? "page-show" : ""}`}>
      {children}
    </div>
  );
}
