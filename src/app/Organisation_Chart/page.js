import Organisation from "@/component/Organisation/Organisation";
import CallToAction from "@/component/Staff/CallToAction";
import Image from "next/image";


export default function Organisation_Chart() {
  return (
    <div className="page">
        <Organisation/>
        <CallToAction/>
    </div>
  );
}
