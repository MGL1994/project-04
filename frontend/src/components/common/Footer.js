import React from 'react'
import CookbookLogoWhite from '../../images/CookBookLogoWhite.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column">
            <img src={CookbookLogoWhite} alt="CookBook Logo" />
          </div>
          <div className="column has-text-white">
            <p>About Us</p>
            <p>What We Do</p>
            <p>FAQ</p>
          </div>
          <div className="column has-text-white">
            <p>Legal</p>
            <p>Terms & Conditions</p>
            <p>Contact Us</p>
          </div>
          <div className="column has-text-white">
            <img src="https://www.iconsdb.com/icons/preview/white/facebook-5-xxl.png" alt="Facebook Logo" width="30" />

            <img src="https://www.iconsdb.com/icons/preview/white/twitter-5-xxl.png" alt="Twitter Logo" width="30" />

            <img src="https://www.iconsdb.com/icons/preview/white/instagram-4-xxl.png" alt="Instagram Logo" width="30" />
            <p className="is-size-7">&copy; Copyright 2019 CookBook. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
