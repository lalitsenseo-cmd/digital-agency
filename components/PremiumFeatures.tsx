'use client';

import { useEffect, useState, useRef } from 'react';

export function ScrollProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(percent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '3px',
      background: 'rgba(255, 255, 255, 0.05)',
      zIndex: 9999,
      pointerEvents: 'none',
    }}>
      <div style={{
        width: `${scrollPercent}%`,
        height: '100%',
        background: 'linear-gradient(90deg, #F97316 0%, #FB923C 50%, #EA580C 100%)',
        boxShadow: '0 0 10px rgba(249, 115, 22, 0.6)',
        transition: 'width 0.1s ease-out',
      }} />
    </div>
  );
}

export function WhatsAppButton() {
  const phoneNumber = '918527004901';
  const message = 'Hi! I want to know more about your SEO services.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        @keyframes wa-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .wa-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9998;
          animation: wa-pulse 2s infinite, wa-bounce 3s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
          text-decoration: none;
          transition: transform 0.3s ease;
        }
        .wa-float:hover {
          transform: scale(1.1);
          animation-play-state: paused;
        }
        .wa-tooltip {
          position: absolute;
          right: 70px;
          top: 50%;
          transform: translateY(-50%);
          background: #0A0A0A;
          color: #fff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          border: 1px solid rgba(249, 115, 22, 0.3);
        }
        .wa-float:hover .wa-tooltip {
          opacity: 1;
        }
        @media (max-width: 640px) {
          .wa-float { width: 52px; height: 52px; bottom: 16px; right: 16px; }
          .wa-tooltip { display: none; }
        }
      `}</style>
      <a href={url} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Chat on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="wa-tooltip">Chat with us</span>
      </a>
    </>
  );
}

export function AnimatedCounter({ end, suffix = '', duration = 2000, className = '' }: { 
  end: number; 
  suffix?: string; 
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <style>{`
        @keyframes load-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes load-fade-out {
          to { opacity: 0; visibility: hidden; }
        }
        .load-screen {
          position: fixed;
          inset: 0;
          background: #0A0A0A;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: load-fade-out 0.5s ease-out 1s forwards;
        }
        .load-logo {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }
        .load-logo span { color: #F97316; }
        .load-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(249, 115, 22, 0.2);
          border-top-color: #F97316;
          border-radius: 50%;
          animation: load-spin 0.8s linear infinite;
        }
      `}</style>
      <div className="load-screen">
        <div className="load-logo">NexGen<span>.</span></div>
        <div className="load-spinner"></div>
      </div>
    </>
  );
}

export function FadeInOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback: Agar element already viewport ke andar hai ya IntersectionObserver support nahi karta
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    // Fallback: Agar 2 seconds mein animate nahi hua toh force show karo
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          clearTimeout(fallbackTimer);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 1,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        minHeight: '1px',
      }}
    >
      {children}
    </div>
  );
}