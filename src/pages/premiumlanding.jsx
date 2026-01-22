.premium-landing {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Soft white overlay for luxury look */
.premium-landing::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.55);
}

.premium-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 18px 26px;
}

.premium-logo {
  width: 64px;
}

.premium-title {
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 700;
}

/* Button container */
.premium-buttons {
  position: relative;
  z-index: 2;
  height: calc(100vh - 120px);
}

/* Shared button style */
.premium-btn {
  position: absolute;
  left: -400px; /* start off-screen */
  background: rgba(255,255,255,0.9);
  border: 3px solid #000;
  padding: 16px 52px;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 14px;
  cursor: pointer;
  min-width: 260px;
}

/* Final positions */
.slide-1 { animation: slideIn 1.8s ease-out forwards; }
.slide-2 { animation: slideIn 1.8s ease-out 0.4s forwards; }
.slide-3 { animation: slideIn 1.8s ease-out 0.8s forwards; }

@keyframes slideIn {
  from { left: -500px; opacity: 0; }
  to   { left: 60%; opacity: 1; }
}

/* Mobile */
@media (max-width: 768px) {
  .premium-buttons {
    display: grid;
    place-items: center;
    gap: 20px;
    height: auto;
    padding-top: 40px;
  }

  .premium-btn {
    position: static;
    animation: none;
    left: 0;
  }
}
