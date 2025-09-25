import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import SearchDonor from './SearchDonor'; // ✅ Corrected import
import Register from './Registration';
import Login from './Login';
import Dashboard from './Dashboard';
import ResetPassword from './ResetPassword';

const data = [
  { image: 'P1.webp' },
  { image: 'P3.jpeg' },
  { image: 'P4.webp' },
  { image: 'P5.jpg' },
  { image: 'P6.png' },
];

function Layout({ children, isLoggedIn }) {
  return (
    <>
      <nav id="navbar">
        <div id="nav-container">
          <div id="logo-title">
            <img src="logo.png" alt="Logo" id="logo" />
            <span id="title">
              <span>BLOOD</span>
              <span>HUB</span>
            </span>
          </div>
          <div id="header">
            <Link to="/" className="nav-link" style={{ textDecoration: 'none' }}>Home</Link>
            <Link to="/register" className="nav-link" style={{ textDecoration: 'none' }}>Donor Registration</Link>
            <Link to="/search-donor" className="nav-link" style={{ textDecoration: 'none' }}>Search a Donor</Link>
            <Link to="/login" className="nav-link" style={{ textDecoration: 'none' }}>Login</Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="nav-link" style={{ textDecoration: 'none' }}>Dashboard</Link>
            )}
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer id="footer">
        <div className="about-us">
          <h2 className="footer-heading">About Us</h2>
          <p>Phone: +91 9876543210</p>
          <p>Email: contact@yourwebsite.com</p>
          <p>Address: 123, Main Street, Your City, India</p>
        </div>
        <div className="social-media">
          <label className="copyrighttext">Copyright © 2024. All rights reserved.</label>
          <img className="socialmediaicon" src="s1.png" alt="Social 1" />
          <img className="socialmediaicon" src="s2.png" alt="Social 2" />
          <img className="socialmediaicon" src="s3.png" alt="Social 3" />
          <img className="socialmediaicon" src="s4.webp" alt="Social 4" />
        </div>
      </footer>
    </>
  );
}

function Home({ isLoggedIn }) {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 700,
  };

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div id="Slide">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
            </div>
          ))}
        </Slider>
      </div>
      <div id="container">
        <div id="box">
          <div id="eligibilty">
            <h4>ELIGIBILITY</h4>
          </div>
          <div id="compatibilty">
            <h4>COMPATIBILITY</h4>
          </div>
          <div id="bloodfacts">
            <h4>BLOOD FACTS</h4>
          </div>
        </div>
        <div id="req">
          <label id="reqin">Post your Blood Request</label>
        </div>
      </div>
    </Layout>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<Layout isLoggedIn={isLoggedIn}><Register /></Layout>} />
        <Route path="/login" element={<Layout isLoggedIn={isLoggedIn}><Login setIsLoggedIn={setIsLoggedIn} /></Layout>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search-donor" element={<Layout isLoggedIn={isLoggedIn}><SearchDonor /></Layout>} />
      </Routes>
    
  );
}

export default App;
