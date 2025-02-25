import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageComparisonProps = {
    beforeImageSrc: string;
    afterImageSrc: string;
};

const ImageComparison: React.FC<ImageComparisonProps> = ({ beforeImageSrc, afterImageSrc }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const transitionConfig = { duration: 0.5, ease: "easeOut" };

    const updateSliderPosition = (clientX: number) => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        let newPosition = ((clientX - left) / width) * 100;
        newPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(newPosition);
    };

    const handlePointerDown = () => (isDragging.current = true);
    const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging.current) return;
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        updateSliderPosition(clientX);
    };
    const handlePointerUp = () => (isDragging.current = false);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg cursor-grab active:cursor-grabbing select-none"
            onMouseMove={handlePointerMove}
            onTouchMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onTouchEnd={handlePointerUp}
        >
            {/* Imagem Antes */}
            <motion.img
                src={beforeImageSrc}
                alt="Antes"
                className="absolute w-full h-full object-cover"
                animate={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0% 100%)` }}
                transition={transitionConfig}
                draggable={false}
            />

            {/* Imagem Depois */}
            <motion.img
                src={afterImageSrc}
                alt="Depois"
                className="absolute w-full h-full object-cover"
                animate={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                transition={transitionConfig}
                draggable={false}
            />

            {/* 🔥 Linha + Indicador de Arrasto juntos! */}
            <motion.div
                className="absolute top-0 bottom-0 flex items-center select-none"
                animate={{ left: `${sliderPosition}%` }}
                transition={transitionConfig}
                style={{ transform: "translateX(-50%)", userSelect: "none" }}
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
            >
                {/* Linha do Slider */}
                <div className="w-[3px] h-full"></div>

                {/* Indicador de Arrasto */}
                <div className="flex items-center justify-center p-2 rounded-full shadow-lg cursor-grab active:cursor-grabbing ">
                    <FaChevronLeft className="text-gray-700 text-lg select-none" />
                    <FaChevronRight className="text-gray-700 text-lg ml-2 select-none" />
                </div>
            </motion.div>
        </div>
    );
};

export default ImageComparison;
