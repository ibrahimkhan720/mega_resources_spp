"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Annual_Leave from "@/component/Home/Annual_Leave";
import Main_Cards from "@/component/Home/Main_Cards";
import Mega_Olympics from "@/component/Home/Mega_Olympics";
import Staff_Points from "@/component/Home/Staff_Points";
import Navbar from "@/component/Navbar/Navbar";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="page">
      <Navbar />
        <Staff_Points />
        <Mega_Olympics />
        <Annual_Leave />
        <Main_Cards />
    </div>
  );
}