import React from 'react';
import classes from './SocialLink.module.css';

const SocialLink = ({ link, icon }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <img className={classes.icon} src={icon} alt="" />
    </a>
  );
};

export default SocialLink;
