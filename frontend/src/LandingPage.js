// import React from "react";
// import "./LandingPage.css";
// import { motion } from "framer-motion";

// export default function LandingPage() {
//   return (
//     <div className="container">
//       {/* Hero Section */}
//       <motion.section
//         className="hero"
//         initial={{ opacity: 0, y: -50 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 1 }}
//       >
//         <h1 className="hero-title">Discover Everything About Any Product</h1>
//         <p className="hero-subtitle">From Brand to Company Ownership & Endorsements</p>
//         <motion.button 
//           className="hero-button"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Explore Now
//         </motion.button>
//       </motion.section>

//       {/* Information Flow Section */}
//       <motion.section 
//         className="info-section"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//       >
//         <h2 className="section-title">How It Works</h2>
//         <motion.div className="flow-row" initial={{ x: -100 }} whileInView={{ x: 0 }} transition={{ duration: 0.8 }}>
//           <div className="flow-box">Product</div>
//           <span className="arrow">→</span>
//           <div className="flow-box">Brand</div>
//           <span className="arrow">→</span>
//           <div className="flow-box">Endorsed By</div>
//         </motion.div>
//         <motion.div className="flow-row" initial={{ x: 100 }} whileInView={{ x: 0 }} transition={{ duration: 0.8 }}>
//           <div className="flow-box">Brand</div>
//           <span className="arrow">→</span>
//           <div className="flow-box">Company</div>
//           <span className="arrow">→</span>
//           <div className="flow-box">Directors / Shareholders</div>
//         </motion.div>
//       </motion.section>

//       {/* Features Section */}
//       <motion.section 
//         className="features"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//       >
//         <h2 className="section-title">Why Use Our Platform?</h2>
//         <div className="features-grid">
//           <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
//             <h3>Transparency</h3>
//             <p>Get clear insights into the ownership and brand structure of any product.</p>
//           </motion.div>
//           <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
//             <h3>Trustworthiness</h3>
//             <p>Know who endorses and backs the brands you trust.</p>
//           </motion.div>
//           <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
//             <h3>Easy to Explore</h3>
//             <p>Intuitive interface to search and understand the brand ecosystem.</p>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Call to Action */}
//       <motion.section 
//         className="cta"
//         initial={{ scale: 0.8, opacity: 0 }}
//         whileInView={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <h2 className="section-title">Start Exploring Now</h2>
//         <p>Uncover the journey from product to people behind the scenes.</p>
//         <motion.button 
//           className="cta-button"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Get Started
//         </motion.button>
//       </motion.section>
//     </div>
//   );
// }







import React, { useRef, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { motion } from "framer-motion";

// Background particles (simple implementation using canvas)
function BackgroundParticles() {
  useEffect(() => {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = "#ffffff22";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }, []);

  return (
    <canvas
      id="particles"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

const data = {
  nodes: [
    { id: "Product", group: 1 },
    { id: "Brand", group: 2 },
    { id: "Company", group: 3 },
    { id: "Shareholders", group: 4 },
    { id: "Endorsed By", group: 5 },
  ],
  links: [
    { source: "Product", target: "Brand" },
    { source: "Brand", target: "Company" },
    { source: "Company", target: "Shareholders" },
    { source: "Brand", target: "Endorsed By" },
  ],
};

export default function LandingPage() {
  const fgRef = useRef();

  useEffect(() => {
    let angle = 0;
    const rotate = () => {
      if (fgRef.current) {
        fgRef.current.cameraPosition(
          { x: 100 * Math.sin(angle), z: 100 * Math.cos(angle), y: 40 },
          data.nodes[0],
          0
        );
        angle += 0.005;
      }
      requestAnimationFrame(rotate);
    };
    rotate();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "#0a0a0a", overflow: "hidden", position: "relative" }}>
      <BackgroundParticles />
      <motion.h1
        className="heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          top: 20,
          width: "100%",
          textAlign: "center",
          color: "#ffffff",
          fontSize: "2.5rem",
          zIndex: 2,
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        🧠 Product Network Explorer
      </motion.h1>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%", // move graph to the right
          width: "90%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <ForceGraph3D
          ref={fgRef}
          graphData={data}
          nodeAutoColorBy="group"
          linkDirectionalParticles={2}
          linkDirectionalArrowLength={5}
          linkOpacity={0.6}
          nodeLabel="id"
          backgroundColor="#0a0a0a"
          />
      </div>
    </div>
  );
}
