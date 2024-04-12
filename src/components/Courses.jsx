import React from 'react';
import { styles } from '../style';
import { circles } from '../assets';
import { mathematics } from '../constants';
import { fadeIn } from '../utils/motion';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';


const CourseCard = ({ index, title, icon, description, price }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className={`w-full rounded-[20px] shadow-card ${isFlipped ? 'flipped' : ''}`}
        style={{
          backgroundImage: `linear-gradient(primary, secondary)`,
        }}
        onClick={handleCardClick}
      >
        <div className={`flipper ${isFlipped ? 'flipped' : ''}`}>
          <div className="front bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <img src={icon} alt={title} className="w-24 h-24 object-contain" />
            <h3 className="text-primary text-[20px] text-bold text-center">{title}</h3>
          </div>
          <div className="back bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <p className="text-primary text-center">{description}</p>
            <p className="text-primary text-center">Price: {price}</p>
            <button className="bg-primary text-white py-2 px-4 rounded">Add to Cart</button>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const Courses = () => {
  return (
    <div id='courses' className={`bg-primary ${styles.padding} flex flex-wrap items-center`}>
      <div className="md:w-1/2 mr-8">
        <h3 style={{ ...styles.sectionSubText, marginTop: '0' }}>EXPLORE</h3>
        <h2 style={styles.sectionHeadText}>THE COURSES YOU DESIRE</h2>
      </div>
      <div className="md:w-1/8 flex justify-end">
        <img src={circles} alt="" className="mx-auto" />
      </div>
      <div className='md:w-full mr-8 mt-8'>
        <h2 style={styles.sectionSubText}>MATHEMATICS</h2> 
      </div>
      <div className="mt-20 flex flex-wrap gap-10">
        {mathematics.map((course, index) => (
          <CourseCard  key={course.title} index={index} {...course} />
        ))}
      </div>
      {/* Repeat the same structure for other courses like Hindi, Cooking, etc. */}
    </div>
  );
};

export default Courses;
