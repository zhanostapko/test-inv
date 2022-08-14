import classes from './Header.module.css';
import logo from '../../../assets/logo.png';

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.container}>
        {/* Below should take place real person data if it came from endpoint */}
        <div className={classes.person}>
          <div>John Doe</div>
          <div>john.doe@gmail.com</div>
          <div>(818) 472-4089</div>
        </div>
        <h1 className={classes.title}>Invoice</h1>
        <img src={logo} alt="Smartlynx logo" />
      </div>
    </div>
  );
};

export default Header;
