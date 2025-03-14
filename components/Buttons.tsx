"use client"
import React from 'react'
import { motion } from "framer-motion"
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Buttons(props:{className:string,children:string,width:number,height:number}) {
    const [hovered, setHovered] = useState(false);
    
    const handleClick = (e) => {
      window.location.href = "https://yellow-field-04c8fdc10.6.azurestaticapps.net";
    };
    
  return (
    <motion.button
      variant={"default"}
      className={`${props.className} relative flex items-center justify-center`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Snowflake Images */}
      {hovered && (
        <Image
          src="/but.svg"
          alt="flake"
          width={props.width}
          height={props.height}
          className="absolute bottom-9 -left-3"  
        />
      )}
      <span className="z-10">{props.children}</span>
      {hovered && (
        <Image
          src="/but.svg"
          alt="flake"
          width={props.width}
          height={props.height}
          className="absolute -bottom-3 -right-2"
        />
      )}
    </motion.button>
  )
}

export default Buttons
