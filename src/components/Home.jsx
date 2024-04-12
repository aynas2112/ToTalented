import React from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import Hero from './Hero'
import Courses from './Courses'
import Blogs from './Blogs'
import Testimonial from './Testimonial'
import Footer from './Footer'
import About from './About'
import Contact from './Contact'

const Home = () => {
  return (
    <div>
        {/* <Navbar /> */}
        {/* <SearchBar />  */}
        <Hero />
        <About />
        <Courses />
        <Blogs />
        <Testimonial />
        <Contact />
        {/* <Footer />  */}
    </div>
  )
}

export default Home