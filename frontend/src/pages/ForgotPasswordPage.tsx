import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, ArrowLeft, KeyRound, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { authService } from "@/services";
import { handleApiError } from "@/lib/error-handler";
import { ROUTES } from "@/config";
import { AuthCard } from "@/components/auth/AuthCard";
import { ErrorMessage } from "@/components/common/ErrorMessage";

export default function ForgotPasswordPage() {
    const { t } = useTranslation('auth');
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await authService.forgotPassword({ email });
            setIsSubmitted(true);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthCard
            icon={KeyRound}
            title={t('forgotPassword.title')}
            description={isSubmitted
                ? t('forgotPassword.subtitleSuccess')
                : t('forgotPassword.subtitle')}
            iconGradient="from-[#C8AA6E] to-[#785A28]"
            titleColor="text-[#C8AA6E]"
            iconShadowColor="shadow-[#C8AA6E]/30"
        >
            {isSubmitted ? (
                <div className="text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-[#0AC8B9]/10 rounded-full flex items-center justify-center">
                        <CheckCircle size={32} className="text-[#0AC8B9]" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-[var(--tft-text-secondary)]">
                            {t('forgotPassword.successMessage')}
                        </p>
                        <p className="text-sm text-[var(--tft-text-secondary)]">
                            {t('forgotPassword.checkSpam')}
                        </p>
                    </div>
                    <Link to={ROUTES.LOGIN}>
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-xl border-[var(--tft-border)] font-semibold"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t('forgotPassword.backToLogin')}
                        </Button>
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <Label className="text-[var(--tft-text-secondary)] font-medium pl-1">
                            {t('forgotPassword.email')}
                        </Label>
                        <Input
                            icon={Mail}
                            className="h-12 bg-[var(--tft-bg-surface)] border-[var(--tft-border)] focus:bg-[var(--tft-bg-elevated)] focus:border-[#C8AA6E]/50 rounded-xl pl-11 text-[var(--tft-text-primary)] placeholder:text-[var(--tft-text-muted)] shadow-sm"
                            placeholder={t('forgotPassword.emailPlaceholder')}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {error && <ErrorMessage message={error} />}

                    <Button
                        type="submit"
                        disabled={isLoading || !email}
                        className="w-full h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-[#C8AA6E] to-[#785A28] hover:opacity-90 shadow-md shadow-[#C8AA6E]/20 text-[#0A1428] disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {t('forgotPassword.submitting')}
                            </>
                        ) : (
                            t('forgotPassword.submit')
                        )}
                    </Button>

                    <div className="text-center pt-2">
                        <Link
                            to={ROUTES.LOGIN}
                            className="text-sm text-[var(--tft-text-secondary)] hover:text-[#C8AA6E] font-medium inline-flex items-center"
                        >
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            {t('forgotPassword.backToLogin')}
                        </Link>
                    </div>
                </form>
            )}
        </AuthCard>
    );
}
