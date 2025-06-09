import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsYoutube } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-amber-300'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 rounded-lg text-white mr-2'>
                Telly Khabri
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Blogs
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Telly Khabri Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.instagram.com/extremebollywoodofficial'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Instagram
                </Footer.Link>
                <Footer.Link href='https://www.facebook.com/profile.php?id=100083955443389'>
                  Facebook
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Telly khabri"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://www.facebook.com/profile.php?id=100083955443389' icon={BsFacebook}/>
            <Footer.Icon href='https://www.instagram.com/extremebollywoodofficial' icon={BsInstagram}/>
            <Footer.Icon href='https://twitter.com/' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/' icon={BsGithub}/>
            <Footer.Icon href='https://youtube.com/@tellykhabri?si=NlqHeFesSN4EW-6E' icon={BsYoutube}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
