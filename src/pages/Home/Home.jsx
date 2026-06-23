import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO/SEO';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import Access from '../../components/Access/Access';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import Courses from '../../components/Courses/Courses';
import Testimonials from '../../components/Testimonials/Testimonials';
import Newsletter from '../../components/Newsletter/Newsletter';
import ResultsTicker from '../../components/ResultsTicker/ResultsTicker';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <>
      <SEO 
        title="Best Commerce Coaching in Bhagalpur"
        description="Join Abhishi Commerce Classes, the best commerce coaching in Bhagalpur for Class 11th, 12th, CA Foundation, and B.Com. Expert guidance by Abhishek Singh."
        keywords="Abhishi Commerce Classes, Best Commerce Coaching in Bhagalpur, Commerce Classes in Bhagalpur, Class 11 Commerce Bhagalpur"
      />
      <Hero />
      <Features />
      <Access />
      <WhyChooseUs />
      <Courses />
      <Testimonials />
      <Newsletter />
      <ResultsTicker />
    </>
  );
};

export default Home;
