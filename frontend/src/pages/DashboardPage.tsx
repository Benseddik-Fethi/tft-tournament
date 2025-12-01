
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users, CheckCircle, Zap, Plus, Calendar, BarChart3 } from "lucide-react";
import { useAuth } from "@/context/AuthContext.tsx";
import { RoleBadge, type TftRole } from "@/components/tft/RoleBadge";

export default function DashboardPage() {
    const { t } = useTranslation('pages');
    const { user } = useAuth();

    const kpiCards = [
        {
            icon: Trophy,
            label: t('dashboard.totalTournaments'),
            value: "12",
            color: "from-[#00C853] to-[#00A040]",
            shadowColor: "rgba(0,200,83,0.3)",
            checkIcon: true,
        },
        {
            icon: Users,
            label: t('dashboard.userRole'),
            value: null,
            color: "from-[#0AC8B9] to-[#099E92]",
            shadowColor: "rgba(10,200,185,0.3)",
            showRole: true,
        },
        {
            icon: BarChart3,
            label: t('dashboard.activeTournaments'),
            value: "3",
            color: "from-[#C8AA6E] to-[#785A28]",
            shadowColor: "rgba(200,170,110,0.3)",
        },
    ];

    const quickActions = [
        { icon: Trophy, labelKey: "quickActions.newTournament", color: "from-[#C8AA6E] to-[#785A28]" },
        { icon: Users, labelKey: "quickActions.managePlayers", color: "from-[#0AC8B9] to-[#099E92]" },
        { icon: BarChart3, labelKey: "quickActions.standings", color: "from-[#9D4DFF] to-[#7C3AED]" },
        { icon: Zap, labelKey: "quickActions.startMatch", color: "from-[#FFB800] to-[#CC9300]" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-end"
            >
                <div>
                    <h1 className="text-3xl font-bold text-[var(--tft-text-primary)]">
                        {t('dashboard.title')}
                    </h1>
                    <p className="text-[var(--tft-text-secondary)] mt-2">
                        {t('dashboard.welcomeMessage')}, <span className="font-semibold text-[#C8AA6E]">{user?.firstName}</span>.
                    </p>
                </div>
                <div className="flex gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="tft-ghost">{t('dashboard.documentation')}</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="tft-primary">
                            <Plus className="w-4 h-4" />
                            {t('dashboard.newAction')}
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* KPI Cards with 3D hover effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpiCards.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ 
                                y: -8,
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className="will-change-transform"
                        >
                            <Card variant="glass" className="p-6 rounded-2xl flex items-center gap-4 cursor-pointer">
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center`}
                                    style={{ boxShadow: `0 0 15px ${kpi.shadowColor}` }}
                                >
                                    <Icon size={24} className="text-[#0A1428]"/>
                                </motion.div>
                                <div>
                                    <p className="text-[var(--tft-text-secondary)] text-sm font-medium">{kpi.label}</p>
                                    {kpi.value && (
                                        <div className="flex items-center gap-2">
                                            <p className="text-2xl font-bold text-[var(--tft-text-primary)]">{kpi.value}</p>
                                            {kpi.checkIcon && <CheckCircle size={16} className="text-[#00C853]" />}
                                        </div>
                                    )}
                                    {kpi.showRole && (
                                        <div className="mt-1">
                                            {user?.role && <RoleBadge role={user.role.toUpperCase() as TftRole} size="md" />}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card variant="glass-elevated" className="p-8 rounded-3xl">
                        <motion.div 
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="w-12 h-12 bg-gradient-to-br from-[#0AC8B9] to-[#099E92] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(10,200,185,0.3)]"
                        >
                            <Trophy size={24} className="text-[#0A1428]"/>
                        </motion.div>
                        <h3 className="text-xl font-bold text-[var(--tft-text-primary)] mb-2">{t('dashboard.readyToCode')}</h3>
                        <p className="text-[var(--tft-text-secondary)] mb-6 leading-relaxed">
                            {t('dashboard.templateDescription')}
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                t('dashboard.backendFeature'),
                                t('dashboard.frontendFeature'),
                                t('dashboard.securityFeature'),
                            ].map((feature, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                                    className="flex items-center gap-3 text-sm text-[var(--tft-text-secondary)]"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00C853] to-[#00A040] flex items-center justify-center text-[#0A1428] text-xs font-bold">✓</div>
                                    {feature}
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card variant="glass" className="p-8 rounded-3xl border-dashed flex flex-col items-center justify-center text-center h-full">
                        <motion.div 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-16 h-16 glass-card rounded-full flex items-center justify-center mb-4"
                        >
                            <Calendar size={32} className="text-[var(--tft-text-muted)]"/>
                        </motion.div>
                        <h3 className="text-lg font-semibold text-[var(--tft-text-secondary)]">{t('dashboard.yourContentHere')}</h3>
                        <p className="text-[var(--tft-text-muted)] text-sm mt-2 max-w-xs">
                            {t('dashboard.startAdding')}
                        </p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
                            <Button variant="tft-ghost">
                                <Plus className="w-4 h-4" />
                                {t('dashboard.newAction')}
                            </Button>
                        </motion.div>
                    </Card>
                </motion.div>
            </div>

            {/* Quick Actions with hover effects */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 rounded-xl glass-card gradient-overlay-gold flex flex-col items-center gap-3 group cursor-pointer"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(200,170,110,0.3)] transition-shadow`}
                            >
                                <Icon size={20} className="text-[#0A1428]" />
                            </motion.div>
                            <span className="text-sm font-medium text-[var(--tft-text-secondary)] group-hover:text-[var(--tft-text-primary)] transition-colors">
                                {t(`dashboard.${action.labelKey}`)}
                            </span>
                        </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
}