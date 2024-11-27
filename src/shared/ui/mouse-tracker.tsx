import { createPortal } from 'react-dom';
import { FC, ReactNode, useEffect, useState } from 'react';

type MousePositionProps = {
  x?: number;
  y?: number;
  trigger?: boolean;
  children: ReactNode;
};

const MouseTracker: FC<MousePositionProps> = ({ children, x, y, trigger }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      setPosition({
        x: x || event.clientX - 50,
        y: y || event.clientY - 45,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return trigger
    ? createPortal(
        <div className="pointer-events-none relative h-dvh">
          <div
            className="pointer-events-none fixed flex items-center justify-center rounded border border-[#E7E7E7] bg-[#F8FAFC] px-3 py-2"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          >
            {children}
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default MouseTracker;
