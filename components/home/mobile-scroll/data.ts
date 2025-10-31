import {
  type LucideIcon,
  LineChart,
  GraduationCap,
  Headphones,
  Lightbulb,
  BarChart3,
  Bell,
  Lock,
  TrendingUp,
  Wrench,
} from "lucide-react";

export type MobileScrollerCard = {
  id: number;
  title: string;
  desc: string;
  top: string;
  left?: string;
  right?: string;
  icon: LucideIcon;
};

export type MobileScrollerStep = {
  id: number;
  text: string;
  img: string;
  gradient: string;
  cards: MobileScrollerCard[];
};

export const mobileScrollerSteps: MobileScrollerStep[] = [
  {
    id: 1,
    text: "با مشاوره‌های تخصصی و آموزش‌های کاربردی، اولین قدم مطمئن در بازار سرمایه را بردارید.",
    img: "/images/home/mobile-scroll/mobile.webp",
    gradient: "from-blue-400/30 via-indigo-400/20 to-transparent",
    cards: [
      {
        id: 1,
        title: "شروع",
        desc: "ورود مطمئن",
        top: "25%",
        right: "-10%",
        icon: LineChart,
      },
      {
        id: 2,
        title: "آموزش",
        desc: "مبتدی‌ها",
        top: "26%",
        left: "-10%",
        icon: GraduationCap,
      },
      {
        id: 3,
        title: "پشتیبانی",
        desc: "کاربران",
        top: "55%",
        right: "-10%",
        icon: Headphones,
      },
      {
        id: 4,
        title: "پیشنهاد",
        desc: "سرمایه‌گذاری",
        top: "55%",
        left: "-10%",
        icon: Lightbulb,
      },
    ],
  },
  {
    id: 2,
    text: "دسترسی به تحلیل‌های روزانه و فرصت‌های طلایی در بورس و بازارهای نوین.",
    img: "/images/home/mobile-scroll/mobile.webp",
    gradient: "from-blue-400/30 via-mySecondary-400/20 to-transparent",
    cards: [
      {
        id: 1,
        title: "تحلیل",
        desc: "بازارها",
        top: "25%",
        right: "-10%",
        icon: BarChart3,
      },
      {
        id: 2,
        title: "فرصت",
        desc: "سیگنال‌ها",
        top: "25%",
        left: "-10%",
        icon: Lightbulb,
      },
      {
        id: 3,
        title: "نمودار",
        desc: "ابزارها",
        top: "55%",
        right: "-10%",
        icon: Wrench,
      },
      {
        id: 4,
        title: "یادآوری",
        desc: "نوتیف‌ها",
        top: "55%",
        left: "-10%",
        icon: Bell,
      },
    ],
  },
  {
    id: 3,
    text: "با استراتژی‌های پیشرفته و ابزارهای مدرن، سبد سرمایه خود را حرفه‌ای مدیریت کنید.",
    img: "/images/home/mobile-scroll/mobile.webp",
    gradient: "from-amber-400/30 via-orange-400/20 to-transparent",
    cards: [
      {
        id: 1,
        title: "مدیریت",
        desc: "سبد",
        top: "25%",
        right: "-10%",
        icon: LineChart,
      },
      {
        id: 2,
        title: "ابزار",
        desc: "تحلیل",
        top: "25%",
        left: "-10%",
        icon: Wrench,
      },
      {
        id: 3,
        title: "امنیت",
        desc: "اطلاعات",
        top: "55%",
        right: "-10%",
        icon: Lock,
      },
      {
        id: 4,
        title: "رشد",
        desc: "سرمایه",
        top: "55%",
        left: "-10%",
        icon: TrendingUp,
      },
    ],
  },
];
