import React, { createContext, useContext, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, HTMLMotionProps } from 'framer-motion';

interface DockContextValue {
  mouseX: MotionValue<number>;
}

const DockContext = createContext<DockContextValue>({
  mouseX: null!,
});

export const Dock = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, ...props }, ref) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX }}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          'flex h-16 items-center gap-6 rounded-2xl px-6 backdrop-blur-md',
          className
        )}
        {...props}
      />
    </DockContext.Provider>
  );
});
Dock.displayName = 'Dock';

export const DockItem = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'>
>(({ className, children, ...props }, ref) => {
  const { mouseX } = useContext(DockContext);
  const ref2 = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    if (!ref2.current) return 0;
    const rect = ref2.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [45, 65, 45]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref2}
      style={{ width }}
      className={cn('aspect-square w-12 group relative', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
});
DockItem.displayName = 'DockItem';

export const DockIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('h-full w-full p-2.5 transition-all duration-300 ease-out group-hover:scale-110', className)}
      {...props}
    >
      {children}
    </div>
  );
});
DockIcon.displayName = 'DockIcon';

export const DockLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-9 z-50 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 px-3 py-1.5 rounded-lg text-xs font-medium shadow-xl backdrop-blur-md',
        className
      )}
      {...props}
    />
  );
});
DockLabel.displayName = 'DockLabel'; 