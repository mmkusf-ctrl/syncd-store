import PageTransition from "../components/PageTransition.jsx";
import "./PremiumSub.css";

export default function PremiumSub() {
  return (
    <PageTransition>
      <div className="premium-sub">
        {/* Put your existing PremiumSub page content here */}
        <h1 style={{ padding: 22, fontFamily: "Arial, sans-serif" }}>
          Premium Sub Page
        </h1>
      </div>
    </PageTransition>
  );
}
