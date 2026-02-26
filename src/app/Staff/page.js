import CallToAction from "@/component/Staff/CallToAction";
import Cards from "@/component/Staff/Cards";
import Staff_Banefits from "@/component/Staff/Staff_Banefits";
import Image from "next/image";


export default function Staff() {
  return (
    <div className="page">
     <Staff_Banefits/>
     <Cards/>
     <CallToAction/>
    </div>
  );
}
