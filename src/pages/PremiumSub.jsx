import { useParams } from "react-router-dom";

export default function PremiumSub() {
  const { type } = useParams();

  return (
    <div style={{ padding: 40, position: "relative", zIndex: 2 }}>
      <h2 style={{ letterSpacing: 1 }}>
        PREMIUM COLLECTION / {type.toUpperCase()}
      </h2>

      <p style={{ marginTop: 20, opacity: 0.7 }}>
        Products for {type} will appear here.
      </p>
    </div>
  );
}
