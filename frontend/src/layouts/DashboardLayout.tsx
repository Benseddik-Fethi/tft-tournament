
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {Home, LogOut, Settings, User} from "lucide-react";
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
        {id: "/profile", label: t('layout.profile'), icon: User},
        {id: "/settings", label: t('layout.settings'), icon: Settings},
    ];

    return (
        <div className="min-h-screen bg-[#0A1428] flex">
            {/* SIDEBAR */}
            <div className="w-72 bg-[#091428] border-r border-[rgba(200,170,110,0.2)] p-6 flex flex-col fixed h-full z-20 transition-all">

                {/* Logo / Brand */}
                <div className="mb-10 px-2">
                    <TftLogo size="md" />
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm",
                                    isActive
                                        ? "bg-[rgba(200,170,110,0.1)] text-[#C8AA6E] border-l-2 border-[#C8AA6E] shadow-[0_0_15px_rgba(200,170,110,0.1)]"
                                        : "text-[#A09B8C] hover:bg-[rgba(200,170,110,0.05)] hover:text-[#F0E6D2]"
                                )}
                            >
                                <Icon size={18}/>
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* User Footer */}
                <div className="pt-4 border-t border-[rgba(200,170,110,0.15)]">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[rgba(200,170,110,0.05)] transition-colors cursor-pointer group">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#C8AA6E] to-[#785A28] rounded-full flex items-center justify-center text-[#0A1428] font-bold shadow-[0_0_10px_rgba(200,170,110,0.3)]">
                            {user?.firstName?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#F0E6D2] truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <div className="mt-0.5">
                                {user?.role && <RoleBadge role={user.role.toUpperCase() as TftRole} size="sm" />}
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 text-[#A09B8C] hover:text-[#FF4444] hover:bg-[rgba(255,68,68,0.1)] rounded-lg transition-all"
                            title={t('layout.logout')}
                        >
                            <LogOut size={18}/>
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 ml-72 p-8 overflow-auto bg-[#0A1428] min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}