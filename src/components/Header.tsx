import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.repository'), href: '/repository' },
    { name: t('navigation.publications'), href: '/publications' },
    { name: t('navigation.gallery'), href: '/gallery' },
    { name: t('navigation.news'), href: '/news' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.contact'), href: '/contact' },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/repository?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  
  return (
    <Disclosure as="header" className="bg-white shadow-sm sticky top-0 z-40">
      {({ open }: { open: boolean }) => (
        <>
          <a href="#main-content" className="skip-link">
            {t('actions.skipToContent')}
          </a>
          
          <div className="container-custom">
            <div className="flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3 focus-ring rounded-md">
                  <img
                    className="h-10 w-auto"
                    src="/logo-aictig.png"
                    alt={t('siteName')}
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%230A5BD3" width="100" height="100"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold"%3EA%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="hidden sm:block">
                    <div className="text-lg font-bold text-primary-600">{t('siteName')}</div>
                    <div className="text-xs text-neutral-600">Cybersecurity Governance</div>
                  </div>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex lg:space-x-1" aria-label="Main navigation">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors focus-ring"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {/* Search & Language Switcher */}
              <div className="flex items-center space-x-4">
                {/* Search - Desktop */}
                <form onSubmit={handleSearch} className="hidden md:block">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder={t('actions.search')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 lg:w-64 pl-10 pr-4 py-2 text-sm border border-neutral-300 rounded-lg focus-ring"
                      aria-label={t('actions.search')}
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" aria-hidden="true" />
                  </div>
                </form>
                
                <LanguageSwitcher />
                
                {/* Mobile menu button */}
                <Disclosure.Button className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-ring">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          <Disclosure.Panel className="lg:hidden border-t border-neutral-200">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="search"
                    placeholder={t('actions.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-300 rounded-lg focus-ring"
                    aria-label={t('actions.search')}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" aria-hidden="true" />
                </div>
              </form>
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
