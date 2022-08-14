import classes from './Footer.module.css';
import facebook from '../../../assets/icons/facebook.svg';
import instagram from '../../../assets/icons/instagram.svg';
import linkedIn from '../../../assets/icons/linkedin.svg';
import SocialLink from './SocialLink';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div>© SmartLynx Airlines 2022. All rights reserved.</div>
      <div className={classes.social_links}>
        <SocialLink
          link="https://www.facebook.com/smartlynxairlines/"
          icon={facebook}
        />
        <SocialLink
          link="https://www.instagram.com/smartlynxairlines/?hl=en"
          icon={instagram}
        />
        <SocialLink
          link="https://www.linkedin.com/company/smartlynx-airlines/"
          icon={linkedIn}
        />
      </div>
    </div>
  );
};

export default Footer;
