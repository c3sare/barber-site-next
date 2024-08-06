"use client";

import { IconType } from "@/components/icons/IconType";
import { animated, useInView, useSpring } from "@react-spring/web";
import { useEffect, useRef } from "react";

type ExperienceBarProps = {
  icon: IconType;
  title: string;
  value: number;
};

const duration = 800;
const delay = 300;

export const ExperienceBar: React.FC<ExperienceBarProps> = ({
  icon: Icon,
  title,
  value,
}) => {
  const valueRef = useRef<HTMLDivElement>(null);
  const [ref, isInView] = useInView({
    rootMargin: "84px 0px 0px 0px",
  });
  const styles = useSpring({
    width: `${isInView ? value : 0}%`,
    delay: isInView ? delay : 0,
    config: {
      duration: isInView ? duration : 0,
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;
    if (isInView) {
      setTimeout(() => {
        interval = setInterval(() => {
          const currentValue =
            parseInt(valueRef.current!.textContent ?? "0") + 1;
          valueRef.current!.textContent = String(currentValue);

          if (currentValue >= value && interval) {
            clearInterval(interval);
            interval = null;
          }
        }, duration / value);
      }, delay);
    } else {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      valueRef.current!.textContent = "0";
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  }, [isInView, value]);

  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-[10px]">
        <Icon width={16} height={16} />
        <span className="text-xs font-bold">{title}</span>
      </div>
      <div className="h-[24px] w-full bg-[#f7f8fa]">
        <animated.div
          className="h-[24px] bg-[#486b71] relative overflow-hidden"
          ref={ref}
          style={styles}
        >
          <div
            className="absolute bottom-0 h-full text-xs font-bold tracking-widest py-1 w-8 text-center text-white right-0"
            ref={valueRef}
          >
            0
          </div>
        </animated.div>
      </div>
    </div>
  );
};
