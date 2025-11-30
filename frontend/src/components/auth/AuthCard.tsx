/**
 * Authentication card wrapper component
 */

import type { ReactNode, ElementType } from 'react';
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
 * Reusable authentication card wrapper for auth pages
 */
export function AuthCard({
  icon: Icon,
  title,
  description,
  children,
  iconGradient = 'from-[#C8AA6E] to-[#785A28]',
  titleColor = 'text-[#C8AA6E]',
  className,
  backgroundGradient = 'from-[#0A1428] via-[#091428] to-[#0A1929]',
  iconShadowColor = 'shadow-[0_0_20px_rgba(200,170,110,0.4)]',
}: AuthCardProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-6 relative overflow-hidden',
        `bg-gradient-to-br ${backgroundGradient}`
      )}
    >
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8AA6E] opacity-5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0AC8B9] opacity-5 rounded-full blur-[100px]" />
      
      {/* Language switcher - top right position */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      
      <Card
        className={cn(
          'w-full max-w-md relative z-10 bg-[#0A1929]/90 backdrop-blur-sm border border-[rgba(200,170,110,0.2)] shadow-[0_0_30px_rgba(0,0,0,0.5)]',
          className
        )}
      >
        <CardHeader className="text-center pt-10">
          <div
            className={cn(
              'mx-auto w-20 h-20 rounded-3xl mb-4 flex items-center justify-center',
              `bg-gradient-to-br ${iconGradient}`,
              iconShadowColor
            )}
          >
            <Icon size={40} className="text-[#0A1428]" />
          </div>
          <CardTitle className={cn('text-3xl font-bold mb-1', titleColor)}>
            {title}
          </CardTitle>
          <CardDescription className="text-[#A09B8C] font-medium">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 space-y-6">{children}</CardContent>
      </Card>
    </div>
  );
}
