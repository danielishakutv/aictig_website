import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.repository'), href: '/repository' },
    { name: t('navigation.publications'), href: '/publications' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('footer.privacy'), href: '/legal/privacy' },
    { name: t('footer.terms'), href: '/legal/terms' },
  ];
  
  return (
    <footer className="bg-neutral-900 text-neutral-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('siteName')}</h3>
            <p className="text-sm mb-4">{t('siteFullName')}</p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/aictig"
                className="text-neutral-400 hover:text-white transition-colors focus-ring rounded"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/aictig"
                className="text-neutral-400 hover:text-white transition-colors focus-ring rounded"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t('footer.contactInfo')}</h3>
            <address className="not-italic text-sm space-y-2">
              <p>
                <span className="block font-medium text-white">{t('footer.email')}</span>
                <a href={`mailto:${t('footer.email')}`} className="hover:text-white transition-colors focus-ring rounded">
                  {t('footer.email')}
                </a>
              </p>
              <p className="mt-4">
                <span className="block font-medium text-white">Address</span>
                Nairobi, Kenya
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm">
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
