import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
export default function Modal({
  children,
  open,
  setOpen,
}: {
  children: any;
  open: boolean;
  setOpen: any;
}) {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  useEffect(()=>{
    if(open){
      window.document.body.style.overflow = 'scroll';
    }
    if(!open){
window.document.body.style.overflow = 'auto';
    }
  },[open])
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          className={`py-10 min-h-screen w-full top-0 left-0 right-0 bottom-0 absolute bg-transparent backdrop-blur-[3px] ${
            open ? 'flex' : 'hidden'
          } items-center justify-center fixed z-50 duration-500 ease-out transition transform`}
          onClick={()=>setOpen(false)}
        >
          <div className="md:max-w-md xl:max-w-xl lg:max-w-lg sm:max-w-sm w-full flex flex-col items-end md:px-0 px-6 gap-6">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-grey-dark shadow">
              <FaTimes onClick={() => setOpen(false)} />
            </div>
            <div className="bg-white p-10 rounded-md shadow w-full overflow-y-auto h-[80vh] modal-body" onClick={e => e.stopPropagation()}>
            {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
