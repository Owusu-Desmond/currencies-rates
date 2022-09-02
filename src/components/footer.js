// wait for the 5 seconds to pass
import { useEffect, useState } from 'react';

const Footer = () => {
  const [isShowing, setIsShowing] = useState(false);
  // use useEffect to delay the display of the footer for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const footerContent = (
    <>
      <p>
        &copy;
        {new Date().getFullYear()}
        {' '}
        Currency Exchange Rates
      </p>
      <div>
        Built by
        {' '}
        <a href="http://www.github.com/Owusu-Desmond"> Owusu-Desmond</a>
      </div>
    </>
  );
  return (
    <footer>
      {isShowing ? footerContent : <p>Loading...</p>}
    </footer>

  );
};

export default Footer;
