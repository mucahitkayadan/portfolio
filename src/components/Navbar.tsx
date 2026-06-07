import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { navLinks, type NavLink } from '../constants';
import { usePortfolio } from '../context/PortfolioContext';
import { logo } from '../assets';

const Navbar = () => {
  const { fullName } = usePortfolio();
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuIconStyle: CSSProperties = {
    position: 'relative',
    width: '28px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const barCommonStyle: CSSProperties = {
    background: 'white',
    display: 'block',
    height: '2px',
    width: '18px',
    borderRadius: '2px',
    position: 'absolute',
    transition: 'all 0.2s ease-out',
  };

  const topBarStyle: CSSProperties = {
    ...barCommonStyle,
    top: toggle ? '50%' : '5px',
    transform: toggle ? 'rotate(-45deg)' : 'none',
  };

  const middleBarStyle: CSSProperties = {
    ...barCommonStyle,
    opacity: toggle ? 0 : 1,
    top: '50%',
    transition: 'opacity 0.2s ease-out',
  };

  const bottomBarStyle: CSSProperties = {
    ...barCommonStyle,
    top: toggle ? '50%' : '15px',
    transform: toggle ? 'rotate(45deg)' : 'none',
  };

  const handleNavClick = (nav: NavLink, event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    setActive(nav.title);
    if (nav.isExternal && nav.path) {
      window.open(nav.path, '_self');
    } else {
      const element = document.getElementById(nav.id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNavHref = (nav: NavLink) => (nav.isExternal && nav.path ? nav.path : `#${nav.id}`);

  return (
    <nav
      className={`${
        styles.paddingX
      } safe-top safe-x w-full flex items-center py-4 sm:py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <button
          type="button"
          className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <motion.p
            className="text-white text-[18px] font-bold cursor-pointer flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="block text-[22px] sm:text-[26px]"
              style={{
                fontFamily: "'Dancing Script', cursive",
                background: 'linear-gradient(90deg, #915EFF, #00BFFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {'</'}
              {fullName}
              {'>'}
            </span>
          </motion.p>
        </button>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav, index) => (
            <motion.li
              key={nav.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={getNavHref(nav)}
                onClick={event => handleNavClick(nav, event)}
                className={`${
                  active === nav.title ? 'text-white' : 'text-secondary'
                } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300`}
              >
                {nav.title}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            style={menuIconStyle}
            onClick={() => setToggle(!toggle)}
            aria-expanded={toggle}
            aria-label={toggle ? 'Close navigation menu' : 'Open navigation menu'}
            className="bg-transparent border-0 p-0"
          >
            <span style={topBarStyle} />
            <span style={middleBarStyle} />
            <span style={bottomBarStyle} />
          </button>

          <motion.div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 black-gradient absolute top-[calc(env(safe-area-inset-top,0px)+4.5rem)] right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: toggle ? 1 : 0, scale: toggle ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav, index) => (
                <motion.li
                  key={nav.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? 'text-white' : 'text-secondary'
                  }`}
                >
                  <a
                    href={getNavHref(nav)}
                    onClick={event => {
                      setToggle(false);
                      handleNavClick(nav, event);
                    }}
                  >
                    {nav.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
