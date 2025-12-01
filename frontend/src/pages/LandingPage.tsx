/**
 * TFT Tournament Landing Page
 * Premium public homepage with Hextech design, glassmorphism, and 3D effects
 */

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Trophy, Users, BarChart3, Video, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { TftLogo } from "@/components/tft/TftLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ROUTES } from "@/config";

export default function LandingPage() {
  const { t } = useTranslation('pages');

  const features = [
    {
      icon: Trophy,
      title: t('landing.features.formats.title'),
      description: t('landing.features.formats.description'),
    },
    {
      icon: Users,
      title: t('landing.features.players.title'),
      description: t('landing.features.players.description'),
    },
    {
      icon: BarChart3,
      title: t('landing.features.standings.title'),
      description: t('landing.features.standings.description'),
    },
    {
      icon: Video,
      title: t('landing.features.twitch.title'),
      description: t('landing.features.twitch.description'),
    },
  ];

  const steps = [
    { number: 1, title: t('landing.howItWorks.step1') },
    { number: 2, title: t('landing.howItWorks.step2') },
    { number: 3, title: t('landing.howItWorks.step3') },
    { number: 4, title: t('landing.howItWorks.step4') },
  ];

  const stats = [
    { value: "150+", label: t('landing.stats.tournaments') },
    { value: "2.5K", label: t('landing.stats.players') },
    { value: "50+", label: t('landing.stats.casters') },
  ];

  return (
    <div className="min-h-screen bg-[var(--tft-bg-dark)]">
      {/* Navigation - Glass effect */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TftLogo size="sm" />
            </motion.div>
            <div className="hidden md:flex items-center gap-6">
              <Link
                to={ROUTES.TOURNAMENTS}
                className="text-[var(--tft-text-secondary)] hover:text-[#C8AA6E] transition-colors font-medium"
              >
                {t('landing.nav.tournaments')}
              </Link>
              <Link
                to={ROUTES.CIRCUITS}
                className="text-[var(--tft-text-secondary)] hover:text-[#C8AA6E] transition-colors font-medium"
              >
                {t('landing.nav.circuits')}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to={ROUTES.LOGIN}>
              <Button variant="tft-ghost" size="sm">
                {t('landing.nav.login')}
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button variant="tft-primary" size="sm">
                {t('landing.nav.register')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Mesh Gradient */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 bg-[var(--tft-bg-dark)]" />
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-[#C8AA6E]/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#0AC8B9]/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#9D4DFF]/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge with glass effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#C8AA6E]" />
            <span className="text-sm font-medium text-[#C8AA6E]">
              {t('landing.hero.badge')}
            </span>
          </motion.div>

          {/* Title with stagger animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-[var(--tft-text-primary)]">{t('landing.hero.titleLine1')}</span>
            <br />
            <span className="bg-gradient-to-r from-[#F0E6D2] via-[#C8AA6E] to-[#785A28] bg-clip-text text-transparent">
              {t('landing.hero.titleLine2')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[var(--tft-text-secondary)] max-w-2xl mx-auto mb-10"
          >
            {t('landing.hero.subtitle')}
          </motion.p>

          {/* CTA Buttons with 3D effect */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link to={ROUTES.REGISTER}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="tft-primary" size="xl" className="rounded-xl hextech-clip-top">
                  {t('landing.hero.cta.create')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="tft-ghost" size="xl" className="rounded-xl">
                  {t('landing.hero.cta.browse')}
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats with glass cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center glass-card-subtle px-6 py-4 rounded-xl"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#C8AA6E] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--tft-text-secondary)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-20 px-6 bg-[var(--tft-bg-darker)] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border border-[#C8AA6E] rounded-full" />
          <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#0AC8B9] rounded-full" />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--tft-text-primary)] mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-[var(--tft-text-secondary)] max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group p-6 rounded-2xl glass-card gradient-overlay-gold cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C8AA6E] to-[#785A28] flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(200,170,110,0.4)] transition-shadow">
                    <Icon className="w-6 h-6 text-[#0A1428]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--tft-text-primary)] mb-2 group-hover:text-[#C8AA6E] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--tft-text-secondary)]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-[var(--tft-bg-dark)] relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--tft-text-primary)] mb-4">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-[var(--tft-text-secondary)]">
              {t('landing.howItWorks.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line - Gradient */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-[#C8AA6E] via-[#0AC8B9] to-[#9D4DFF] hidden md:block" />

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative text-center"
                >
                  {/* Step Number with neon glow */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full glass-card border-2 border-[#C8AA6E] flex items-center justify-center glow-gold"
                  >
                    <span className="text-2xl font-bold text-[#C8AA6E]">
                      {step.number}
                    </span>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[var(--tft-text-primary)]">
                    {step.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Premium styling */}
      <section className="py-20 px-6 bg-[var(--tft-bg-darker)] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-[#C8AA6E]/10 rounded-full blur-[100px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center relative glass-card p-12 rounded-3xl hextech-clip"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--tft-text-primary)] mb-4">
            {t('landing.cta.title')}
          </h2>
          <p className="text-[var(--tft-text-secondary)] mb-8">
            {t('landing.cta.subtitle')}
          </p>
          <Link to={ROUTES.REGISTER}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="tft-primary" size="xl" className="rounded-xl">
                {t('landing.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer with glass effect */}
      <footer className="py-12 px-6 border-t border-[var(--glass-border)] bg-[var(--tft-bg-darker)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <TftLogo size="sm" />
            <div className="flex items-center gap-6 text-sm text-[var(--tft-text-secondary)]">
              <span>{t('landing.footer.disclaimer')}</span>
            </div>
            <div className="text-sm text-[var(--tft-text-muted)]">
              © {new Date().getFullYear()} TFT Tournament
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
