"use client";

import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AOSWrapper = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      mirror: false
    });
  }, []);

  return children;
};

export default AOSWrapper;
