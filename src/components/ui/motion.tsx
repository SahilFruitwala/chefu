"use client";

import * as React from "react";

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  initial?: any;
  animate?: any;
  transition?: any;
  variants?: any;
  whileHover?: any;
  whileTap?: any;
  children?: React.ReactNode;
}

export const motion = {
  div: ({
    initial,
    animate,
    transition,
    variants,
    whileHover,
    whileTap,
    children,
    className,
    ...props
  }: MotionProps) => {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
      setIsClient(true);
    }, []);

    // Simple animations using CSS transitions
    const getTransitionStyles = () => {
      if (!isClient) return {};

      if (animate && initial) {
        return {
          opacity: animate.opacity,
          transform: animate.y
            ? `translateY(${animate.y}px)`
            : animate.x
            ? `translateX(${animate.x}px)`
            : animate.scale
            ? `scale(${animate.scale})`
            : "",
          transition: `opacity ${
            transition?.duration || 0.3
          }s ease, transform ${transition?.duration || 0.3}s ease`,
        };
      }

      return {};
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (whileHover && isClient) {
        const target = e.currentTarget;
        if (whileHover.scale) {
          target.style.transform = `scale(${whileHover.scale})`;
        }
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (whileHover && isClient) {
        const target = e.currentTarget;
        target.style.transform = "";
      }
    };

    return (
      <div
        className={className}
        style={{
          ...getTransitionStyles(),
          transition: `all ${transition?.duration || 0.3}s ${
            transition?.ease || "ease-out"
          }`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  },
};
