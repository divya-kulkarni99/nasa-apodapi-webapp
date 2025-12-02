import './Header.css';

function Header({ onLogout }) {
  return (
    <header>
      <img
        className="header-logo"
        alt="logoImage"
        src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
      />
      <div className="header-title-container">
        <h1 className="header-title">NASA Astronomy Picture of the Day</h1>
      </div>
      {onLogout && (
        <button className="header-logout-button" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
}
export default Header;
