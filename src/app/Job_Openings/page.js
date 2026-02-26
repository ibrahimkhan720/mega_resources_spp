import Jobs from "@/component/Jobs/Jobs";
import CallToAction from "@/component/Staff/CallToAction";
import Image from "next/image";


export default function Job_Openings() {
  return (
    <div className="page">
      <Jobs/>
      <CallToAction/>
    </div>
  );
}
