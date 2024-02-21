import { Link } from 'react-router-dom';
import SocialIcons from '../components/SocialIcons';

export default function Footer() {
  return (
    <footer className="flex w-full justify-center bg-black">
      <div
        className="flex max-w-7xl flex-1 flex-col justify-between px-5 py-10 text-gray-400
          lg:flex-row"
      >
        <section className="max-w-prose">
          <h2 className="mb-2 font-bold text-gray-300">About Shopping Cart</h2>
          <p>
            Your premier destination for all things miniature. As specialists in tabletop gaming, we
            cater to enthusiasts like you, offering an extensive selection of hobby essentials.
          </p>

          <h2 className="mb-2 mt-8 font-bold text-gray-300">Opening Hours</h2>
          <p>Weekdays 9am - 6pm</p>
          <p>Saturday 10am - 5pm</p>
          <p>Sunday - Closed</p>

          <h2 className="mb-2 mt-8 font-bold text-gray-300">Socials</h2>
          <SocialIcons />
        </section>

        <section className="max-w-prose">
          <h2 className="mb-2 mt-8 font-bold text-gray-300 lg:mt-0">Reasons to shop with us</h2>
          <p>Friendly Staff</p>
          <p>Quick Shipping</p>
          <p>Free UK Shipping on Orders Over £50</p>
          <p>Outstanding Customer Service</p>

          <h2 className="mb-2 mt-8 font-bold text-gray-300">Quick Links</h2>
          <ul>
            <li>
              <Link to="/warhammer-40k">Warhammer 40,000</Link>
            </li>
            <li>
              <Link to="/age-of-sigmar">Age of Sigmar</Link>
            </li>
            <li>
              <Link to="">Delivery and Returns</Link>
            </li>
            <li>
              <Link to="">Privacy Policy</Link>
            </li>
            <li>
              <Link to="">Contact Us</Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
