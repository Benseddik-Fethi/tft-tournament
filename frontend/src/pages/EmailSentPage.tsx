import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function EmailSentPage() {
    const { t } = useTranslation('pages');
    
    return (
        <div className="min-h-screen bg-[#F0F4F8] dark:bg-[#0A1428] flex items-center justify-center p-4 relative">
            {/* Language switcher - top right position */}
            <div className="absolute top-4 right-4 z-20">
                <LanguageSwitcher />
            </div>
            
            <Card className="w-full max-w-md text-center bg-[#FFFFFF] dark:bg-[#0A1929] border-[#C8D4E0] dark:border-[#1E3A5F]">
                <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-[#0AC8B9]/10 dark:bg-[#0AC8B9]/20 rounded-full flex items-center justify-center mb-4">
                        <Mail className="w-8 h-8 text-[#0AC8B9]" />
                    </div>
                    <CardTitle className="text-2xl text-[#0A1428] dark:text-[#F0E6D2]">{t('emailSent.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-[#5B5A56] dark:text-[#A09B8C]">
                        {t('emailSent.message')}
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button asChild className="w-full">
                            <Link to={ROUTES.LOGIN}>
                                {t('emailSent.backToLogin')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link to={ROUTES.AUTH.RESEND_VERIFICATION}>{t('emailSent.noEmailReceived')}</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}