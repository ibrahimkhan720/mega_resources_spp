import Award from "@/component/Point/Award";
import Staff_Points_Plan from "@/component/Point/Staff_Points_Plan";
import Image from "next/image";


export default function Point() {
  return (
    <div className="page">
        <Staff_Points_Plan/>  
        <Award/>
    </div>
  );
}
