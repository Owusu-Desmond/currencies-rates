import { FaSearch } from 'react-icons/fa';
import { PropTypes } from 'prop-types';
import { IoMdSettings } from 'react-icons/io';

const Nav = ({ children, text }) => (
  <nav className="all-currencies-nav">
    <div>
      {children}
    </div>
    <div className="nav-text">
      {text}
    </div>
    <div className="search-setting-icon">
      <FaSearch />
      <IoMdSettings />
    </div>
  </nav>
);

Nav.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default Nav;
