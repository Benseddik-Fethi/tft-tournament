/**
 * Authentication card wrapper component with Glassmorphism
 */

import type { ReactNode, ElementType } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface AuthCardProps {
  /** Icon component to display */
  icon: ElementType;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Card content */
  children: ReactNode;
  /** Icon background gradient */
  iconGradient?: string;
  /** Title color class */
  titleColor?: string;
  /** Additional CSS classes for card */
  className?: string;
  /** Background gradient for page */
  backgroundGradient?: string;
  /** Shadow color class for icon container */
  iconShadowColor?: string;
}

/**
 * Reusable authentication card wrapper for auth pages with premium glass styling
 */
export function AuthCard({
  icon: Icon,
  title,
  description,
  children,
  iconGradient = 'from-[#C8AA6E] to-[#785A28]',
  titleColor = 'text-[#C8AA6E]',
  className,
  iconShadowColor = 'shadow-[0_0_20px_rgba(200,170,110,0.4)]',
}: AuthCardProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-6 relative overflow-hidden',
        'bg-[var(--tft-bg-dark)]'
      )}
    >
      {/* Animated Background Effects */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8AA6E] opacity-5 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0AC8B9] opacity-5 rounded-full blur-[100px]"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#9D4DFF] opacity-5 rounded-full blur-[80px]"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Language switcher - top right position */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className={cn(
            'w-full max-w-md relative z-10 glass-card hextech-clip',
            'border-[var(--glass-border)]',
            className
          )}
        >
          <CardHeader className="text-center pt-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              className={cn(
                'mx-auto w-20 h-20 rounded-3xl mb-4 flex items-center justify-center',
                `bg-gradient-to-br ${iconGradient}`,
                iconShadowColor
              )}
            >
              <Icon size={40} className="text-[#0A1428]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <CardTitle className={cn('text-3xl font-bold mb-1', titleColor)}>
                {title}
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <CardDescription className="text-[var(--tft-text-secondary)] font-medium">
                {description}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <CardContent className="p-8 space-y-6">{children}</CardContent>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
