import React, { useState, useEffect } from 'react';

const PwaDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    isStandalone: false,
    isOnline: navigator.onLine,
    serviceWorker: 'checking...',
    installPromptSupported: false,
    displayMode: 'checking...',
    manifestPresent: false,
    platform: navigator.platform,
    userAgent: navigator.userAgent
  });

  useEffect(() => {
    // Check for standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator.standalone === true);
    
    // Check for service worker support and registration
    let serviceWorkerStatus = 'not supported';
    if ('serviceWorker' in navigator) {
      serviceWorkerStatus = 'supported, checking registration...';
      navigator.serviceWorker.getRegistrations().then(registrations => {
        serviceWorkerStatus = registrations.length > 0 
          ? `registered (${registrations.length} worker(s))` 
          : 'supported, but not registered';
        
        setDebugInfo(prev => ({ ...prev, serviceWorker: serviceWorkerStatus }));
      }).catch(err => {
        serviceWorkerStatus = `error checking: ${err.message}`;
        setDebugInfo(prev => ({ ...prev, serviceWorker: serviceWorkerStatus }));
      });
    }

    // Check for manifest
    const manifestLink = document.querySelector('link[rel="manifest"]');
    const manifestPresent = !!manifestLink;

    // Check for install prompt support
    const installPromptSupported = 'BeforeInstallPromptEvent' in window;

    // Check display mode
    const displayModes = ['fullscreen', 'standalone', 'minimal-ui', 'browser'];
    let currentDisplayMode = 'unknown';
    
    for (const mode of displayModes) {
      if (window.matchMedia(`(display-mode: ${mode})`).matches) {
        currentDisplayMode = mode;
        break;
      }
    }

    setDebugInfo(prev => ({
      ...prev,
      isStandalone,
      serviceWorker: serviceWorkerStatus,
      installPromptSupported,
      displayMode: currentDisplayMode,
      manifestPresent
    }));

    // Listen for online/offline events
    const handleOnlineChange = () => {
      setDebugInfo(prev => ({ ...prev, isOnline: navigator.onLine }));
    };

    window.addEventListener('online', handleOnlineChange);
    window.addEventListener('offline', handleOnlineChange);

    return () => {
      window.removeEventListener('online', handleOnlineChange);
      window.removeEventListener('offline', handleOnlineChange);
    };
  }, []);

  // Manual install trigger
  const triggerInstallPrompt = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        window.deferredPrompt = null;
      });
    } else {
      alert('No installation prompt available. This could be because:\n' +
            '1. The app is already installed\n' +
            '2. The browser doesn\'t support PWA installation\n' +
            '3. The site doesn\'t meet PWA installation criteria');
    }
  };

  const debugStyle = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    fontSize: '12px',
    padding: '10px',
    zIndex: 9999,
    maxHeight: '50vh',
    overflowY: 'auto'
  };

  return (
    <div style={debugStyle}>
      <h3>PWA Debug Info</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {Object.entries(debugInfo).map(([key, value]) => (
            <tr key={key} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              <td style={{ padding: '5px', fontWeight: 'bold' }}>{key}</td>
              <td style={{ padding: '5px' }}>{typeof value === 'boolean' ? value.toString() : value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        onClick={triggerInstallPrompt}
        style={{
          background: '#FFFF00',
          color: 'black',
          border: 'none',
          padding: '8px 16px',
          margin: '10px 0',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Force Install Prompt
      </button>
    </div>
  );
};

export default PwaDebug;