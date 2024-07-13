import NavigationButtons from "./NavigationButtons";
import { motion } from "framer-motion";

interface NavSideProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

export default function Toolbar({
  setActive,
}: NavSideProps): React.ReactElement {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    setActive(false);
    setTimeout(() => {
      window.location.href = path;
    }, 800);
  };

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="h-screen bg-primary fixed right-0 top-0 text-white z-10"
    >
      <div className="box-border h-full px-6 pt-10 flex flex-col justify-between">
        <div className="flex flex-col text-xl gap-3 mt-20">
          <NavigationButtons />
        </div>
      </div>
    </motion.div>
  );
}
