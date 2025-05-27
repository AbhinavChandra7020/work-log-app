import React from 'react';
import { Plus, Target, Sparkles } from 'lucide-react';

interface DropZoneEmptyProps {
  isDragOver: boolean;
  theme?: 'red' | 'yellow' | 'green' | 'blue';
}

const DropZoneEmpty: React.FC<DropZoneEmptyProps> = ({ isDragOver, theme = 'blue' }) => {
  const themeConfig = {
    red: {
      decorations: 'from-red-400 to-rose-400',
      dragOver: {
        text: 'text-red-600',
        bg: 'from-red-100 via-rose-50 to-red-100',
        border: 'border-red-300',
        icon: 'text-red-600',
        title: 'text-red-700',
        subtitle: 'text-red-600',
        sparkles: 'text-red-500'
      },
      hover: {
        bg: 'hover:from-red-50 hover:via-rose-25 hover:to-red-50',
        text: 'hover:text-red-500',
        subtitle: 'hover:text-red-400',
        iconBg: 'hover:bg-red-50',
        shadow: 'hover:shadow-red-100'
      }
    },
    yellow: {
      decorations: 'from-yellow-400 to-amber-400',
      dragOver: {
        text: 'text-yellow-600',
        bg: 'from-yellow-100 via-amber-50 to-yellow-100',
        border: 'border-yellow-300',
        icon: 'text-yellow-600',
        title: 'text-yellow-700',
        subtitle: 'text-yellow-600',
        sparkles: 'text-yellow-500'
      },
      hover: {
        bg: 'hover:from-yellow-50 hover:via-amber-25 hover:to-yellow-50',
        text: 'hover:text-yellow-500',
        subtitle: 'hover:text-yellow-400',
        iconBg: 'hover:bg-yellow-50',
        shadow: 'hover:shadow-yellow-100'
      }
    },
    green: {
      decorations: 'from-green-400 to-emerald-400',
      dragOver: {
        text: 'text-green-600',
        bg: 'from-green-100 via-emerald-50 to-green-100',
        border: 'border-green-300',
        icon: 'text-green-600',
        title: 'text-green-700',
        subtitle: 'text-green-600',
        sparkles: 'text-green-500'
      },
      hover: {
        bg: 'hover:from-green-50 hover:via-emerald-25 hover:to-green-50',
        text: 'hover:text-green-500',
        subtitle: 'hover:text-green-400',
        iconBg: 'hover:bg-green-50',
        shadow: 'hover:shadow-green-100'
      }
    },
    blue: {
      decorations: 'from-blue-400 to-indigo-400',
      dragOver: {
        text: 'text-blue-600',
        bg: 'from-blue-100 via-indigo-50 to-blue-100',
        border: 'border-blue-300',
        icon: 'text-blue-600',
        title: 'text-blue-700',
        subtitle: 'text-blue-600',
        sparkles: 'text-blue-500'
      },
      hover: {
        bg: 'hover:from-blue-50 hover:via-indigo-25 hover:to-blue-50',
        text: 'hover:text-blue-500',
        subtitle: 'hover:text-blue-400',
        iconBg: 'hover:bg-blue-50',
        shadow: 'hover:shadow-blue-100'
      }
    }
  };

  const currentTheme = themeConfig[theme];
  
  return (
    <div className="text-center py-16 relative">
      {!isDragOver && (
        <>
          <div className={`absolute top-8 left-1/4 w-6 h-6 bg-gradient-to-br ${currentTheme.decorations} rounded-full opacity-20 animate-pulse`}></div>
          <div className={`absolute bottom-12 right-1/3 w-4 h-4 bg-gradient-to-br ${currentTheme.decorations} rounded-full opacity-30 animate-pulse delay-1000`}></div>
        </>
      )}

      {isDragOver ? (
        <div className={`${currentTheme.dragOver.text} relative`}>
          {/* active drop state */}
          <div className="relative">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${currentTheme.dragOver.bg} flex items-center justify-center shadow-xl border-2 ${currentTheme.dragOver.border} border-dashed animate-pulse`}>
              <Target className={`w-12 h-12 ${currentTheme.dragOver.icon}`} />
            </div>
            
            <div className="absolute -top-2 -right-2 opacity-100">
              <Sparkles className={`w-6 h-6 ${currentTheme.dragOver.sparkles} animate-pulse`} />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className={`font-bold text-xl ${currentTheme.dragOver.title}`}>Drop item here</p>
            <p className={`text-sm ${currentTheme.dragOver.subtitle}`}>Release to add to this zone</p>
          </div>
        </div>
      ) : (
        <div className="text-gray-400">
          {/* default empty state */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-100 via-slate-50 to-gray-100 flex items-center justify-center shadow-lg">
              <Plus className="w-10 h-10 text-gray-500" />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-bold text-lg text-gray-500">
              Drop items here
            </p>
            <p className="text-sm text-gray-400 max-w-[250px] mx-auto">
              Drag resources or items from other areas to organize them here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZoneEmpty;