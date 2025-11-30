import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { authService } from "@/services";
import { handleApiError } from "@/lib/error-handler";
import { ROUTES } from "@/config";
import { AuthCard } from "@/components/auth/AuthCard";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { ErrorMessage } from "@/components/common/ErrorMessage";

export default function RegisterPage() {
    const { t } = useTranslation('auth');
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError(t('register.passwordMismatch'));
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await authService.register({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName
            });
            navigate(ROUTES.AUTH.VERIFY_EMAIL_SENT);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthCard
            icon={Shield}
            title={t('register.title')}
            description={t('register.subtitle')}
            backgroundGradient="from-[#0A1428] via-[#091428] to-[#0A1929]"
            iconGradient="from-[#C8AA6E] to-[#785A28]"
            iconShadowColor="shadow-[0_0_20px_rgba(200,170,110,0.4)]"
            titleColor="text-[#C8AA6E]"
        >
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <Label className="text-[#A09B8C] pl-1">{t('register.firstName')}</Label>
                        <Input
                            placeholder={t('register.firstNamePlaceholder')}
                            className="h-11 bg-[#1E2328] border-[rgba(200,170,110,0.2)] focus:bg-[#1E293B] focus:border-[#C8AA6E] rounded-xl text-[#F0E6D2] placeholder:text-[#5B5A56]"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[#A09B8C] pl-1">{t('register.lastName')}</Label>
                        <Input
                            placeholder={t('register.lastNamePlaceholder')}
                            className="h-11 bg-[#1E2328] border-[rgba(200,170,110,0.2)] focus:bg-[#1E293B] focus:border-[#C8AA6E] rounded-xl text-[#F0E6D2] placeholder:text-[#5B5A56]"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label className="text-[#A09B8C] pl-1">{t('register.email')}</Label>
                    <Input
                        icon={Mail}
                        placeholder={t('register.emailPlaceholder')}
                        type="email"
                        className="h-11 pl-10 bg-[#1E2328] border-[rgba(200,170,110,0.2)] focus:bg-[#1E293B] focus:border-[#C8AA6E] rounded-xl text-[#F0E6D2] placeholder:text-[#5B5A56]"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>

                <PasswordInput
                    label={t('register.password')}
                    value={formData.password}
                    onChange={(value) => setFormData({...formData, password: value})}
                    placeholder={t('register.passwordPlaceholder')}
                    className="h-11"
                />

                <PasswordInput
                    label={t('register.confirmPassword')}
                    value={formData.confirmPassword}
                    onChange={(value) => setFormData({...formData, confirmPassword: value})}
                    placeholder={t('register.confirmPasswordPlaceholder')}
                    className="h-11"
                />

                {error && <ErrorMessage message={error} />}

                <Button
                    variant="tft-primary"
                    className="w-full h-12 text-base font-bold rounded-2xl mt-2"
                    onClick={handleRegister}
                    disabled={isLoading}>
                    {isLoading ? t('register.submitting') : t('register.submit')} <ChevronRight className="ml-2 h-5 w-5"/>
                </Button>
            </div>

            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><Separator
                    className="bg-[rgba(200,170,110,0.15)]"/></div>
                <div className="relative flex justify-center text-xs uppercase"><span
                    className="bg-[#0A1929] px-4 text-[#5B5A56] font-medium">{t('register.or')}</span></div>
            </div>

            <SocialLoginButtons disabled={isLoading} />

            <p className="text-center text-sm text-[#A09B8C] mt-4">
                {t('register.hasAccount')} <Link to={ROUTES.LOGIN} className="text-[#C8AA6E] font-bold hover:underline ml-1">{t('register.signIn')}</Link>
            </p>
        </AuthCard>
    );
}