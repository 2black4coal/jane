"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../styles/mybookings.css";

export default function MyBookings() {
  const router = useRouter();
  const search = useSearchParams();

  const [bookings, setBookings] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load bookings safely (client only)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("my-bookings")) || [];
    setBookings(saved);
    setHydrated(true);
  }, []);

  // Handle new booking from Confirmation page
  useEffect(() => {
    if (!hydrated) return;

    const serviceId = search.get("serviceId");
    const name = search.get("name");
    const price = search.get("price");
    const appointmentTime = search.get("appointmentTime");

    if (serviceId && name && price && appointmentTime) {
      const newBooking = {
        serviceId,
        name,
        price,
        appointmentTime,
      };

      const updated = [...bookings, newBooking];
      setBookings(updated);
      localStorage.setItem("my-bookings", JSON.stringify(updated));

      // Remove query params from URL
      router.replace("/my-bookings");
    }
  }, [hydrated]);

  const deleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem("my-bookings", JSON.stringify(updated));
  };

  return (
    <div className="mybookings-page">
      <h1 className="mybookings-page-title">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="mybookings-page-empty">
          <p className="mybookings-page-desc">You have no bookings yet.</p>
          <button
            className="mybookings-page-btn mybookings-page-btn-add"
            onClick={() => router.push("/services")}
          >
            Add a Service
          </button>
        </div>
      ) : (
        <>
          <div className="mybookings-page-list">
            {bookings.map((b, index) => (
              <div className="mybookings-page-item" key={index}>
                <h3 className="mybookings-page-service-title">{b.name}</h3>
                <p className="mybookings-page-service-desc">
                  {new Date(b.appointmentTime).toLocaleString()}
                </p>
                <button
                  className="mybookings-page-delete-btn"
                  onClick={() => deleteBooking(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="mybookings-page-actions">
            <button
              className="mybookings-page-btn mybookings-page-btn-plus"
              onClick={() => router.push("/services")}
            >
              <span className="mybookings-page-icon">+</span>
            </button>

           <button
  className="mybookings-page-btn mybookings-page-btn-summary"
  onClick={() => router.push("/checkout")}
>
  <span className="mybookings-page-icon">✨</span>
  
</button>
          </div>
        </>
      )}
    </div>
  );
}
