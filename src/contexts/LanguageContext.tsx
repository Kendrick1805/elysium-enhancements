import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fil' | 'ja' | 'zh' | 'fr';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', fil: 'Tahanan', ja: 'ホーム', zh: '首页', fr: 'Accueil' },
  'nav.accommodations': { en: 'Accommodations', fil: 'Mga Tuluyan', ja: '客室', zh: '住宿', fr: 'Hébergements' },
  'nav.amenities': { en: 'Amenities', fil: 'Mga Pasilidad', ja: 'アメニティ', zh: '设施', fr: 'Commodités' },
  'nav.services': { en: 'Services', fil: 'Mga Serbisyo', ja: 'サービス', zh: '服务', fr: 'Services' },
  'nav.contact': { en: 'Contact', fil: 'Kontak', ja: 'お問い合わせ', zh: '联系', fr: 'Contact' },
  'nav.careers': { en: 'Careers', fil: 'Mga Trabaho', ja: 'キャリア', zh: '职业', fr: 'Carrières' },
  'nav.booking': { en: 'Book Now', fil: 'Mag-book Ngayon', ja: '今すぐ予約', zh: '立即预订', fr: 'Réserver' },
  'nav.login': { en: 'Login', fil: 'Mag-login', ja: 'ログイン', zh: '登录', fr: 'Connexion' },
  'nav.signup': { en: 'Sign Up', fil: 'Mag-signup', ja: '登録', zh: '注册', fr: 'Inscription' },
  'nav.settings': { en: 'Settings', fil: 'Mga Setting', ja: '設定', zh: '设置', fr: 'Paramètres' },
  'nav.logout': { en: 'Log Out', fil: 'Mag-logout', ja: 'ログアウト', zh: '退出', fr: 'Déconnexion' },
  
  // Hero
  'hero.welcome': { en: 'Welcome to Elysium', fil: 'Maligayang Pagdating sa Elysium', ja: 'エリシウムへようこそ', zh: '欢迎来到极乐园', fr: 'Bienvenue à Elysium' },
  'hero.subtitle': { en: 'Where Luxury Meets Paradise', fil: 'Kung Saan Ang Luho Ay Nakatagpo ng Paraiso', ja: '贅沢と楽園が出会う場所', zh: '奢华与天堂的交汇', fr: 'Où le Luxe Rencontre le Paradis' },
  'hero.cta': { en: 'DISCOVER YOUR ESCAPE', fil: 'TUKLASIN ANG IYONG PAGTAKAS', ja: 'あなたの逃避先を発見', zh: '探索您的逃离', fr: 'DÉCOUVREZ VOTRE ÉVASION' },
  
  // Sections
  'amenities.title': { en: 'Exclusive Amenities', fil: 'Eksklusibong Mga Pasilidad', ja: '特別なアメニティ', zh: '尊享设施', fr: 'Commodités Exclusives' },
  'services.title': { en: 'Elevated Services', fil: 'Mataas na Antas na Serbisyo', ja: '上質なサービス', zh: '卓越服务', fr: 'Services Élevés' },
  'rooms.title': { en: 'Accommodations', fil: 'Mga Tuluyan', ja: '客室', zh: '住宿', fr: 'Hébergements' },
  'testimonials.title': { en: 'Guest Testimonials', fil: 'Mga Patunay ng Bisita', ja: 'ゲストの声', zh: '客户评价', fr: 'Témoignages' },
  'location.title': { en: 'Perfectly Positioned', fil: 'Perpektong Nakaposisyon', ja: '完璧な立地', zh: '完美位置', fr: 'Parfaitement Situé' },
  'location.subtitle': { en: 'Gateway to Paradise', fil: 'Daan Patungo sa Paraiso', ja: '楽園への玄関口', zh: '通往天堂的门户', fr: 'Porte du Paradis' },
  
  // Amenities
  'amenity.pool': { en: 'Infinity Pool', fil: 'Infinity Pool', ja: 'インフィニティプール', zh: '无边泳池', fr: 'Piscine à Débordement' },
  'amenity.pool.desc': { en: 'Heated infinity pool overlooking panoramic vistas', fil: 'Pinainit na infinity pool na may tanawin ng panorama', ja: 'パノラマビューを望む温水インフィニティプール', zh: '俯瞰全景的恒温无边泳池', fr: 'Piscine à débordement chauffée avec vue panoramique' },
  'amenity.gym': { en: 'Fitness Center', fil: 'Fitness Center', ja: 'フィットネスセンター', zh: '健身中心', fr: 'Centre de Fitness' },
  'amenity.gym.desc': { en: 'State-of-the-art fitness facilities available 24/7', fil: 'Makabagong fitness facilities na bukas 24/7', ja: '24時間利用可能な最新のフィットネス施設', zh: '24/7开放的先进健身设施', fr: 'Installations de fitness de pointe disponibles 24h/24' },
  'amenity.dining': { en: 'Gourmet Dining', fil: 'Gourmet Dining', ja: 'グルメダイニング', zh: '美食餐厅', fr: 'Gastronomie' },
  'amenity.dining.desc': { en: 'Michelin-inspired cuisine with world-class chefs', fil: 'Michelin-inspired na lutuin kasama ang world-class chefs', ja: 'ミシュランにインスピレーションを受けた世界クラスのシェフの料理', zh: '米其林风格的世界级厨师料理', fr: 'Cuisine inspirée Michelin avec des chefs de classe mondiale' },
  'amenity.entertainment': { en: 'Evening Entertainment', fil: 'Pang-gabing Libangan', ja: 'イブニングエンターテイメント', zh: '夜间娱乐', fr: 'Divertissement en Soirée' },
  'amenity.entertainment.desc': { en: 'Live performances and curated experiences nightly', fil: 'Live performances at curated experiences gabi-gabi', ja: '毎晩のライブパフォーマンスとキュレートされた体験', zh: '每晚现场表演和精心策划的体验', fr: 'Spectacles en direct et expériences organisées chaque soir' },
  
  // Rooms
  'room.solo': { en: 'Solo Room', fil: 'Solo Room', ja: 'ソロルーム', zh: '单人房', fr: 'Chambre Solo' },
  'room.deluxe': { en: 'Deluxe Room', fil: 'Deluxe Room', ja: 'デラックスルーム', zh: '豪华房', fr: 'Chambre Deluxe' },
  'room.twin': { en: 'Twin Deluxe Room', fil: 'Twin Deluxe Room', ja: 'ツインデラックスルーム', zh: '双床豪华房', fr: 'Chambre Twin Deluxe' },
  'room.penthouse': { en: 'Penthouse Suite', fil: 'Penthouse Suite', ja: 'ペントハウススイート', zh: '顶层套房', fr: 'Suite Penthouse' },
  'room.bookNow': { en: 'Book Now', fil: 'Mag-book Ngayon', ja: '今すぐ予約', zh: '立即预订', fr: 'Réserver Maintenant' },
  'room.learnMore': { en: 'Learn More', fil: 'Alamin Pa', ja: '詳細を見る', zh: '了解更多', fr: 'En Savoir Plus' },
  
  // Footer
  'footer.copyright': { en: '© 2025 Elysium. All rights reserved. Paradise Preserved.', fil: '© 2025 Elysium. Lahat ng karapatan ay nakalaan. Paraiso ay Naiingatan.', ja: '© 2025 Elysium. 全著作権所有. 楽園保存.', zh: '© 2025 Elysium. 版权所有. 天堂保存.', fr: '© 2025 Elysium. Tous droits réservés. Paradis Préservé.' },
  'footer.about': { en: 'About Us', fil: 'Tungkol sa Amin', ja: '私たちについて', zh: '关于我们', fr: 'À Propos' },
  
  // Settings
  'settings.title': { en: 'Settings', fil: 'Mga Setting', ja: '設定', zh: '设置', fr: 'Paramètres' },
  'settings.darkMode': { en: 'Dark Mode', fil: 'Dark Mode', ja: 'ダークモード', zh: '深色模式', fr: 'Mode Sombre' },
  'settings.language': { en: 'Language', fil: 'Wika', ja: '言語', zh: '语言', fr: 'Langue' },
  
  // Auth
  'auth.username': { en: 'Username', fil: 'Username', ja: 'ユーザー名', zh: '用户名', fr: 'Nom d\'utilisateur' },
  'auth.password': { en: 'Password', fil: 'Password', ja: 'パスワード', zh: '密码', fr: 'Mot de passe' },
  'auth.confirmPassword': { en: 'Confirm Password', fil: 'Kumpirmahin ang Password', ja: 'パスワードを確認', zh: '确认密码', fr: 'Confirmer le mot de passe' },
  'auth.email': { en: 'Email', fil: 'Email', ja: 'メール', zh: '电子邮件', fr: 'E-mail' },
  'auth.fullName': { en: 'Full Name', fil: 'Buong Pangalan', ja: '氏名', zh: '全名', fr: 'Nom Complet' },
  'auth.otp': { en: 'Enter OTP', fil: 'Ilagay ang OTP', ja: 'OTPを入力', zh: '输入验证码', fr: 'Entrez OTP' },
  'auth.otpSent': { en: 'OTP sent to your email', fil: 'OTP ipinadala sa iyong email', ja: 'OTPをメールに送信しました', zh: '验证码已发送到您的邮箱', fr: 'OTP envoyé à votre e-mail' },
  'auth.welcome': { en: 'Welcome!', fil: 'Maligayang Pagdating!', ja: 'ようこそ！', zh: '欢迎！', fr: 'Bienvenue!' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('elysium_language');
    return (saved as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('elysium_language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
