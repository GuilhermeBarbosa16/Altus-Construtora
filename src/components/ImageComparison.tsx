import React, { useState, useRef, useEffect } from "react";
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

    const transitionConfig = { duration: 0.1, ease: "linear" };

    const updateSliderPosition = (clientX: number) => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        let newPosition = ((clientX - left) / width) * 100;
        newPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(newPosition);
    };

    const handlePointerDown = (event: React.MouseEvent | React.TouchEvent) => {
        isDragging.current = true;
        const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
        updateSliderPosition(clientX);
    };

    const handlePointerMove = (event: MouseEvent | TouchEvent) => {
        if (!isDragging.current) return;
        const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
        updateSliderPosition(clientX);
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener("mousemove", handlePointerMove);
        document.addEventListener("mouseup", handlePointerUp);
        document.addEventListener("touchmove", handlePointerMove);
        document.addEventListener("touchend", handlePointerUp);

        return () => {
            document.removeEventListener("mousemove", handlePointerMove);
            document.removeEventListener("mouseup", handlePointerUp);
            document.removeEventListener("touchmove", handlePointerMove);
            document.removeEventListener("touchend", handlePointerUp);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg select-none"
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
        >
            {/* Imagens e Slider juntos */}
            <motion.div
                className="absolute inset-0"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                transition={transitionConfig}
            >
                <img src={beforeImageSrc} alt="Antes" className="w-full h-full object-cover" draggable={false} />
            </motion.div>

            <motion.div
                className="absolute inset-0"
                style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                transition={transitionConfig}
            >
                <img src={afterImageSrc} alt="Depois" className="w-full h-full object-cover" draggable={false} />
            </motion.div>

            {/* Linha + Indicador de Arrasto dentro do mesmo contêiner */}
            <div
                className="absolute top-0 bottom-0 flex items-center justify-center cursor-pointer select-none"
                style={{
                    left: `${sliderPosition}%`,
                    transform: "translateX(-50%)",
                    userSelect: "none",
                }}
            >
                {/* Linha do Slider */}
                <div className="w-[3px] h-full"></div>

                {/* Indicador de Arrasto */}
                <div className="flex items-center justify-center p-2 rounded-full shadow-lg ">
                    <FaChevronLeft className="text-gray-700 text-lg" />
                    <FaChevronRight className="text-gray-700 text-lg ml-2" />
                </div>
            </div>
        </div>
    );
};

export default ImageComparison;
