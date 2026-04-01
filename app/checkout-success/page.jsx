"use client";

import { useRouter } from "next/navigation";
import "../../styles/checkoutsuccess.css"; // adjust path if needed

export default function CheckoutSuccess() {
  const router = useRouter();

  return (
    <div className="checkout-success-page">
      <div className="checkout-success-content">

        {/* HERO ICON */}
        <div className="checkout-success-hero">✧</div>

        {/* TEXT */}
        <h2 className="checkout-success-title">Thank You</h2>
        <p className="checkout-success-message">
          Your booking has been confirmed <br />
          We look forward to welcoming you soon!
        </p>

        {/* ACTION ICONS */}
        <div className="checkout-success-actions">
          <button onClick={() => router.push("/")}>
            <span className="checkout-success-icon">⌂</span>
          </button>

          <button onClick={() => router.push("/services")}>
            <span className="checkout-success-icon">＋</span>
          </button>
        </div>

      </div>
    </div>
  );
}