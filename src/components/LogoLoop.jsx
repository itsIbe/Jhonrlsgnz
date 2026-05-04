import React, { useEffect, useRef } from 'react';
import './LogoLoop.css';

const LogoLoop = ({
    logos,
    speed = 100,
    direction = 'left',
    logoHeight = 60,
    gap = 60,
    hoverSpeed = 0,
    scaleOnHover = false,
    fadeOut = false,
    fadeOutColor,
    ariaLabel,
    useCustomRender = false,
}) => {
    const trackRef = useRef(null);
    const listRef = useRef(null);
    const animationRef = useRef(null);
    const renderedLogos = [...logos, ...logos];

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const items = list.querySelectorAll('.logoloop__item');
        if (items.length === 0) return;

        const itemWidth = items[0].offsetWidth + gap;
        const loopWidth = itemWidth * (items.length / 2);

        let position = 0;
        const animate = () => {
            if (direction === 'left') {
                position -= speed / 60;
                if (-position >= loopWidth) {
                    position += loopWidth;
                }
            } else {
                position += speed / 60;
                if (position >= loopWidth) {
                    position -= loopWidth;
                }
            }

            if (list) {
                list.style.transform = `translateX(${position}px)`;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [speed, direction, gap, logos]);

    const containerClasses = [
        'logoloop',
        scaleOnHover && 'logoloop--scale-hover',
        fadeOut && 'logoloop--fade',
    ].filter(Boolean).join(' ');

    const trackStyle = {
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        '--logoloop-fadeColor': fadeOutColor,
    };

    return (
        <div
            className={containerClasses}
            style={trackStyle}
            role="img"
            aria-label={ariaLabel}
        >
            <div className="logoloop__track" ref={trackRef}>
                <div className="logoloop__list" ref={listRef}>
                    {renderedLogos.map((logo, index) => (
                        <div key={index} className="logoloop__item">
                            {logo.href ? (
                                <a href={logo.href} className="logoloop__link" target="_blank" rel="noopener noreferrer">
                                    <div className="logoloop__node">
                                        {logo.node || <img src={logo.src} alt={logo.alt} />}
                                    </div>
                                </a>
                            ) : (
                                <div className="logoloop__node">
                                    {logo.node || <img src={logo.src} alt={logo.alt} />}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoLoop;