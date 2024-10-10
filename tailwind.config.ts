import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        wobbleHorBottom: {
          '0%,100%': {
            transform: 'translateX(0%)',
            transformOrigin: '50% 50%',
          },
          '15%': {
            transform: 'translateX(-5px) rotate(-3deg)',
          },
          '30%': {
            transform: 'translateX(2.5px) rotate(3deg)',
          },
          '45%': {
            transform: 'translateX(-2.5px) rotate(-1.6deg)',
          },
          '60%': {
            transform: 'translateX(1px) rotate(1.4deg)',
          },
          '75%': {
            transform: 'translateX(-1px) rotate(-0.2deg)',
          },
        },
        bounceToTheRight: {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        slideInFromBottom: {
          '0%': {
            transform: 'translateY(2rem)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0rem)',
            opacity: '1',
          },
        },
        textFocus: {
          '0%': {
            filter: 'blur(12px)',
            opacity: '0',
          },
          '100%': {
            filter: 'blur(0px)',
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        jumpingDots: {
          '10%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      animation: {
        bounceToTheRight: 'bounceToTheRight 1s infinite',
        wobbleHorBottom: 'wobbleHorBottom 0.8s both',
        slideInFromBottom: 'slideInFromBottom 0.3s ease-in-out',
        textFocus: 'textFocus 0.2s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config
