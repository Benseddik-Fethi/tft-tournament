import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, CheckCircle, Globe, Moon, Palette, Sun, Monitor } from "lucide-react";

export default function SettingsPage() {
    const { t } = useTranslation('pages');
    const { theme, setTheme } = useTheme();
    const { currentLanguage, changeLanguage } = useLanguage();
    const [emailNotifications, setEmailNotifications] = useState(true);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#0A1428] dark:text-[#F0E6D2]">
                    {t('settings.title')}
                </h1>
                <p className="text-[#5B5A56] dark:text-[#A09B8C] mt-2">
                    {t('settings.subtitle')}
                </p>
            </div>

            {/* Language Section */}
            <Card className="p-6 border border-[#C8D4E0] dark:border-[#1E3A5F] shadow-sm bg-[#FFFFFF] dark:bg-[#0A1929] rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#C8AA6E]/10 dark:bg-[#C8AA6E]/20 flex items-center justify-center text-[#C8AA6E]">
                        <Globe size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#0A1428] dark:text-[#F0E6D2]">
                            {t('settings.language.title')}
                        </h2>
                        <p className="text-sm text-[#5B5A56] dark:text-[#A09B8C]">{t('settings.language.description')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Card Français */}
                    <button
                        onClick={() => changeLanguage('fr')}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                            currentLanguage === 'fr'
                                ? 'border-[#C8AA6E] bg-[#C8AA6E]/10 dark:bg-[#C8AA6E]/20'
                                : 'border-[#C8D4E0] dark:border-[#1E3A5F] hover:border-[#C8AA6E]/50 dark:hover:border-[#C8AA6E]/50'
                        }`}
                    >
                        <span className="text-3xl mb-2 block">🇫🇷</span>
                        <span className="font-medium text-[#0A1428] dark:text-[#F0E6D2]">Français</span>
                        {currentLanguage === 'fr' && <CheckCircle className="h-4 w-4 text-[#C8AA6E] mx-auto mt-2" />}
                    </button>

                    {/* Card English */}
                    <button
                        onClick={() => changeLanguage('en')}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                            currentLanguage === 'en'
                                ? 'border-[#C8AA6E] bg-[#C8AA6E]/10 dark:bg-[#C8AA6E]/20'
                                : 'border-[#C8D4E0] dark:border-[#1E3A5F] hover:border-[#C8AA6E]/50 dark:hover:border-[#C8AA6E]/50'
                        }`}
                    >
                        <span className="text-3xl mb-2 block">🇬🇧</span>
                        <span className="font-medium text-[#0A1428] dark:text-[#F0E6D2]">English</span>
                        {currentLanguage === 'en' && <CheckCircle className="h-4 w-4 text-[#C8AA6E] mx-auto mt-2" />}
                    </button>
                </div>
            </Card>

            {/* Theme Section */}
            <Card className="p-6 border border-[#C8D4E0] dark:border-[#1E3A5F] shadow-sm bg-[#FFFFFF] dark:bg-[#0A1929] rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#C8AA6E]/10 dark:bg-[#C8AA6E]/20 flex items-center justify-center text-[#C8AA6E]">
                        <Palette size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#0A1428] dark:text-[#F0E6D2]">
                            {t('settings.theme.title')}
                        </h2>
                        <p className="text-sm text-[#5B5A56] dark:text-[#A09B8C]">{t('settings.theme.description')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Card Light */}
                    <button
                        onClick={() => setTheme("light")}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                            theme === 'light'
                                ? 'border-[#C8AA6E] bg-[#C8AA6E]/10 dark:bg-[#C8AA6E]/20'
                                : 'border-[#C8D4E0] dark:border-[#1E3A5F] hover:border-[#C8AA6E]/50 dark:hover:border-[#C8AA6E]/50'
                        }`}
                    >
                        <Sun className="h-6 w-6 mx-auto mb-2 text-[#0A1428] dark:text-[#F0E6D2]" />
                        <span className="font-medium text-[#0A1428] dark:text-[#F0E6D2]">{t('settings.theme.light')}</span>
                        {theme === 'light' && <CheckCircle className="h-4 w-4 text-[#C8AA6E] mx-auto mt-2" />}
                    </button>

                    {/* Card Dark */}
                    <button
                        onClick={() => setTheme("dark")}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                            theme === 'dark'
                                ? 'border-[#C8AA6E] bg-[#C8AA6E]/10 dark:bg-[#C8AA6E]/20'
                                : 'border-[#C8D4E0] dark:border-[#1E3A5F] hover:border-[#C8AA6E]/50 dark:hover:border-[#C8AA6E]/50'
                        }`}
                    >
                        <Moon className="h-6 w-6 mx-auto mb-2 text-[#0A1428] dark:text-[#F0E6D2]" />
                        <span className="font-medium text-[#0A1428] dark:text-[#F0E6D2]">{t('settings.theme.dark')}</span>
                        {theme === 'dark' && <CheckCircle className="h-4 w-4 text-[#C8AA6E] mx-auto mt-2" />}
                    </button>

                    {/* Card System */}
                    <button
                        onClick={() => setTheme("system")}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                            theme === 'system'
                                ? 'border-[#C8AA6E] bg-[#C8AA6E]/10 dark:bg-[#C8AA6E]/20'
                                : 'border-[#C8D4E0] dark:border-[#1E3A5F] hover:border-[#C8AA6E]/50 dark:hover:border-[#C8AA6E]/50'
                        }`}
                    >
                        <Monitor className="h-6 w-6 mx-auto mb-2 text-[#0A1428] dark:text-[#F0E6D2]" />
                        <span className="font-medium text-[#0A1428] dark:text-[#F0E6D2]">{t('settings.theme.system')}</span>
                        {theme === 'system' && <CheckCircle className="h-4 w-4 text-[#C8AA6E] mx-auto mt-2" />}
                    </button>
                </div>
            </Card>

            {/* Notifications Section */}
            <Card className="p-6 border border-[#C8D4E0] dark:border-[#1E3A5F] shadow-sm bg-[#FFFFFF] dark:bg-[#0A1929] rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#0AC8B9]/10 dark:bg-[#0AC8B9]/20 flex items-center justify-center text-[#0AC8B9]">
                        <Bell size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-[#0A1428] dark:text-[#F0E6D2]">
                        {t('settings.notifications.title')}
                    </h2>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#C8D4E0] dark:border-[#1E3A5F] bg-[#F0F4F8] dark:bg-[#1E2328]">
                    <div>
                        <p className="font-medium text-[#0A1428] dark:text-[#F0E6D2]">{t('settings.notifications.emailNotifications')}</p>
                        <p className="text-sm text-[#5B5A56] dark:text-[#A09B8C]">{t('settings.notifications.emailNotificationsDescription')}</p>
                    </div>
                    <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                    />
                </div>
            </Card>
        </div>
    );
}