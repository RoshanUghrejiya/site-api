import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  TextInput,
} from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  FaMoon,
  FaSun,
  FaInstagram,
  FaYoutube,
  FaFacebook,
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState, useRef } from 'react';
import logo from './logo.png';
import PropTypes from 'prop-types';


const socialLinks = [
  {
    href: 'https://x.com/KhabriTelly?t=cqSA72JWBH9sGfXpZefx6w&s=08',
    label: 'X',
    icon: <SiX size={20} />,
    position: 'left',
    bg: 'bg-black',
  },
  {
    href: 'https://www.instagram.com/tellykhabriofficial?igsh=MjJqbHphY3l0NWxo',
    label: 'Instagram',
    icon: <FaInstagram size={20} />,
    position: 'left',
    bg: 'bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500',
  },
  {
    href: 'https://youtube.com/@tellykhabri?si=1HOeCB1VED0SVaLL',
    label: 'YouTube',
    icon: <FaYoutube size={20} />,
    position: 'right',
    bg: 'bg-red-600',
  },
  {
    href: 'https://www.facebook.com/share/18ykjgpQay/',
    label: 'Facebook',
    icon: <FaFacebook size={20} />,
    position: 'right',
    bg: 'bg-blue-600',
  },
];

const SocialButton = ({ href, icon, label, bg }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-[45px] h-[45px] group my-1"
  >
    <div
      className={`absolute inset-0 rounded-full transition-transform duration-500 origin-left group-hover:-rotate-90 flex items-center justify-center ${bg} text-white`}
    >
      {icon}
    </div>
    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white bg-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition duration-500">
      {label}
    </div>
  </a>
);

SocialButton.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
};


export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  const BACKEND_URL = 'https://blog-site-api-tn0y.onrender.com';

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = headerRef.current?.offsetHeight || 0;
      setIsSticky(window.scrollY > offset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/signout`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div>
      {/* Top Header */}
      <div
        ref={headerRef}
        className={`py-4 px-4 md:py-8 md:px-6 shadow-md relative transition-colors duration-500 ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        {/* Social Icons (Left) */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col z-40">
          {socialLinks
            .filter((link) => link.position === 'left')
            .map((link, i) => (
              <SocialButton key={i} {...link} />
            ))}
        </div>

        {/* Social Icons (Right) */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col z-40">
          {socialLinks
            .filter((link) => link.position === 'right')
            .map((link, i) => (
              <SocialButton key={i} {...link} />
            ))}
        </div>

        {/* Center Logo + Text */}
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-center text-center sm:text-left gap-4">
          <img
            src={logo}
            alt="TellyKhabri Logo"
            className="w-20 h-20 sm:w-28 sm:h-28 mx-auto sm:mx-0 rounded-full object-cover border-4 border-yellow-500 shadow-[0_0_10px_rgba(255,215,0,0.6)]"
          />
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 text-transparent bg-clip-text">
              TellyKhabri
            </h1>
            <p className="text-sm sm:text-md text-gray-600 dark:text-gray-400 font-medium">
              Your daily dose of Bollywood, TV, and celeb buzz
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Navbar */}
      <div
        className={`w-full z-50 transition-all duration-300 ease-in-out ${
          isSticky ? 'fixed top-0 bg-white dark:bg-gray-800 shadow-lg backdrop-blur-md' : ''
        }`}
      >
        <Navbar
          className={`shadow-md ${
            theme === 'dark'
              ? 'bg-gray-800 text-white'
              : 'bg-gradient-to-r from-yellow-300 via-yellow-500 to-black text-white'
          }`}
        >
          {/* Logo and brand */}
          <Link
            to="/"
            className="flex items-center self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-white"
          >
            <img className="h-12 w-12 mr-2 rounded-full" src={logo} />
            <span className="px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg text-white font-bold">
              TellyKhabri
            </span>
            <span className="ml-2 hidden sm:inline text-orange-600 font-semibold">
              .Com
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSubmit} className="hidden lg:block w-64">
            <label htmlFor="search-input" className="sr-only">
              Search
            </label>
            <TextInput
              id="search-input"
              type="text"
              placeholder="Search..."
              rightIcon={AiOutlineSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Right: Theme toggle + user + mobile toggle */}
          <div className="flex items-center gap-2 md:order-2">
            {/* Mobile Search */}
            <Button
              className="w-10 h-10 lg:hidden"
              color="gray"
              pill
              onClick={() =>
                navigate(`/search?searchTerm=${searchTerm}`)
              }
            >
              <AiOutlineSearch />
            </Button>

            {/* Theme Switch */}
            <Button
              className="w-10 h-10"
              color="gray"
              pill
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>

            {/* User or Sign In */}
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="user"
                    img={currentUser.profilePicture}
                    rounded
                    className="w-10 h-10 object-cover border-2 border-white"
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    @{currentUser.username}
                  </span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to="/dashboard?tab=profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToPink" outline>
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile nav toggle */}
            <Navbar.Toggle />
          </div>

          {/* Nav Links */}
          <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as="div">
              <Link to="/" className="text-white hover:text-yellow-300 font-semibold transition duration-300">
                Home
              </Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as="div">
              <Link to="/about" className="text-white hover:text-yellow-300 font-semibold transition duration-300">
                About
              </Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/projects'} as="div">
              <Link to="/projects" className="text-white hover:text-yellow-300 font-semibold transition duration-300">
                Videos
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        {/* Mobile View: Social Icons */}
        <div className="md:hidden flex justify-center gap-4 py-4 bg-yellow-100 dark:bg-gray-900">
          {socialLinks.map((link, i) => (
            <SocialButton key={i} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
