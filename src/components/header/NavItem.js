/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link';

// interface NavItemProps {
//   name: 'TV' | 'Movies';
// }

const NavItem = ({ name, link }) => (
  (<NextLink
    href={`/${link}`}
    className="text-xl sm:text-lg hover:text-textHighlight font-semibold tracking-wide ml-5 py-3 sm:py-5 sm:mr-5">

    {name}

  </NextLink>)
);

export default NavItem;
