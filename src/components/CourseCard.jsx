import React, { useState } from 'react';
import { styles } from '../style';
import { motion } from 'framer-motion';

const CourseCard = ({ index, title, icon, description, price }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className={`xs:w-[250px] w-full rounded-[20px] shadow-card cursor-pointer`}
      onClick={handleCardClick}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`card ${isFlipped ? 'flipped' : ''}`} style={{ width: '100%', height: '100%', transition: 'transform 0.5s', transformStyle: 'preserve-3d' }}>
        <div className="front bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden' }}>
          <img src={icon} alt={title} className="w-24 h-24 object-contain" />
          <h3 className="text-primary text-[20px] text-bold text-center">{title}</h3>
        </div>
        <div className="back bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <p className="text-primary text-center">{description}</p>
          <p className="text-primary text-center">Price: {price}</p>
          <button className="bg-primary text-white py-2 px-4 rounded">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
