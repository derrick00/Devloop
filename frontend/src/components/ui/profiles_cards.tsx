import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, Link  } from 'react-router-dom';
import blankPic from "@/assets/user.jpg"
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/Context";


export const HoverEffect = ({
  items,
  className,
  handleProfileClick,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
  handleProfileClick?: (name: string) => void;
}) => {
  const { toggleActive,token, setToken, showModal, setShowModal, user, setUser } = useAppContext();
  const navigate = useNavigate(); 
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);



  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={'./user'}
          key={item.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleProfileClick(item.name)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className='flex text-zinc-100'>
                  <img className='w-20 h-20 rounded-full border border-white border-3'
                  src={ blankPic } />
                <div className='ml-3'>
                  <Link to="/user" >
                    <div className='mt-2 mb-3 font-extrabold'>{item.name}</div>
                  </Link>
                  <div className='mt-2 mb-3'>{item.short_Intro}</div>
                </div>
            </div>
            <div>
                <div className='text-zinc-100 mt-2 mb-3 line-clamp-4 max-w-prose'>{item.bio}</div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-10",
        className
      )}
    >
      <div className="relative z-20">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
