import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { KeyRound, Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/services";
import { handleApiError } from "@/lib/error-handler";
import { ROUTES } from "@/config";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { passwordRules } from "@/lib/validators";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function ResetPasswordPage() {
    const { t } = useTranslation('auth');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "valid" | "invalid" | "success" | "error">("loading");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Validate token on mount
    useEffect(() => {
        if (!token) {
            setStatus("invalid");
            return;
        }

        authService.validateResetToken(token)
            .then((response) => {
                if (response.valid) {
                    setStatus("valid");
                } else {
                    setStatus("invalid");
                }
            })
            .catch(() => {
                setStatus("invalid");
            });
    }, [token]);

    // Check if all password rules are valid
    const isPasswordValid = passwordRules.every(rule => rule.test(password));
    const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;
    const canSubmit = isPasswordValid && doPasswordsMatch && !isSubmitting;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!canSubmit || !token) return;

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            await authService.resetPassword({
                token,
                newPassword: password
            });
            setStatus("success");
        } catch (err) {
            setErrorMessage(handleApiError(err));
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Loading state
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] via-[#E8EEF4] to-[#F0E6D2]/20 flex items-center justify-center p-6 relative overflow-hidden dark:from-[#0A1428] dark:via-[#091428] dark:to-[#0A1929]">
                {/* Language switcher - top right position */}
                <div className="absolute top-4 right-4 z-20">
                    <LanguageSwitcher />
                </div>
                <Card className="w-full max-w-md relative z-10 border-[#C8D4E0]/50 bg-[#FFFFFF]/80 dark:bg-[#0A1929]/80 backdrop-blur-sm shadow-xl dark:border-[#1E3A5F]">
                    <CardContent className="p-8 text-center">
                        <Loader2 className="w-12 h-12 text-[#C8AA6E] animate-spin mx-auto mb-4" />
                        <p className="text-[#5B5A56] dark:text-[#A09B8C] font-medium">{t('resetPassword.verifyingLink')}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Invalid token state
    if (status === "invalid") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] via-[#E8EEF4] to-[#F0E6D2]/20 flex items-center justify-center p-6 relative overflow-hidden dark:from-[#0A1428] dark:via-[#091428] dark:to-[#0A1929]">
                {/* Language switcher - top right position */}
                <div className="absolute top-4 right-4 z-20">
                    <LanguageSwitcher />
                </div>
                <Card className="w-full max-w-md relative z-10 border-[#C8D4E0]/50 bg-[#FFFFFF]/80 dark:bg-[#0A1929]/80 backdrop-blur-sm shadow-xl dark:border-[#1E3A5F]">
                    <CardHeader className="text-center pt-10">
                        <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl mb-4 flex items-center justify-center">
                            <XCircle size={40} className="text-red-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-red-500 mb-1">
                            {t('resetPassword.invalidLink')}
                        </CardTitle>
                        <CardDescription className="text-[#5B5A56] dark:text-[#A09B8C] font-medium">
                            {t('resetPassword.invalidLinkDescription')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                        <p className="text-center text-[#5B5A56] dark:text-[#A09B8C] text-sm">
                            {t('resetPassword.linkExpiredMessage')}
                        </p>
                        <div className="space-y-3">
                            <Link to={ROUTES.AUTH.FORGOT_PASSWORD}>
                                <Button className="w-full h-12 text-base font-bold rounded-2xl bg-gradient-to-r from-[#C8AA6E] to-[#785A28] hover:opacity-90 shadow-md shadow-[#C8AA6E]/20 dark:shadow-none text-[#0A1428]">
                                    {t('resetPassword.requestNewLink')}
                                </Button>
                            </Link>
                            <Link to={ROUTES.LOGIN}>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 rounded-xl border-[#C8D4E0] dark:border-[#1E3A5F] font-semibold"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    {t('resetPassword.backToLogin')}
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Success state
    if (status === "success") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] via-[#E8EEF4] to-[#F0E6D2]/20 flex items-center justify-center p-6 relative overflow-hidden dark:from-[#0A1428] dark:via-[#091428] dark:to-[#0A1929]">
                {/* Language switcher - top right position */}
                <div className="absolute top-4 right-4 z-20">
                    <LanguageSwitcher />
                </div>
                <Card className="w-full max-w-md relative z-10 border-[#C8D4E0]/50 bg-[#FFFFFF]/80 dark:bg-[#0A1929]/80 backdrop-blur-sm shadow-xl dark:border-[#1E3A5F]">
                    <CardHeader className="text-center pt-10">
                        <div className="mx-auto w-20 h-20 bg-[#0AC8B9]/10 dark:bg-[#0AC8B9]/20 rounded-3xl mb-4 flex items-center justify-center">
                            <CheckCircle size={40} className="text-[#0AC8B9]" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-[#0AC8B9] mb-1">
                            {t('resetPassword.successTitle')}
                        </CardTitle>
                        <CardDescription className="text-[#5B5A56] dark:text-[#A09B8C] font-medium">
                            {t('resetPassword.successMessage')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Button
                            onClick={() => navigate(ROUTES.LOGIN)}
                            className="w-full h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-[#C8AA6E] to-[#785A28] hover:opacity-90 shadow-md shadow-[#C8AA6E]/20 dark:shadow-none text-[#0A1428]"
                        >
                            {t('resetPassword.signIn')}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Valid token - show form (also handles error state with form)
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] via-[#E8EEF4] to-[#F0E6D2]/20 flex items-center justify-center p-6 relative overflow-hidden dark:from-[#0A1428] dark:via-[#091428] dark:to-[#0A1929]">
            {/* Language switcher - top right position */}
            <div className="absolute top-4 right-4 z-20">
                <LanguageSwitcher />
            </div>
            <Card className="w-full max-w-md relative z-10 border-[#C8D4E0]/50 bg-[#FFFFFF]/80 dark:bg-[#0A1929]/80 backdrop-blur-sm shadow-xl dark:border-[#1E3A5F]">
                <CardHeader className="text-center pt-10">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#C8AA6E] to-[#785A28] rounded-3xl mb-4 flex items-center justify-center shadow-lg shadow-[#C8AA6E]/30 dark:shadow-none">
                        <KeyRound size={40} className="text-[#0A1428]" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-[#C8AA6E] mb-1">
                        {t('resetPassword.title')}
                    </CardTitle>
                    <CardDescription className="text-[#5B5A56] dark:text-[#A09B8C] font-medium">
                        {t('resetPassword.subtitle')}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <PasswordInput
                            label={t('resetPassword.newPassword')}
                            value={password}
                            onChange={setPassword}
                            placeholder={t('resetPassword.passwordPlaceholder')}
                        />

                        {/* Password rules */}
                        <div className="bg-[#F0F4F8] dark:bg-[#0A1428] rounded-xl p-4 space-y-2">
                            <p className="text-xs font-medium text-[#5B5A56] dark:text-[#A09B8C] mb-2">
                                {t('resetPassword.passwordCriteria')}
                            </p>
                            {passwordRules.map((rule) => {
                                const isValid = rule.test(password);
                                return (
                                    <div key={rule.id} className="flex items-center gap-2 text-sm">
                                        {isValid ? (
                                            <CheckCircle size={16} className="text-[#0AC8B9] flex-shrink-0" />
                                        ) : (
                                            <XCircle size={16} className="text-[#A09B8C] dark:text-[#5B5A56] flex-shrink-0" />
                                        )}
                                        <span className={isValid ? "text-[#0AC8B9]" : "text-[#5B5A56] dark:text-[#A09B8C]"}>
                                            {rule.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <PasswordInput
                            label={t('resetPassword.confirmPassword')}
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            placeholder={t('resetPassword.passwordPlaceholder')}
                            error={confirmPassword && !doPasswordsMatch ? t('resetPassword.passwordMismatch') : undefined}
                        />

                        {errorMessage && <ErrorMessage message={errorMessage} />}

                        <Button
                            type="submit"
                            disabled={!canSubmit}
                            className="w-full h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-[#C8AA6E] to-[#785A28] hover:opacity-90 shadow-md shadow-[#C8AA6E]/20 dark:shadow-none text-[#0A1428] disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    {t('resetPassword.submitting')}
                                </>
                            ) : (
                                t('resetPassword.submit')
                            )}
                        </Button>

                        <div className="text-center pt-2">
                            <Link
                                to={ROUTES.LOGIN}
                                className="text-sm text-[#5B5A56] dark:text-[#A09B8C] hover:text-[#C8AA6E] font-medium inline-flex items-center"
                            >
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                {t('resetPassword.backToLogin')}
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
