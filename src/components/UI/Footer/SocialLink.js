import React from 'react';
import classes from './SocialLink.module.css';

const SocialLink = ({ link, icon, title }) => {
  return (
    <a className={classes.link} href={link} target="_blank" rel="noreferrer">
      <img className={classes.icon} src={icon} alt="" />
      {title}
    </a>
  );
};

export default SocialLink;
