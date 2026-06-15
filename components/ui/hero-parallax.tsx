"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ParallaxProduct = {
  title: string;
  link: string;
  thumbnail: string;
  objectPosition?: string;
};

function swapProductsInRow(
  row: ParallaxProduct[],
  titleA: string,
  titleB: string
) {
  const indexA = row.findIndex((product) => product.title === titleA);
  const indexB = row.findIndex((product) => product.title === titleB);

  if (indexA === -1 || indexB === -1) {
    return row;
  }

  const nextRow = [...row];
  nextRow[indexA] = row[indexB];
  nextRow[indexB] = row[indexA];
  return nextRow;
}

function swapCommercialConstructionAndRestaurantBuild(
  secondRow: ParallaxProduct[],
  thirdRow: ParallaxProduct[]
) {
  const commercialConstructionIndex = thirdRow.findIndex(
    (product) => product.title === "Commercial Construction"
  );
  const restaurantIndex = secondRow.findIndex(
    (product) => product.title === "Restaurant Build"
  );

  if (commercialConstructionIndex === -1 || restaurantIndex === -1) {
    return { secondRow, thirdRow };
  }

  const nextSecondRow = [...secondRow];
  const nextThirdRow = [...thirdRow];
  nextSecondRow[restaurantIndex] = thirdRow[commercialConstructionIndex];
  nextThirdRow[commercialConstructionIndex] = secondRow[restaurantIndex];

  return { secondRow: nextSecondRow, thirdRow: nextThirdRow };
}

function getMobileRows(
  secondRow: ParallaxProduct[],
  thirdRow: ParallaxProduct[]
) {
  const { secondRow: swappedSecondRow, thirdRow: mobileThirdRow } =
    swapCommercialConstructionAndRestaurantBuild(secondRow, thirdRow);

  const mobileSecondRow = swapProductsInRow(
    swappedSecondRow,
    "Custom Home Build",
    "Acoustic Ceilings"
  );

  return { mobileSecondRow, mobileThirdRow };
}

export const HeroParallax = ({
  products,
}: {
  products: ParallaxProduct[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const { mobileSecondRow, mobileThirdRow } = getMobileRows(secondRow, thirdRow);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-x-hidden pt-28 pb-4 antialiased [perspective:1000px] [transform-style:preserve-3d] md:h-[350vh] md:py-40"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="hidden md:block"
      >
        <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="mb-20 flex flex-row space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div className="md:hidden">
        <motion.div className="mb-8 flex flex-row-reverse space-x-12 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`mobile-first-${product.title}`}
              compact
            />
          ))}
        </motion.div>
        <motion.div className="mb-8 flex flex-row space-x-12 md:hidden">
          {mobileSecondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`mobile-second-${product.title}`}
              compact
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-12 space-x-reverse md:hidden">
          {mobileThirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`mobile-third-${product.title}`}
              compact
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="relative top-0 left-0 mx-auto w-full max-w-7xl px-4 py-8 text-center md:py-40 md:text-left">
      <h1 className="text-2xl font-bold md:text-7xl dark:text-white">
        Building Excellence, <br /> Rooted in Family Values.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base md:mx-0 md:mt-8 md:text-xl dark:text-neutral-200">
        From custom homes to commercial spaces, GP Contracting Group delivers
        precision, craftsmanship, and integrity across every project in
        Greater Vancouver. Built on a family legacy of doing what is right.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  compact = false,
}: {
  product: ParallaxProduct;
  translate: MotionValue<number>;
  compact?: boolean;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className={`group/product relative flex-shrink-0 ${
        compact ? "h-56 w-[16rem]" : "h-96 w-[30rem]"
      }`}
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: product.objectPosition ?? "left top" }}
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
