"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const sidebarItems = [
    { src: "/assets/sidebar-1.svg", alt: "Dashboard" },
    { src: "/assets/sidebar-2.svg", alt: "Enrichment" },
    { src: "/assets/sidebar-3.svg", alt: "Data" },
    { src: "/assets/sidebar-4.svg", alt: "Integrations" },
  ];

  return (
    <motion.div
      className="bg-white flex flex-col items-center justify-between py-4 border-r fixed left-0 top-16 h-[calc(100vh-4rem)] z-50"
      initial={{ width: "62px" }}
      animate={{ width: isExpanded ? "240px" : "62px" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-6 w-full">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size={isExpanded ? "default" : "icon"}
            className={`text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full ${
              isExpanded ? "justify-start px-4" : ""
            }`}
          >
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.alt}
              width={18}
              height={18}
              className={isExpanded ? "mr-2" : ""}
            />
            {isExpanded && <span>{item.alt}</span>}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-6 w-full">
        <Button
          variant="ghost"
          size={isExpanded ? "default" : "icon"}
          className={`text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full ${
            isExpanded ? "justify-start px-4" : ""
          }`}
        >
          <Image
            src="/assets/sidebar-5.svg"
            alt="Settings"
            width={18}
            height={18}
            className={isExpanded ? "mr-2" : ""}
          />
          {isExpanded && <span>Settings</span>}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="self-end mr-2"
          onClick={toggleSidebar}
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </motion.div>
  );
}
