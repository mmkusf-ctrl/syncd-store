import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // triggers transition after mount
    setShow(true);
  }, []);

  return <div className={`page ${show ? "page-show" : ""}`}>{children}</div>;
}
