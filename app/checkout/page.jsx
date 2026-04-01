"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../styles/checkout.css";

export default function CheckOut() {
  const router = useRouter();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("my-bookings")) || [];
    setBookings(saved);
  }, []);

  const total = bookings.reduce((sum, b) => sum + Number(b.price), 0);

  async function handleSubmit(e) {
    e.preventDefault();

    if (bookings.length === 0) {
      alert("No bookings to checkout.");
      return;
    }

    try {
      const formData = new FormData(e.target);

      const payload = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
        notes: formData.get("notes"),
        total: total.toFixed(2),
        services: bookings,
      };

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error || "Failed to send email");
        alert(data.error || "Failed to send email");
        return;
      }

      localStorage.removeItem("my-bookings");
      setBookings([]);
      router.push("/checkout-success");
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="checkout-empty">
        <p>You have no bookings.</p>
        <button
          className="checkout-add-btn"
          onClick={() => router.push("/services")}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-card">

        <table className="checkout-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, idx) => (
              <tr key={idx}>
                <td>{b.name}</td>
                <td>{new Date(b.appointmentTime).toLocaleString()}</td>
                <td>${b.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="checkout-total">
          <h3>Total</h3>
          <p>${total.toFixed(2)}</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <input type="hidden" name="total" value={total.toFixed(2)} />

          <input type="text" name="fullName" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email Address" required />
          <input type="text" name="phone" placeholder="Phone Number" required />

          <div className="checkout-address-row">
            <input type="text" name="address" placeholder="Address" required />
            <input type="text" name="city" placeholder="City" required />

            <input
              type="text"
              name="state"
              placeholder="ST"
              required
              maxLength={2}
              className="checkout-state"
              onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            />

            <input
              type="text"
              name="zip"
              placeholder="ZIP"
              required
              maxLength={5}
              pattern="\d{5}"
              inputMode="numeric"
              className="checkout-zip"
              onChange={(e) =>
                (e.target.value = e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <textarea name="notes" placeholder="Notes (optional)" />

          {/* FUSED ICON STACK */}
          <div className="checkout-icon-stack">
            <button type="submit" className="checkout-submit">⟡</button>

            <button
              className="checkout-add-btn"
              onClick={() => router.push("/services")}
              type="button"
            >
              +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
