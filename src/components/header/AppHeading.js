/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link';

const AppHeading = () => (
  <NextLink href="/" className="text-2xl font-bold ml-5 mr-8 py-5 flex text-textHighlight">
    {/* <img src='/images/day2movies-icon.png' className='w-[90px]' /> */}
    Day2Movies
  </NextLink>
);

export default AppHeading;
