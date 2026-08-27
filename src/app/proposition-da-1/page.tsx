import Landing from "@/components/Landing";
import DaBanner from "@/components/DaBanner";
import "../phosphore.css";

export const metadata = {
  title: "Deciban · proposition de direction n°1",
};

export default function PropositionDa1() {
  return (
    <div className="da-phosphore">
      <DaBanner />
      <Landing variant="phosphore" />
    </div>
  );
}
