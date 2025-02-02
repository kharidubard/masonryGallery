import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import images from "../data/images";

const MasonryGallery: React.FC = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true); // hover effects after animation
    }, 800); // entrance animation duration
    return () => clearTimeout(timer);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Disable page scrolling when modal opens
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // modal opens with selected image
  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  // modal closes when clicking outside the image
  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setSelectedImage(null);
    }
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // entrance animation direction
  const getInitialPosition = (index: number) => {
    const positions = [
      { x: -400, y: 0 }, // left
      { x: 400, y: 0 }, // right
      { x: 0, y: -400 }, // top
      { x: 0, y: 400 }, // bottom
    ];
    return positions[index % positions.length];
  };

  return (
    <div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 gap-y-1 md:gap-4 sm:p-0 md:p-4">
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Image ${index}`}
            className={`w-full mb-2 sm:mb-4 rounded-lg shadow-sm cursor-zoom-in ${
              isAnimationComplete
                ? "transition-all duration-300 hover:scale-[103%] hover:shadow-sm "
                : "" // hover transition after animation
            }`}
            initial={{ opacity: 0, ...getInitialPosition(index) }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={() => handleImageClick(src)} // Open the modal on click
          />
        ))}
      </div>

      {/* modal to display enlarged image */}
      {isModalOpen && (
        <div
          className="fixed py-16 md:p-18 top-0 left-0 w-full h-full bg-[#000000ab] bg-opacity-50 flex cursor-zoom-out justify-center items-center z-50"
          onClick={handleCloseModal} // closes when clicking outside the modal
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 bg-white text-gray-800 text-2xl rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200"
            onClick={closeModal}
          >
            ✕
          </button>

          <motion.img
            src={selectedImage!}
            alt="Enlarged Image"
            className="max-w-full max-h-full object-contain rounded-lg cursor-default"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}
    </div>
  );
};

export default MasonryGallery;
