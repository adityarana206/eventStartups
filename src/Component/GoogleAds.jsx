import React, { useEffect, useRef, useState } from 'react';

function GoogleAds() {
    const adRef = useRef(null);  // Ref for the <ins> element
    const [isAdLoaded, setIsAdLoaded] = useState(false);  // Track if ad has been loaded

    useEffect(() => {
        // Check if the AdSense script is already added to the DOM
        const existingScript = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
        
        if (!existingScript) {
            // Load the AdSense script dynamically
            const adsScript = document.createElement('script');
            adsScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            adsScript.async = true;
            adsScript.crossOrigin = "anonymous";
            document.body.appendChild(adsScript);

            // Once the script is loaded, initialize the ad
            adsScript.onload = () => {
                if (adRef.current && !isAdLoaded) {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        setIsAdLoaded(true);  // Mark the ad as loaded
                    } catch (e) {
                        console.error("Adsense script error: ", e);
                    }
                }
            };
        } else {
            // If the script is already loaded, initialize the ad only if not already done
            if (adRef.current && !isAdLoaded && typeof window.adsbygoogle !== 'undefined') {
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    setIsAdLoaded(true);  // Mark the ad as loaded
                } catch (e) {
                    console.error("Adsense script error: ", e);
                }
            }
        }
    }, [isAdLoaded]);  // Only run this when `isAdLoaded` changes

    return (
        <div>
            <h2>Google Ad</h2>

            {/* Google AdSense Ad */}
            <ins ref={adRef} className="adsbygoogle"
                style={{ display: 'block', minHeight: '250px' }}  // Ensure height for ad to show
                data-ad-client="ca-pub-2201007872031999"
                data-ad-slot="9086624970"
                data-ad-format="fluid"
                data-ad-layout-key="-fb+5w+4e-db+86"></ins>
        </div>
    );
}

export default GoogleAds;
