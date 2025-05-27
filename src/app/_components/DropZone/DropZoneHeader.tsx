import React from 'react';

interface DropZoneHeaderProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  theme?: 'red' | 'yellow' | 'green' | 'blue';
}

const DropZoneHeader: React.FC<DropZoneHeaderProps> = ({ icon, title, count, theme = 'blue' }) => {
  const themeConfig = {
    red: {
      iconBg: 'from-red-100 via-rose-50 to-red-100',
      titleGradient: 'from-red-700 to-rose-700',
      counterBg: 'from-red-100 to-rose-100',
      counterText: 'text-red-700',
      counterBorder: 'border-red-200/50'
    },
    yellow: {
      iconBg: 'from-yellow-100 via-amber-50 to-yellow-100',
      titleGradient: 'from-yellow-700 to-amber-700',
      counterBg: 'from-yellow-100 to-amber-100',
      counterText: 'text-yellow-700',
      counterBorder: 'border-yellow-200/50'
    },
    green: {
      iconBg: 'from-green-100 via-emerald-50 to-green-100',
      titleGradient: 'from-green-700 to-emerald-700',
      counterBg: 'from-green-100 to-emerald-100',
      counterText: 'text-green-700',
      counterBorder: 'border-green-200/50'
    },
    blue: {
      iconBg: 'from-blue-100 via-indigo-50 to-blue-100',
      titleGradient: 'from-blue-700 to-indigo-700',
      counterBg: 'from-blue-100 to-indigo-100',
      counterText: 'text-blue-700',
      counterBorder: 'border-blue-200/50'
    }
  };

  const currentTheme = themeConfig[theme];

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${currentTheme.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-bold text-2xl bg-gradient-to-r ${currentTheme.titleGradient} bg-clip-text text-transparent`}>
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Organize and manage your items</p>
        </div>
      </div>
      <div className={`bg-gradient-to-r ${currentTheme.counterBg} ${currentTheme.counterText} text-sm px-4 py-2 rounded-full font-bold shadow-md border ${currentTheme.counterBorder}`}>
        {count} {count === 1 ? 'item' : 'items'}
      </div>
    </div>
  );
};

export default DropZoneHeader;