import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
const reservedFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'system-ui',
  'Roboto',
  'Helvetica Neue',
  'Segoe UI',
  'Apple SD Gothic Neo',
  'Noto Sans KR',
  'Malgun Gothic',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  ...defaultTheme.fontFamily.sans
];

export default {
  content: ['./examples/index.html', './examples/src/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3bd9fd',
        primaryDark: '#060a47'
      },
      screens: {
        fold: {
          max: '320px'
        },
        mobile: {
          max: '639px'
        },
        tablet: {
          min: '640px'
        },
        pc: {
          min: '1024px'
        }
      },
      fontFamily: {
        sans: ['Pretendard', ...reservedFonts]
      }
    }
  },
  variants: {
    overscrollBehavior: ['hover', 'focus']
  },
  plugins: [
    ({ addComponents }: { addComponents: any }) => {
      addComponents({
        '.ratio169:before': {
          content: '""',
          display: 'block',
          width: 0,
          height: 0,
          paddingBottom: 'calc(9/16 * 100%)'
        },
        '.ratio1:before': {
          content: '""',
          display: 'block',
          width: 0,
          height: 0,
          paddingBottom: 'calc(100%)'
        },
        '.translate-z-0': {
          transform: 'translateZ(0)'
        }
      });
    },
    ({ addComponents }: { addComponents: any }) => {
      addComponents({
        '.scrollbar': {
          overflow: 'overlay',
          '-ms-overflow-style': 'auto',
          'scrollbar-width': 'thin',
          'overscroll-behavior': 'auto',
          '--scrollbar-track': '#333333 !important',
          '--scrollbar-thumb': '#3bd9fd !important',
          'scrollbar-color': 'var(--scrollbar-thumb) var(--scrollbar-track)',
          '&::-webkit-scrollbar': {
            display: 'block',
            width: '9px',
            height: '9px'
          },
          '&::-webkit-scrollbar-track': {
            'background-color': 'var(--scrollbar-track)',
            'border-radius': '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            'background-color': 'var(--scrollbar-thumb)',
            'border-radius': '4px',
            border: '2px solid transparent',
            'background-clip': 'content-box'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            'background-color': '#04c4a8'
          },
          '&.overflow-x-hidden': {
            'overflow-x': 'hidden'
          },
          '&.overflow-y-hidden': {
            'overflow-y': 'hidden'
          }
        }
      });
    }
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
} satisfies Config;
