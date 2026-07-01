import Navbar from "@/components/layout/Navbar";
import TransportCalculator from "@/components/transport/TransportCalculator";

export default function TransportPage() {
  return (
    <>
      <Navbar />
      <main>
        <TransportCalculator />
      </main>
    </>
  );
}
