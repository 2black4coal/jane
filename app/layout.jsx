
import "../styles/globals.css";



export const metadata = {
  title: "Oriel Spa",
  description: "Spa Booking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}