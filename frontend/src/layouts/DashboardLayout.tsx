
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {Home, LogOut, Settings, User, Trophy, Layers} from "lucide-react";
import { motion } from "motion/react";
import {cn} from "@/lib/utils";
import {useAuth} from "@/context/AuthContext";
import {TftLogo} from "@/components/tft/TftLogo";
import {RoleBadge, type TftRole} from "@/components/tft/RoleBadge";

export default function DashboardLayout() {
    const { t } = useTranslation('pages');
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Menu items for navigation
    const navItems = [
        {id: "/dashboard", label: t('layout.dashboard'), icon: Home},
        {id: "/tournaments", label: t('layout.tournaments'), icon: Trophy},
        {id: "/circuits", label: t('layout.circuits'), icon: Layers},
        {id: "/profile", label: t('layout.profile'), icon: User},
        {id: "/settings", label: t('layout.settings'), icon: Settings},
    ];

    return (
        <div className="min-h-screen bg-[var(--tft-bg-dark)] flex">
            {/* SIDEBAR with Glassmorphism */}
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-72 glass-card border-r border-[var(--glass-border)] p-6 flex flex-col fixed h-full z-20"
            >
                {/* Logo / Brand with subtle glow */}
                <motion.div 
                    className="mb-10 px-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="relative">
                        <TftLogo size="md" />
                        <div className="absolute inset-0 bg-[#C8AA6E]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </motion.div>

                {/* Navigation with hextech styling */}
                <nav className="flex-1 space-y-1">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.id;
                        return (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => navigate(item.id)}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm relative overflow-hidden",
                                    isActive
                                        ? "bg-gradient-to-r from-[rgba(200,170,110,0.15)] to-transparent text-[#C8AA6E] border-l-2 border-[#C8AA6E] shadow-[0_0_15px_rgba(200,170,110,0.1)]"
                                        : "text-[var(--tft-text-muted)] hover:bg-[rgba(200,170,110,0.05)] hover:text-[var(--tft-text-primary)]"
                                )}
                            >
                                <Icon size={18}/>
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeTab"
                                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#C8AA6E] glow-gold"
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </nav>

                {/* User Footer with glass card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-4 border-t border-[var(--glass-border)]"
                >
                    <div className="flex items-center gap-3 p-3 rounded-xl glass-card-subtle hover:border-[rgba(200,170,110,0.3)] transition-all cursor-pointer group">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 bg-gradient-to-br from-[#C8AA6E] to-[#785A28] rounded-full flex items-center justify-center text-[#0A1428] font-bold shadow-[0_0_10px_rgba(200,170,110,0.3)]"
                        >
                            {user?.firstName?.charAt(0) || "U"}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--tft-text-primary)] truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <div className="mt-0.5">
                                {user?.role && <RoleBadge role={user.role.toUpperCase() as TftRole} size="sm" />}
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: -10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={logout}
                            className="p-2 text-[var(--tft-text-muted)] hover:text-[#FF4444] hover:bg-[rgba(255,68,68,0.1)] rounded-lg transition-all"
                            title={t('layout.logout')}
                        >
                            <LogOut size={18}/>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* MAIN CONTENT AREA with mesh gradient background */}
            <div className="flex-1 ml-72 p-8 overflow-auto bg-[var(--tft-bg-dark)] min-h-screen relative">
                {/* Subtle mesh gradient background */}
                <div className="fixed inset-0 ml-72 pointer-events-none opacity-30">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8AA6E]/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0AC8B9]/5 rounded-full blur-[100px]" />
                </div>
                
                <div className="max-w-7xl mx-auto relative">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}