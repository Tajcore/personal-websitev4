"use client";

import React, { useState, useEffect } from 'react';
import '../styles/spotlight-effect.css';

const SpotlightEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Add mouse move listener when the component mounts
    document.addEventListener('mousemove', handleMouseMove);

    // Remove listener when the component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {children}
      <div
        className="spotlight-effect"
        style={{
          '--x': `${cursorPosition.x}px`,
          '--y': `${cursorPosition.y}px`,
        } as React.CSSProperties} // This casting is necessary to use custom CSS properties in TypeScript
      />
    </>
  );
};

export default SpotlightEffect;
