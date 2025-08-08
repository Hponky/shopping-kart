"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-[95vw] sm:w-[85vw] md:max-w-md lg:max-w-lg",
  md: "w-[95vw] sm:w-[90vw] md:max-w-lg lg:max-w-xl",
  lg: "w-[95vw] sm:w-[90vw] md:w-[85vw] lg:max-w-2xl xl:max-w-3xl",
  xl: "w-[95vw] sm:w-[90vw] md:w-[85vw] lg:max-w-4xl xl:max-w-5xl"
};

export function Modal({ isOpen, onClose, title, children, size = "lg" }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Asegurar que el modal esté por encima de todo
      document.body.style.position = "relative";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.body.style.position = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        style={{ 
          zIndex: 2147483647, // Máximo z-index posible
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        />
        
        {/* Modal */}
        <motion.div
          className={`relative ${sizeClasses[size]} max-h-[95vh] sm:max-h-[90vh] bg-card rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl border border-border overflow-hidden mt-4 sm:mt-0`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 35,
            duration: 0.25
          }}
          onClick={(e) => e.stopPropagation()}
          style={{ 
            zIndex: 2147483647,
            position: 'relative'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 sticky top-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground pr-4 truncate flex-1">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors group"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-foreground" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto overflow-x-hidden max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-88px)]">
            <div className="p-4 sm:p-5 md:p-6 min-w-0">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Usar portal para montar el modal directamente en el body
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}