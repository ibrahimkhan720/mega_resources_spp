
import Annual_Leave from "@/component/Home/Annual_Leave";
import Main_Cards from "@/component/Home/Main_Cards";
import Mega_Olympics from "@/component/Home/Mega_Olympics";
import Staff_Points from "@/component/Home/Staff_Points";
import Navbar from "@/component/Navbar/Navbar";


import Image from "next/image";


export default function Home() {
  return (
    <div className="page">
      <Navbar/>
     <Staff_Points/>
     <Mega_Olympics/>
     <Annual_Leave/>
     <Main_Cards/>
    </div>
  );
}
