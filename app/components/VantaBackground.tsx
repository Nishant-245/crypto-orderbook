import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

const VantaBackground = ({ children }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    const loadVanta = async () => {
      if (!vantaEffect) {
        const VANTA = window.VANTA;

        if (VANTA) {
          const effect = VANTA.DOTS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: true,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color2: 0x0,
            backgroundColor: 0x0,
          });

          setVantaEffect(effect);
        }
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="relative min-h-screen">
      {/* Background layer */}
      <div
        ref={vantaRef}
        className="fixed inset-0 w-full h-full z-0"
        aria-hidden="true"
      />

      {/* Content layer */}
      <div className="relative z-10">
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"
          strategy="beforeInteractive"
          onLoad={() => {
            console.log("Vanta.js loaded");
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default VantaBackground;
