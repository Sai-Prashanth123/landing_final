"use client"
import React from 'react'
import {motion} from "motion/react"
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Buttons(props:{className:string,children:string,width:number,height:number}) {
    const [hovered, setHovered] = useState(false);
  return (
    <motion.Button
    variant={"default"}
    className={`${props.className} relative flex items-center justify-center`}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
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
  </motion.Button>
  )
}

export default Buttons
