import React from 'react';

import Copyright from './Copyright';

import twitter from '../../../assets/images/twitter.min.svg';
import github from '../../../assets/images/github.min.svg';
import discord from '../../../assets/images/discord.min.svg';

class Footer extends React.Component {
  render() {
    return (
      <footer className="site-footer bg-gray-200">
        <Copyright />
        <ul className="social-links">
          <li>
            <a href="https://twitter.com/#">
              <img src={twitter} alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="https://github.com/#">
              <img src={github} alt="GitHub" />
            </a>
          </li>
          <li>
            <a href="https://discord.gg/#">
              <img src={discord} alt="Discord" />
            </a>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
