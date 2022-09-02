import { PropTypes } from 'prop-types';
import { IoMdSettings, IoIosArrowBack } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Nav = ({ children, text }) => (
  <nav className="all-currencies-nav">
    <div>
      {(window.location.pathname === '/') ? (
        <AiFillHome />
      ) : (
        <Link to="/">
          <IoIosArrowBack />
        </Link>
      )}
    </div>
    <div className="nav-text">
      {text}
    </div>
    <div className="search-setting-icon">
      {children}
      <IoMdSettings />
    </div>
  </nav>
);

Nav.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default Nav;
