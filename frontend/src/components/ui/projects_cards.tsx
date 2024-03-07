import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, Link  } from 'react-router-dom';
import blankPic from "@/assets/project.jpg"
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 tablet:grid-cols-2  laptop:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={item.link}
          key={item.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
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
            <img className='rounded-lg mt-0'
              src={ blankPic } />
            <CardTitle className="text-xl">{item.title}</CardTitle>

            <div className='text-sm text-zinc-400 cursor-pointer'>
              <span>{item.owner.name}</span>
            </div>

            <CardDescription className="line-clamp-4">{item.description}</CardDescription>


            <div className='flex text-zinc-400 text-sm'>
              <div className='mt-2 mmb-2 font-bold '>
                {item.vote_ratio}%
              </div>
              <div className='mt-2 mmb-2'>
                Positive Feedback({item.vote_total})
              </div>
            </div>
            <div className='mt-2 mmb-2 flex flex-row gap-1 text-blue-700 underline underline-offset-1 cursor-pointer'>
              {item.tags.map((tag) => (
                <span>{tag.name}</span>
              ))}
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
