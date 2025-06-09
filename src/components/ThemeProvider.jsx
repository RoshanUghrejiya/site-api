import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-[#0f0f0f] text-yellow-100'
            : 'bg-gray-50 text-gray-900'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
