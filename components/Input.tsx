'use client';

import React from 'react';
import { IconSearch } from './Icons';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Лейбл над инпутом (опционально)
   */
  label?: string;
  
  /**
   * Иконка слева (опционально)
   * Можно передать React компонент иконки или строку для стандартных иконок
   */
  leftIcon?: React.ReactNode | 'search';
  
  /**
   * Элемент справа (опционально)
   * Может быть кнопкой, иконкой или любым React элементом
   */
  rightElement?: React.ReactNode;
  
  /**
   * Размер инпута
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Вариант стиля
   * @default 'default'
   */
  variant?: 'default' | 'minimal';
  
  /**
   * Показывать ли кнопку очистки при наличии значения
   * @default false
   */
  showClearButton?: boolean;
  
  /**
   * Обработчик очистки (используется с showClearButton)
   */
  onClear?: () => void;
  
  /**
   * Ошибка (показывает красную обводку)
   */
  error?: boolean;
  
  /**
   * Сообщение об ошибке
   */
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      leftIcon,
      rightElement,
      size = 'md',
      variant = 'default',
      showClearButton = false,
      onClear,
      error = false,
      errorMessage,
      className = '',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    // Размеры для разных размеров
    const sizeClasses = {
      sm: {
        input: 'py-2.5 text-sm',
        icon: 'left-3',
        padding: 'pl-9 pr-10',
        iconSize: 16,
      },
      md: {
        input: 'py-3.5 text-sm',
        icon: 'left-4',
        padding: 'pl-11 pr-12',
        iconSize: 18,
      },
      lg: {
        input: 'py-4 text-base',
        icon: 'left-4',
        padding: 'pl-11 pr-12',
        iconSize: 18,
      },
    };

    const currentSize = sizeClasses[size];

    // Стили для вариантов
    const variantClasses = {
      default: 'bg-surfaceLight/50 backdrop-blur-sm border border-white/5',
      minimal: 'bg-zinc-900/50 border border-zinc-800',
    };

    // Определяем, показывать ли кнопку очистки
    const hasValue = value !== undefined && value !== null && value !== '';
    const shouldShowClear = showClearButton && hasValue && onClear;

    // Вычисляем padding в зависимости от наличия иконок
    let padding = '';
    if (leftIcon) {
      padding = currentSize.padding.split(' ')[0]; // pl-11 или pl-9
    } else {
      padding = 'pl-4';
    }

    if (shouldShowClear || rightElement) {
      padding += ' pr-12';
    } else if (leftIcon) {
      padding += ' pr-4';
    } else {
      padding += ' pr-4';
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white mb-2">
            {label}
          </label>
        )}
        
        <div className="relative isolate">
          {/* Левая иконка */}
          {leftIcon && (
            <>
              {leftIcon === 'search' ? (
                <div 
                  className={`absolute ${currentSize.icon} top-1/2 z-10`}
                  style={{ transform: 'translateY(-50%) translateZ(0)', willChange: 'transform' }}
                >
                  <IconSearch
                    className="text-muted"
                    size={currentSize.iconSize}
                  />
                </div>
              ) : (
                <div 
                  className={`absolute ${currentSize.icon} top-1/2 z-10`}
                  style={{ transform: 'translateY(-50%) translateZ(0)', willChange: 'transform' }}
                >
                  {leftIcon}
                </div>
              )}
            </>
          )}
          
          <input
            ref={ref}
            value={value}
            onChange={onChange}
            className={`
              w-full
              ${currentSize.input}
              ${padding}
              ${variantClasses[variant]}
              rounded-2xl
              text-white
              placeholder-zinc-500
              focus:outline-none
              focus:ring-1
              ${error ? 'focus:ring-accent border-accent/50' : 'focus:ring-primary/50'}
              transition-all
              shadow-sm
              touch-manipulation
              relative
              z-0
              ${className}
            `}
            style={{
              minHeight: size === 'lg' ? '56px' : size === 'md' ? '44px' : '40px',
              fontSize: size === 'lg' ? '16px' : size === 'md' ? '14px' : '14px',
            }}
            {...props}
          />
          
          {/* Правый элемент */}
          {shouldShowClear ? (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 touch-manipulation hover:bg-white/5 rounded-lg transition-colors"
              style={{ minHeight: '44px', minWidth: '44px' }}
              aria-label="Очистить"
            >
              <svg
                width={currentSize.iconSize}
                height={currentSize.iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          ) : rightElement ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          ) : null}
        </div>
        
        {error && errorMessage && (
          <p className="mt-1 text-xs text-accent" style={{ fontSize: '12px' }}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

