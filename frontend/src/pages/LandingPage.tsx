/**
 * TFT Tournament Landing Page
 * Public homepage with hero, features, how-it-works, and CTA sections
 */

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Trophy, Users, BarChart3, Video, ArrowRight, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-[#0A1428]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(200,170,110,0.1)] bg-[#0A1428]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <TftLogo size="sm" />
            <div className="hidden md:flex items-center gap-6">
              <Link
                to={ROUTES.TOURNAMENTS}
                className="text-[#A09B8C] hover:text-[#F0E6D2] transition-colors"
              >
                {t('landing.nav.tournaments')}
              </Link>
              <Link
                to={ROUTES.CIRCUITS}
                className="text-[#A09B8C] hover:text-[#F0E6D2] transition-colors"
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1428] via-[#091428] to-[#0A1929]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8AA6E] opacity-5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0AC8B9] opacity-5 rounded-full blur-[100px]" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(200,170,110,0.1)] border border-[rgba(200,170,110,0.3)] mb-8">
            <Sparkles className="w-4 h-4 text-[#C8AA6E]" />
            <span className="text-sm font-medium text-[#C8AA6E]">
              {t('landing.hero.badge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[#F0E6D2]">{t('landing.hero.titleLine1')}</span>
            <br />
            <span className="bg-gradient-to-r from-[#F0E6D2] via-[#C8AA6E] to-[#785A28] bg-clip-text text-transparent">
              {t('landing.hero.titleLine2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-[#A09B8C] max-w-2xl mx-auto mb-10">
            {t('landing.hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link to={ROUTES.REGISTER}>
              <Button variant="tft-primary" size="xl" className="rounded-xl">
                {t('landing.hero.cta.create')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="tft-outline" size="xl" className="rounded-xl">
                {t('landing.hero.cta.browse')}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#C8AA6E] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#A09B8C] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#091428]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0E6D2] mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-[#A09B8C] max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-[#0A1929] border border-[rgba(200,170,110,0.1)] hover:border-[rgba(200,170,110,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,170,110,0.1)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C8AA6E] to-[#785A28] flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(200,170,110,0.4)] transition-shadow">
                    <Icon className="w-6 h-6 text-[#0A1428]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#F0E6D2] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#A09B8C]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-[#0A1428]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0E6D2] mb-4">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-[#A09B8C]">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-[#C8AA6E] via-[#0AC8B9] to-[#9D4DFF] hidden md:block" />

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* Step Number */}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-[#0A1929] border-2 border-[#C8AA6E] flex items-center justify-center shadow-[0_0_20px_rgba(200,170,110,0.3)]">
                    <span className="text-2xl font-bold text-[#C8AA6E]">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#F0E6D2]">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#091428] to-[#0A1929]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0E6D2] mb-4">
            {t('landing.cta.title')}
          </h2>
          <p className="text-[#A09B8C] mb-8">
            {t('landing.cta.subtitle')}
          </p>
          <Link to={ROUTES.REGISTER}>
            <Button variant="tft-primary" size="xl" className="rounded-xl">
              {t('landing.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[rgba(200,170,110,0.1)] bg-[#091428]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <TftLogo size="sm" />
            <div className="flex items-center gap-6 text-sm text-[#A09B8C]">
              <span>{t('landing.footer.disclaimer')}</span>
            </div>
            <div className="text-sm text-[#5B5A56]">
              © {new Date().getFullYear()} TFT Tournament
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
