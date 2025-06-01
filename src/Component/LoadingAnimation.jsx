import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LoadingAnimation = ({ animationData }) => {
    const animationContainer = useRef(null);

    useEffect(() => {
        console.log(animationData, 'animation data');
        const anim = lottie.loadAnimation({
            container: animationContainer.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData // the animation data
        });

        return () => anim.destroy(); // Optional clean up for unmounting
    }, [animationData]);

    return <div ref={animationContainer}></div>;
};

export default LoadingAnimation;
