import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { gsap } from "gsap";
import { FaHandsHelping, FaMapMarkerAlt, FaPhoneAlt, FaClock, FaUsers, FaLightbulb } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import '../App.css'
import Contact from "../components/Contact";

function About({token,setToken}) {
  useEffect(() => {
    gsap.from("#about-header", {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power2.out",
    });

    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      <Navbar setToken={setToken}/>

      <section id="about" className="about-page container">
        {/* Header */}
        <header id="about-header" className="about-header">
          <h1 className="lfh1"  >About Us</h1>
          <p className="tagline">
            Bringing People and Lost Items Together — One Connection at a Time.
          </p>
        </header>

        {/* Mission & Vision */}
        <section className="mission-vision" data-aos="fade-up">
          <h2>Our Mission & Vision</h2>
          <p>
            At <span className="highlight">FindMyStuff</span>, we understand how stressful losing something valuable can be. Our mission is to build a community-driven platform that helps people report, track, and recover lost items easily and efficiently.
          </p>
          <p>
            We envision a world where no valuable item stays lost for long, and where technology and community spirit join hands to reunite belongings with their owners.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us" data-aos="fade-up" data-aos-delay="100">
          <h2>Why Choose FindMyStuff?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaHandsHelping className="icon" />
              <h3>Community Driven</h3>
              <p>Our platform thrives on the power of community to reunite lost items.</p>
            </div>
            <div className="feature-card">
              <FaLightbulb className="icon" />
              <h3>Innovative Technology</h3>
              <p>Smart alerts and real-time tracking maximize recovery chances.</p>
            </div>
            <div className="feature-card">
              <FaUsers className="icon" />
              <h3>User Friendly</h3>
              <p>Intuitive design makes reporting and searching for lost items simple.</p>
            </div>
          </div>
        </section>

        {/* Event Info */}
        <section className="events" data-aos="fade-up" data-aos-delay="200">
          <h2>Monthly Bidding Event</h2>
          <p>
            On the <span className="highlight">15th</span> of every month, we hold an exciting <span>Bidding Event</span> at our center to auction recovered items. Join us and find hidden treasures!
          </p>
        </section>

        {/* Contact & Location */}
        <section className="contact-location" data-aos="fade-up" data-aos-delay="300">
          <h2>Contact & Location</h2>
          <div className="contact-cards">
            <div className="contact-card">
              <FaMapMarkerAlt className="icon" />
              <p><strong>Headquarters:</strong> In front of Haldiram, Sadar, Nagpur</p>
            </div>
            <div className="contact-card">
              <FaPhoneAlt className="icon" />
              <p><strong>Contact Number:</strong> +91 98765 43234</p>
            </div>
            <div className="contact-card">
              <FaClock className="icon" />
              <p><strong>Office Hours:</strong> Monday to Saturday, 9 AM to 6 PM</p>
            </div>
          </div>
        </section>

        
      
       <Contact />
        {/* Footer */}
        <footer className="about-footer">
          <p>Copyright &copy; 2025 FindMyStuff. All Rights Reserved.</p>
        </footer>
      </section>
      
      

      
    </>
  );
}

export default About;
