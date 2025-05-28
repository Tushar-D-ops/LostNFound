import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { gsap } from "gsap";
import "../Home.css";


const Home = ({token,setToken}) => {
  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
      gsap.from(heroRef.current, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power2.out",
      });
  
      
    }, []);

  return (
    <main className="home-container">
      <Navbar setToken={setToken}/>
      <div className="pink-gradient"></div>
        <div className="blue-gradient"></div>
        <div className="white-gradient"></div>

      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero-gradients" />
        <h1>Find My Stuff</h1>
        <p>Your lost items don’t have to stay lost. Let’s find them together!</p>
        <a href="/find">
          <button className="primary-btn">🔍 Find Item</button>
        </a>
      </section>

      {/* How It Works */}
      <section className="how-it-works" ref={howItWorksRef} >
        <h2>How It <span style={{ color: "#04b2fd" }}>Works</span></h2>
        <div className="steps">
          <div className="step">
            <span>📌</span>
            <h3>Report</h3>
            <p>Lost or found something? Submit the details in seconds.</p>
          </div>
          <div className="step">
            <span>🧭</span>
            <h3>Track</h3>
            <p>Keep track of your reported items with real-time updates.</p>
          </div>
          <div className="step">
            <span>🤝</span>
            <h3>Connect</h3>
            <p>Get notified when someone finds your item or claims it.</p>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured-items">
        <h2><span style={{ color: "#04b2fd" }}>Recently</span> Reported</h2>
        <div className="item-preview">
          <div className="item-card">🎒 Lost Backpack near Library</div>
          <div className="item-card">📱 Found iPhone outside Cafeteria</div>
          <div className="item-card">🐶 Missing Dog - Responds to "Buddy"</div>
        </div>
        <a href="/find" className="secondary-btn">View All Items</a>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <h2>Why <span style={{ color: "#04b2fd" }}>Choose</span> Us?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>🧠 Smart Matching</h3>
            <p>We use tags and location to smartly match lost and found items.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Fast Notifications</h3>
            <p>Instant email alerts when there's a possible match.</p>
          </div>
          <div className="feature-card">
            <h3>🤲 Community Driven</h3>
            <p>Everyone helps—strong community support for finding stuff faster.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta" ref={ctaRef}>
        <h2 style={{ color: "#04b2fd" }}>Join the Lost & Found Revolution!</h2>
        <p>Be a part of our community and help return lost items to their rightful owners.</p>
        <a href="/post">
          <button className="primary-btn">➕ Report an Item</button>
        </a>
      </section>
    </main>
  );
};

export default Home;
