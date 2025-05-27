import React from 'react';
import { Plus, Target, Sparkles } from 'lucide-react';

interface DropZoneEmptyProps {
  isDragOver: boolean;
  theme?: 'red' | 'yellow' | 'green' | 'blue';
}

const DropZoneEmpty: React.FC<DropZoneEmptyProps> = ({ isDragOver, theme = 'blue' }) => {
  // Theme configurations
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
        bg: 'group-hover:from-red-100 group-hover:via-rose-50 group-hover:to-red-100',
        text: 'group-hover:text-red-600',
        subtitle: 'group-hover:text-red-500',
        gradient: 'group-hover:from-red-400/10 group-hover:via-rose-400/10 group-hover:to-red-400/10'
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
        bg: 'group-hover:from-yellow-100 group-hover:via-amber-50 group-hover:to-yellow-100',
        text: 'group-hover:text-yellow-600',
        subtitle: 'group-hover:text-yellow-500',
        gradient: 'group-hover:from-yellow-400/10 group-hover:via-amber-400/10 group-hover:to-yellow-400/10'
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
        bg: 'group-hover:from-green-100 group-hover:via-emerald-50 group-hover:to-green-100',
        text: 'group-hover:text-green-600',
        subtitle: 'group-hover:text-green-500',
        gradient: 'group-hover:from-green-400/10 group-hover:via-emerald-400/10 group-hover:to-green-400/10'
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
        bg: 'group-hover:from-blue-100 group-hover:via-indigo-50 group-hover:to-blue-100',
        text: 'group-hover:text-blue-600',
        subtitle: 'group-hover:text-blue-500',
        gradient: 'group-hover:from-blue-400/10 group-hover:via-indigo-400/10 group-hover:to-blue-400/10'
      }
    }
  };

  const currentTheme = themeConfig[theme];
  return (
    <div className="text-center py-16 relative">
      {/* Floating decoration when not dragging */}
      {!isDragOver && (
        <>
          <div className={`absolute top-8 left-1/4 w-6 h-6 bg-gradient-to-br ${currentTheme.decorations} rounded-full opacity-20 animate-pulse`}></div>
          <div className={`absolute bottom-12 right-1/3 w-4 h-4 bg-gradient-to-br ${currentTheme.decorations} rounded-full opacity-30 animate-pulse delay-1000`}></div>
        </>
      )}

      {isDragOver ? (
        <div className={`${currentTheme.dragOver.text} relative`}>
          {/* Active drop state */}
          <div className="relative">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${currentTheme.dragOver.bg} flex items-center justify-center shadow-xl border-2 ${currentTheme.dragOver.border} border-dashed animate-pulse`}>
              <Target className={`w-12 h-12 ${currentTheme.dragOver.icon}`} />
            </div>
            
            {/* Floating sparkles */}
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
        <div className="text-gray-400 group relative">
          {/* Default empty state */}
          <div className="relative">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-gray-100 via-slate-50 to-gray-100 flex items-center justify-center shadow-lg ${currentTheme.hover.bg} transition-all duration-300 group-hover:shadow-xl group-hover:scale-110`}>
              <Plus className={`w-10 h-10 ${currentTheme.hover.text} transition-all duration-300 group-hover:rotate-90`} />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className={`font-bold text-lg ${currentTheme.hover.text} transition-colors duration-300`}>
              Drop items here
            </p>
            <p className={`text-sm text-gray-400 ${currentTheme.hover.subtitle} transition-colors duration-300 max-w-[250px] mx-auto`}>
              Drag resources or items from other areas to organize them here
            </p>
          </div>
          
          {/* Subtle animated border */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-400/0 via-gray-400/0 to-gray-400/0 ${currentTheme.hover.gradient} transition-all duration-500 -z-10`}></div>
        </div>
      )}
    </div>
  );
};

export default DropZoneEmpty;