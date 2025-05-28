import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { gsap } from 'gsap';
import '../Contact.css'; // Link to your custom styles

const Contact = () => {
  const api = process.env.REACT_APP_API;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const formRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/contact`, form);
      if (res.data.success) {
        setStatus("✅ Email sent successfully!");
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus("❌ Failed to send email.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Server error.");
    }
  };

  useEffect(() => {
    gsap.from(formRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="contact-container">
      <div className="form-wrapper" ref={formRef}>
        <h2 className="form-title">Contact Us</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="form-input"
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="form-input"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows="5"
            className="form-textarea"
          ></textarea>
          <button type="submit" className="form-button">
            Send Message
          </button>
        </form>
        <p className="form-status">{status}</p>
      </div>
      
    </div>
  );
};

export default Contact;
