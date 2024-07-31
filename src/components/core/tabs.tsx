'use client';
import {AnimatePresence, Transition, motion} from 'framer-motion';
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
} from 'react';
import {cn} from '../../lib/utils';

type TabsProps = {
  children:
    | ReactElement<{'data-id': string}>[]
    | ReactElement<{'data-id': string}>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export default function Tabs({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: TabsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  const handleSetHoveredId = (id: string | null) => {
    setHoveredId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  return Children.map(children, (child: any, index) => {
    const id = child.props['data-id'];

    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetHoveredId(id),
          onMouseLeave: () => handleSetHoveredId(null),
          onClick: () => handleSetActiveId(id),
        }
      : {
          onClick: () => handleSetActiveId(id),
        };

    return cloneElement(
      child,
      {
        key: index,
        className: cn('relative inline-flex', child.props.className),
        'aria-selected': activeId === id,
        'data-checked': activeId === id ? 'true' : 'false',
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {hoveredId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn('absolute inset-0', className)}
              transition={transition}
              initial={{opacity: defaultValue ? 1 : 0}}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`outline-${uniqueId}`}
              className={cn(
                'absolute -bottom-2 left-0 w-full h-[0.5px] bg-white'
              )}
              transition={transition}
              initial={{opacity: defaultValue ? 1 : 0}}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        <span className='z-10'>{child.props.children}</span>
      </>
    );
  });
}
