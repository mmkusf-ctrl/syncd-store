import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import CollectionSub from "./pages/CollectionSub";
import Cart from "./pages/Cart";
import Account from "./pages/Account";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/collection/:type" element={<Collection />} />
        <Route path="/collection/:type/:sub" element={<CollectionSub />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </HashRouter>
  );
}
