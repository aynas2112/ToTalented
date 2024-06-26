import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Courses from './components/Courses';
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RegisterAndLogin from './components/Signup';
import { RegistrationProvider } from './components/RegistrationContext'; // Adjust the import here
function App() {
  return (
    <RegistrationProvider>
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterAndLogin />} /> {/* Add route for RegisterAndLogin */}
        </Routes>
        <div>
          <Footer />
        </div>
      </Router>
    </RegistrationProvider>
  );
}

export default App;
