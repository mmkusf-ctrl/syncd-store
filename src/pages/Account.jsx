import PageTransition from "../components/PageTransition.jsx";
import "./Account.css";

export default function Account() {
  return (
    <PageTransition>
      <div className="acct">
        <h1>Account</h1>
        <p>Account page is loading correctly.</p>
      </div>
    </PageTransition>
  );
}
