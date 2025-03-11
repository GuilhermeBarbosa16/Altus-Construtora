import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageComparisonProps = {
    beforeImageSrc: string;
    afterImageSrc: string;
};

const ImageComparison: React.FC<ImageComparisonProps> = ({ beforeImageSrc, afterImageSrc }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [, setIsMouseMoving] = useState(false);

    const transitionConfig = { duration: 0.5, ease: "easeInOut" };

    // Animação quando a div entra na tela
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    setSliderPosition(30); 
                    setTimeout(() => setSliderPosition(50), 500); 
                }
            },
            { threshold: 0.5}
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [hasAnimated]);

    const updateSliderPosition = (clientX: number) => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        let newPosition = ((clientX - left) / width) * 100;
        newPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(newPosition);
    };

    const handlePointerDown = (event: React.MouseEvent | React.TouchEvent) => {
        isDragging.current = true;
        setIsMouseMoving(true);
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
        setIsMouseMoving(false);
    };

    useEffect(() => {
        // Adiciona os eventos de movimentação e término de interação
        document.addEventListener("mousemove", handlePointerMove);
        document.addEventListener("mouseup", handlePointerUp);
        document.addEventListener("touchmove", handlePointerMove, { passive: false });
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
            {/* Imagem Antes */}
            <div
                className="absolute inset-0"
                style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
            >
                <img src={beforeImageSrc} alt="Antes" className="w-full h-full object-cover" draggable={false} />
            </div>

            {/* Imagem Depois */}
            <div
                className="absolute inset-0"
                style={{
                    clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                }}
            >
                <img src={afterImageSrc} alt="Depois" className="w-full h-full object-cover" draggable={false} />
            </div>

            {/* Linha do Slider */}
            <div
                className="absolute top-0 bottom-0 flex items-center justify-center cursor-pointer select-none"
                style={{
                    left: `${sliderPosition}%`,
                    transform: "translateX(-50%)",
                    userSelect: "none",
                }}
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
            >
                {/* Indicador de arrasto */}
                <div className="flex items-center justify-center p-2 rounded-full shadow-lg ">
                    <FaChevronLeft className="text-gray-700 text-lg" />
                    <FaChevronRight className="text-gray-700 text-lg ml-2" />
                </div>
            </div>
        </div>
    );
};

export default ImageComparison;
