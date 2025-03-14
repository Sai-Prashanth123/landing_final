import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CustomButton = ({ children, href, className, iconSrc, width, height }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "https://yellow-field-04c8fdc10.6.azurestaticapps.net";
  };

  return (
    <motion.button
      className={`${className} relative flex items-center justify-center`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      {/* Hover Icon (Optional) */}
      {hovered && iconSrc && (
        <Image
          src={iconSrc}
          alt="icon"
          width={width}
          height={height}
          className="absolute -left-[0.2rem] bottom-[1.6rem]"
        />
      )}

      <Link href={href} className="z-10" onClick={handleClick}>
        {children}
      </Link>

      {hovered && iconSrc && (
        <Image
          src={iconSrc}
          alt="icon"
          width={width}
          height={height}
          className="absolute md:-right-0 md:-bottom-1"
        />
      )}
    </motion.button>
  );
};

export default CustomButton;
