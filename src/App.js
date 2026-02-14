// src/App.js
import React from 'react';
import './App.css';
import Header from './components/header';
import HeroSection from './components/herosection';
import FeaturesSection from './components/featuressection';
import ContactSection from './components/contactsection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
