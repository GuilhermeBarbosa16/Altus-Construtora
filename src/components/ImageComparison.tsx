import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageComparisonProps = {
    beforeImageSrc: string;
    afterImageSrc: string;
};

const ImageComparison: React.FC<ImageComparisonProps> = ({ beforeImageSrc, afterImageSrc }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const transitionConfig = { duration: 0.3, ease: "easeOut" }; // 🔥 Adiciona um atraso suave na linha!

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        e.preventDefault();
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current || !containerRef.current) return;

        const { left, width } = containerRef.current.getBoundingClientRect();
        let newPosition = ((e.clientX - left) / width) * 100;
        newPosition = Math.max(0, Math.min(100, newPosition));

        setSliderPosition(newPosition);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ userSelect: "none" }}
        >
            {/* Imagem Antes */}
            <motion.img
                src={beforeImageSrc}
                alt="Antes"
                className="absolute w-full h-full object-cover"
                animate={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0% 100%)` }}
                transition={transitionConfig} // 🔥 Delay na transição!
                draggable={false}
            />

            {/* Imagem Depois */}
            <motion.img
                src={afterImageSrc}
                alt="Depois"
                className="absolute w-full h-full object-cover"
                animate={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                transition={transitionConfig} // 🔥 Delay na transição!
                draggable={false}
            />

            {/* Linha do Slider (🔥 Agora tem o mesmo delay das imagens) */}
            <motion.div
                className="absolute top-0 bottom-0 w-[3px] select-none"
                animate={{ left: `${sliderPosition}%` }}
                transition={transitionConfig} // 🔥 Delay igual das imagens!
                style={{ transform: "translateX(-50%)", userSelect: "none" }}
            />

            {/* Indicador de Arrasto */}
            <motion.div
                className="absolute flex items-center justify-center  p-2 rounded-full shadow-lg cursor-grab active:cursor-grabbing select-none"
                animate={{
                    left: `${sliderPosition}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    scale: isHovered ? 1.2 : 1,
                }}
                transition={transitionConfig} // 🔥 Agora até o botão acompanha o delay!
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={handleMouseDown}
            >
                <motion.div animate={{ x: isHovered ? -6 : 0 }} transition={{ duration: 0.2 }}>
                    <FaChevronLeft className="text-gray-700 text-lg select-none" />
                </motion.div>

                <motion.div animate={{ x: isHovered ? 6 : 0 }} transition={{ duration: 0.2 }}>
                    <FaChevronRight className="text-gray-700 text-lg ml-[-8px] select-none" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ImageComparison;
