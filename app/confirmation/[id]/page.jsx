"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import "../../../styles/confirmation.css";

export default function Confirmation() {
  const router = useRouter();
  const search = useSearchParams();
  const { id } = useParams();

  const name = search.get("name");
  const description = search.get("description");
  const price = search.get("price");

  const [appointmentTime, setAppointmentTime] = useState("");
  const pickerRef = useRef(null);

  useEffect(() => {
    if (!id) {
      router.replace("/services");
    }
  }, [id, router]);

  const getLocalDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    router.push(
      `/my-bookings?serviceId=${id}` +
        `&name=${encodeURIComponent(name)}` +
        `&price=${price}` +
        `&appointmentTime=${appointmentTime}`
    );
  };

  if (!name || !description || !price) {
    return <p className="confirmation-page-no-service">Loading service...</p>;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-page-card">

        <h3 className="confirmation-page-title">{name}</h3>
        <p className="confirmation-page-desc">{description}</p>

<form id="confirmForm" className="confirmation-page-form" onSubmit={handleConfirm}>
          <div className="confirmation-page-picker-wrap">
            <input
              ref={pickerRef}
              type="datetime-local"
              className="confirmation-page-input"
              value={appointmentTime}
              min={getLocalDateTime()}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
          </div>
        </form>

        {/* PERFECTLY CENTERED ICON STACK */}
        <div className="confirmation-page-icon-stack">

          <span
            className="confirmation-page-icon confirmation-page-heart"
            onClick={() => pickerRef.current?.showPicker?.()}
          >
            ♡
          </span>

          <button type="submit" form="confirmForm" className="confirmation-page-btn">
            <span className="confirmation-page-icon confirmation-page-diamond">
              ✧
            </span>
          </button>

          <button
            className="confirmation-page-btn"
            onClick={() => router.push("/services")}
          >
            <span className="confirmation-page-icon confirmation-page-arrow">
              ↶
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}
