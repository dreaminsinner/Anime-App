import { useEffect, useRef } from 'react';

const useScrollAnimation = () => {
    const cardContainerRef = useRef(null);

    useEffect(() => {
        const cardContainer = cardContainerRef.current;

        let animationFrame = null;
        let scrollAmount = 0;
        const scrollStep = 200;

        const handleWheel = (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);
            scrollAmount += scrollStep * delta;
            scrollContainer();
        };

        const scrollContainer = () => {
            cardContainer.scrollLeft = scrollAmount;
            animationFrame = requestAnimationFrame(scrollContainer);
        };

        const stopScrolling = () => {
            cancelAnimationFrame(animationFrame);
        };

        cardContainer.addEventListener('wheel', handleWheel);

        cardContainer.addEventListener('mouseleave', () => {
            scrollAmount = cardContainer.scrollLeft;
            cardContainer.removeEventListener('wheel', handleWheel);
            cardContainer.removeEventListener('mouseenter', stopScrolling);
        });

        return () => {
            cardContainer.removeEventListener('wheel', handleWheel);
            cardContainer.removeEventListener('mouseenter', stopScrolling);
        };
    }, []);

    return cardContainerRef;
};

export default useScrollAnimation;
