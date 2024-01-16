import { useNavigate } from 'react-router-dom';
import colorPalette from '../utils/colorPalette';
import AuthService from '../utils/auth';

const handleLogout = () => {
  AuthService.logout(); // Include parentheses to call the logout method
};

function NavBar() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/main');
  };

  return (
    <nav
      className='navbar is-fixed-top'
      role='navigation'
      aria-label='main navigation'
      style={{ background: colorPalette.IVORY }}>
      <a
        className='navbar-item'
        onClick={handleGoHome}>
        {/* <div className='navbar-item is-expanded '>🗑️</div> */}
        🗃️ Cache Cabinet
      </a>

      <div
        id='navbar'
        className='navbar-menu'>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a
                onClick={handleGoHome}
                className='button'
                style={{ backgroundColor: colorPalette.BABYBLUE }}>
                Collections
              </a>

              <a
                onClick={handleLogout}
                className='button'
                style={{ backgroundColor: colorPalette.DUSTYROSE }}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

