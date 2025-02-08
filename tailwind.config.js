/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1600px',
      },
      backgroundImage: {
        qotdRegular: "url('/assets/images/shriram-qotd.png')",
        kidsQotd: "url('/assets/images/kids-qotd.png')",
        playQuiz: "url('/assets/images/play-quiz.png')",
        challengeQuiz: "url('/assets/images/monthly-challenge.png')",
        infiniteZounds: "url('/assets/images/infinitezounds.png')",
        bertysQuestions: "url('/assets/images/bertysquestions.png')",
        theKapsQuiz: "url('/assets/images/thekapsquiz.png')",
        Q2CHEW: "url('/assets/images/Q2CHEW.png')",
        rcChallenge: "url('/assets/images/rc_challenge.png')",
        todaysSpecial: "url('/assets/images/todays-special.png')",
      },
      colors: {
        inherit: 'inherit',
        current: 'currentColor',
        transparent: 'transparent',
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
        },
        gradient: {
          DEFAULT: 'var(--color-gradient)',
        },
        result_gradient: {
          DEFAULT: 'var(----color-gradient-result)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          medium: 'var(--color-error-medium)',
          light: 'var(--color-error-light)',
        },
        rightLayout: {
          DEFAULT: 'var(--color-right-layout)',
        },
      },
      fontFamily: {
        genkwizFont: ['Montserrat', 'sans-serif', 'serif'],
      },
    },
  },
  plugins: [],
};
