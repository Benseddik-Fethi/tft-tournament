
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, CheckCircle, Zap, Plus, Calendar, BarChart3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext.tsx";
import { RoleBadge, type TftRole } from "@/components/tft/RoleBadge";

export default function DashboardPage() {
    const { t } = useTranslation('pages');
    const { user } = useAuth();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--tft-text-primary)]">
                        {t('dashboard.title')}
                    </h1>
                    <p className="text-[var(--tft-text-secondary)] mt-2">
                        {t('dashboard.welcomeMessage')}, <span className="font-semibold text-[#C8AA6E]">{user?.firstName}</span>.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="tft-ghost">{t('dashboard.documentation')}</Button>
                    <Button variant="tft-primary">
                        <Plus className="w-4 h-4" />
                        {t('dashboard.newAction')}
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="tft-card" className="p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C853] to-[#00A040] flex items-center justify-center shadow-[0_0_15px_rgba(0,200,83,0.3)]">
                        <Trophy size={24} className="text-[#0A1428]"/>
                    </div>
                    <div>
                        <p className="text-[var(--tft-text-secondary)] text-sm font-medium">{t('dashboard.totalTournaments')}</p>
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold text-[var(--tft-text-primary)]">12</p>
                            <CheckCircle size={16} className="text-[#00C853]" />
                        </div>
                    </div>
                </Card>

                <Card variant="tft-card" className="p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0AC8B9] to-[#099E92] flex items-center justify-center shadow-[0_0_15px_rgba(10,200,185,0.3)]">
                        <Users size={24} className="text-[#0A1428]"/>
                    </div>
                    <div>
                        <p className="text-[var(--tft-text-secondary)] text-sm font-medium">{t('dashboard.userRole')}</p>
                        <div className="mt-1">
                            {user?.role && <RoleBadge role={user.role.toUpperCase() as TftRole} size="md" />}
                        </div>
                    </div>
                </Card>

                <Card variant="tft-card" className="p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C8AA6E] to-[#785A28] flex items-center justify-center shadow-[0_0_15px_rgba(200,170,110,0.3)]">
                        <BarChart3 size={24} className="text-[#0A1428]"/>
                    </div>
                    <div>
                        <p className="text-[var(--tft-text-secondary)] text-sm font-medium">{t('dashboard.activeTournaments')}</p>
                        <p className="text-2xl font-bold text-[var(--tft-text-primary)]">3</p>
                    </div>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card variant="tft-card-elevated" className="p-8 rounded-3xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0AC8B9] to-[#099E92] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(10,200,185,0.3)]">
                        <Trophy size={24} className="text-[#0A1428]"/>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--tft-text-primary)] mb-2">{t('dashboard.readyToCode')}</h3>
                    <p className="text-[var(--tft-text-secondary)] mb-6 leading-relaxed">
                        {t('dashboard.templateDescription')}
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-sm text-[var(--tft-text-secondary)]">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00C853] to-[#00A040] flex items-center justify-center text-[#0A1428] text-xs font-bold">✓</div>
                            {t('dashboard.backendFeature')}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[var(--tft-text-secondary)]">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00C853] to-[#00A040] flex items-center justify-center text-[#0A1428] text-xs font-bold">✓</div>
                            {t('dashboard.frontendFeature')}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[var(--tft-text-secondary)]">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00C853] to-[#00A040] flex items-center justify-center text-[#0A1428] text-xs font-bold">✓</div>
                            {t('dashboard.securityFeature')}
                        </div>
                    </div>
                </Card>

                <Card variant="tft-card" className="p-8 rounded-3xl border-dashed flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-[var(--tft-bg-surface)] rounded-full flex items-center justify-center mb-4 border border-[var(--tft-border)]">
                        <Calendar size={32} className="text-[var(--tft-text-muted)]"/>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--tft-text-secondary)]">{t('dashboard.yourContentHere')}</h3>
                    <p className="text-[var(--tft-text-muted)] text-sm mt-2 max-w-xs">
                        {t('dashboard.startAdding')}
                    </p>
                    <Button variant="tft-ghost" className="mt-4">
                        <Plus className="w-4 h-4" />
                        {t('dashboard.newAction')}
                    </Button>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Trophy, labelKey: "quickActions.newTournament", color: "from-[#C8AA6E] to-[#785A28]" },
                    { icon: Users, labelKey: "quickActions.managePlayers", color: "from-[#0AC8B9] to-[#099E92]" },
                    { icon: BarChart3, labelKey: "quickActions.standings", color: "from-[#9D4DFF] to-[#7C3AED]" },
                    { icon: Zap, labelKey: "quickActions.startMatch", color: "from-[#FFB800] to-[#CC9300]" },
                ].map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={index}
                            className="p-4 rounded-xl bg-[var(--tft-bg-card)] border border-[var(--tft-border)] hover:border-[rgba(200,170,110,0.3)] transition-all group flex flex-col items-center gap-3"
                        >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(200,170,110,0.3)] transition-shadow`}>
                                <Icon size={20} className="text-[#0A1428]" />
                            </div>
                            <span className="text-sm font-medium text-[var(--tft-text-secondary)] group-hover:text-[var(--tft-text-primary)] transition-colors">
                                {t(`dashboard.${action.labelKey}`)}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}