// Carousel.tsx
import clsx from "clsx";
import {
  HTMLAttributes,
  ReactElement,
  cloneElement,
  createRef,
  forwardRef,
  useEffect,
  useState,
  RefObject,
  RefAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";
import { IComponentBaseProps } from "../types";
import { CarouselItemProps, CarouselItemWidth } from "./CarouselItem";

export type CarouselProps = HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    children: ReactElement<CarouselItemProps & RefAttributes<HTMLDivElement>>[];
    display?: "slider" | "numbered" | "sequential";
    snap?: "start" | "center" | "end";
    vertical?: boolean;
    width?: CarouselItemWidth;
    buttonStyle?: (value: string) => ReactElement<{ onClick?: () => void }>;
  };

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      display = "slider",
      snap,
      vertical,
      width,
      buttonStyle,
      dataTheme,
      className,
      ...props
    },
    ref
  ): ReactElement => {
    const classes = twMerge(
      "carousel",
      className,
      clsx({
        "carousel-center": snap === "center",
        "carousel-end": snap === "end",
        "carousel-vertical": vertical,
        "w-full": display !== "slider",
      })
    );

    // Updated state type to include | null
    const [itemRefs, setItemRefs] = useState<RefObject<HTMLDivElement | null>[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const newRefs: RefObject<HTMLDivElement | null>[] = children.map(() =>
        createRef<HTMLDivElement>()
      );
      setItemRefs(newRefs);
    }, [children]);

    const scrollToIndex = (index: number) => {
      const adjustedIndex =
        index < 0 ? children.length - 1 : index >= children.length ? 0 : index;
      itemRefs[adjustedIndex].current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: snap,
      });
      setActiveIndex(adjustedIndex);
    };

    return (
      <>
        <div
          role="listbox"
          aria-label="Image carousel"
          {...props}
          ref={ref}
          data-theme={dataTheme}
          className={classes}
        >
          {children.map((child, i) => {
            const childRef = itemRefs[i] as RefObject<HTMLDivElement | null>;

            return cloneElement(child, {
              key: i,
              ref: childRef,
              index: i + 1,
              width: display !== "slider" ? "full" : width,
              hasButtons: display === "sequential",
              buttonStyle,
              onPrev: () =>
                scrollToIndex(i - 1 < 0 ? children.length - 1 : i - 1),
              onNext: () =>
                scrollToIndex(i + 1 >= children.length ? 0 : i + 1),
            });
          })}
        </div>
        {display === "numbered" && (
          <div className="flex w-full justify-center gap-2 py-2">
            {children.map((_, i) => {
              if (buttonStyle != null) {
                return cloneElement(buttonStyle((i + 1).toString()), {
                  key: i,
                  onClick: () => scrollToIndex(i),
                });
              }

              return (
                <Button
                  active={i === activeIndex}
                  key={i}
                  onClick={() => scrollToIndex(i)}
                >
                  {i + 1}
                </Button>
              );
            })}
          </div>
        )}
      </>
    );
  }
);

Carousel.displayName = "Carousel";

export default Carousel;
