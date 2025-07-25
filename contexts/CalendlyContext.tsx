'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

interface CalendlyContextType {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  openCalendly: () => void;
}

const CalendlyContext = createContext<CalendlyContextType | undefined>(undefined);

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Calendly is already loaded
    if (window.Calendly) {
      setIsReady(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="calendly.com"]');
    if (existingScript) {
      setIsLoading(true);
      existingScript.addEventListener('load', () => {
        setIsReady(true);
        setIsLoading(false);
      });
      existingScript.addEventListener('error', () => {
        setError('Failed to load Calendly script');
        setIsLoading(false);
      });
      return;
    }

    // Load Calendly script
    setIsLoading(true);
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      setIsReady(true);
      setIsLoading(false);
    };
    
    script.onerror = () => {
      setError('Failed to load Calendly script');
      setIsLoading(false);
    };
    
    document.body.appendChild(script);
  }, []);

  const openCalendly = () => {
    if (isReady && window.Calendly) {
      try {
        window.Calendly.initPopupWidget({
          url: 'https://calendly.com/atasaka-tr/30min?background_color=000000&text_color=ffffff&primary_color=5322e6'
        });
        
        // Apply styling fixes after popup creation
        setTimeout(() => {
          const calendlyOverlay = document.querySelector('.calendly-overlay') as HTMLElement;
          const calendlyPopup = document.querySelector('.calendly-popup') as HTMLElement;
          const calendlyContent = document.querySelector('.calendly-popup-content') as HTMLElement;
          
          if (calendlyOverlay) {
            calendlyOverlay.style.setProperty('z-index', '99999', 'important');
            calendlyOverlay.style.setProperty('display', 'block', 'important');
            calendlyOverlay.style.setProperty('visibility', 'visible', 'important');
            calendlyOverlay.style.setProperty('opacity', '1', 'important');
            calendlyOverlay.style.setProperty('position', 'fixed', 'important');
            calendlyOverlay.style.setProperty('top', '0', 'important');
            calendlyOverlay.style.setProperty('left', '0', 'important');
            calendlyOverlay.style.setProperty('width', '100%', 'important');
            calendlyOverlay.style.setProperty('height', '100vh', 'important');
            calendlyOverlay.style.setProperty('min-height', '100vh', 'important');
            calendlyOverlay.style.setProperty('max-height', 'none', 'important');
          }
          
          if (calendlyPopup) {
            calendlyPopup.style.setProperty('width', '90%', 'important');
            calendlyPopup.style.setProperty('max-width', '900px', 'important');
            calendlyPopup.style.setProperty('height', '90vh', 'important');
            calendlyPopup.style.setProperty('max-height', '90vh', 'important');
            calendlyPopup.style.setProperty('min-height', '600px', 'important');
            calendlyPopup.style.setProperty('position', 'fixed', 'important');
            calendlyPopup.style.setProperty('top', '50%', 'important');
            calendlyPopup.style.setProperty('left', '50%', 'important');
            calendlyPopup.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
            calendlyPopup.style.setProperty('z-index', '99999', 'important');
            
            // Add custom close button
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '×';
            closeButton.style.cssText = `
              position: fixed !important;
              top: calc(5vh + 15px) !important;
              left: calc(5vw + 15px) !important;
              width: 35px !important;
              height: 35px !important;
              background: rgba(255, 255, 255, 0.95) !important;
              border: none !important;
              border-radius: 50% !important;
              font-size: 22px !important;
              font-weight: bold !important;
              color: #333 !important;
              cursor: pointer !important;
              z-index: 100001 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              box-shadow: 0 3px 15px rgba(0,0,0,0.4) !important;
              transition: all 0.2s ease !important;
              touch-action: manipulation !important;
              -webkit-tap-highlight-color: transparent !important;
            `;
            
            closeButton.addEventListener('click', () => {
              window.location.reload();
            });
            
            closeButton.addEventListener('mouseenter', () => {
              closeButton.style.background = 'rgba(255, 255, 255, 1)';
              closeButton.style.transform = 'scale(1.1)';
            });
            
            closeButton.addEventListener('mouseleave', () => {
              closeButton.style.background = 'rgba(255, 255, 255, 0.9)';
              closeButton.style.transform = 'scale(1)';
            });
            
            // Try to append to popup content instead of popup container
            if (calendlyContent) {
              calendlyContent.appendChild(closeButton);
            } else {
              calendlyPopup.appendChild(closeButton);
            }
          }
          
          if (calendlyContent) {
            calendlyContent.style.setProperty('height', '100%', 'important');
            calendlyContent.style.setProperty('max-height', 'none', 'important');
            calendlyContent.style.setProperty('overflow', 'auto', 'important');
          }
        }, 500);
        
      } catch (error) {
        console.error('Error initializing Calendly popup:', error);
      }
    } else if (error) {
      console.error('Calendly failed to load:', error);
    } else {
      console.warn('Calendly is not ready yet');
    }
  };

  return (
    <CalendlyContext.Provider value={{ isReady, isLoading, error, openCalendly }}>
      {children}
    </CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const context = useContext(CalendlyContext);
  if (context === undefined) {
    throw new Error('useCalendly must be used within a CalendlyProvider');
  }
  return context;
}