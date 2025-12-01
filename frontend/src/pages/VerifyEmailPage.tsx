import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { authService } from "@/services";
import { ROUTES } from "@/config";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function VerifyEmailPage() {
    const { t } = useTranslation('auth');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">(token ? "loading" : "error");
    // Ref to prevent double API call in React 18 Strict Mode development
    const hasCalledApi = useRef(false);

    useEffect(() => {
        if (!token || hasCalledApi.current) {
            return;
        }

        hasCalledApi.current = true;
        authService.verifyEmail({ token })
            .then(() => setStatus("success"))
            .catch(() => setStatus("error"));
    }, [token]);

    return (
        <div className="min-h-screen bg-[#F0F4F8] dark:bg-[#0A1428] flex items-center justify-center p-4 relative">
            {/* Language switcher - top right position */}
            <div className="absolute top-4 right-4 z-20">
                <LanguageSwitcher />
            </div>
            
            <Card className="w-full max-w-md text-center p-6 bg-[#FFFFFF] dark:bg-[#0A1929] border-[#C8D4E0] dark:border-[#1E3A5F]">
                <CardContent className="space-y-6 pt-6">
                    {status === "loading" && (
                        <>
                            <Loader2 className="w-12 h-12 text-[#C8AA6E] animate-spin mx-auto" />
                            <h2 className="text-xl font-semibold text-[#0A1428] dark:text-[#F0E6D2]">{t('verifyEmail.verifying')}</h2>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <CheckCircle className="w-12 h-12 text-[#0AC8B9] mx-auto" />
                            <h2 className="text-xl font-bold text-[#0AC8B9]">{t('verifyEmail.successTitle')}</h2>
                            <p className="text-[#5B5A56] dark:text-[#A09B8C]">{t('verifyEmail.successMessage')}</p>
                            <Button onClick={() => navigate(ROUTES.LOGIN)} className="w-full">
                                {t('verifyEmail.signIn')}
                            </Button>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                            <h2 className="text-xl font-bold text-red-600">{t('verifyEmail.errorTitle')}</h2>
                            <p className="text-[#5B5A56] dark:text-[#A09B8C]">{t('verifyEmail.errorMessage')}</p>
                            <Button variant="outline" onClick={() => navigate(ROUTES.LOGIN)} className="w-full">
                                {t('verifyEmail.backToHome')}
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}