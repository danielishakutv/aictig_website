import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocialLinks } from '../utils/socialLinks';

export default function Header() {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);
  const navigate = useNavigate();
  const socialLinks = getSocialLinks('h-5 w-5');
  
  const updates = [
    { text: 'New cybersecurity policy framework published for African nations', link: '/publications' },
    { text: 'Latest research on AI governance in Africa now available', link: '/repository' },
    { text: 'Data protection compliance training sessions announced', link: '/news' },
    { text: 'Regional consultation on digital sovereignty begins', link: '/news' },
    { text: 'New policy briefs on telecommunications regulation released', link: '/publications' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdateIndex((prevIndex) => (prevIndex + 1) % updates.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [updates.length]);

  // Mock search data - replace with actual data fetching
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const mockResults = [
      { category: 'Policies', title: 'Cybersecurity Policy Framework 2025', link: '/repository/policy-1', type: 'Repository' },
      { category: 'Publications', title: 'AI Governance in Africa', link: '/publications/pub-1', type: 'Publication' },
      { category: 'News', title: 'Data Protection Summit Announced', link: '/news/news-1', type: 'News' },
      { category: 'Focus Areas', title: 'Artificial Intelligence', link: '/focus-areas/artificial-intelligence', type: 'Focus Area' },
      { category: 'Policies', title: 'Data Protection Regulation', link: '/repository/policy-2', type: 'Repository' },
    ].filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockResults);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    performSearch(value);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultClick = (link: string) => {
    navigate(link);
    closeSearch();
  };

  // Close search on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen]);
  
  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.focusAreas'), href: '/focus-areas' },
    { name: t('navigation.consultancy'), href: '/consultancy' },
    { name: t('navigation.repository'), href: '/repository' },
    { name: t('navigation.publications'), href: '/publications' },
    { name: t('navigation.news'), href: '/news' },
    { name: t('navigation.contact'), href: '/contact' },
  ];
  
  return (
    <Disclosure as="header" className="sticky top-0 z-40">
      {({ open, close }: { open: boolean; close: () => void }) => (
        <>
          <a href="#main-content" className="skip-link">
            {t('actions.skipToContent')}
          </a>

          {/* Search Modal Overlay */}
          {isSearchOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-start justify-center pt-20 px-4"
              onClick={closeSearch}
            >
              <div 
                className="w-full max-w-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Search Box */}
                <div className="bg-white rounded-lg shadow-2xl">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="flex items-center border-b border-neutral-200 p-6">
                      <MagnifyingGlassIcon className="w-6 h-6 text-neutral-400 flex-shrink-0" />
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search policies, publications, news, and more..."
                        className="flex-1 ml-4 text-lg outline-none"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={closeSearch}
                        className="ml-4 p-2 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <XMarkIcon className="w-6 h-6 text-neutral-600" />
                      </button>
                    </div>
                  </form>

                  {/* Search Results */}
                  {searchQuery && (
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        <div className="p-4">
                          {Object.entries(
                            searchResults.reduce((acc: any, result) => {
                              if (!acc[result.category]) {
                                acc[result.category] = [];
                              }
                              acc[result.category].push(result);
                              return acc;
                            }, {})
                          ).map(([category, items]: [string, any]) => (
                            <div key={category} className="mb-6 last:mb-0">
                              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-2">
                                {category}
                              </h3>
                              <div className="space-y-1">
                                {items.map((item: any, idx: number) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleResultClick(item.link)}
                                    className="w-full text-left px-4 py-3 hover:bg-primary-50 rounded-lg transition-colors group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <div className="text-neutral-900 font-medium group-hover:text-primary-600">
                                          {item.title}
                                        </div>
                                        <div className="text-sm text-neutral-500 mt-1">
                                          {item.type}
                                        </div>
                                      </div>
                                      <svg 
                                        className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-neutral-500">
                          <div className="text-lg mb-2">No results found</div>
                          <div className="text-sm">Try adjusting your search query</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Search Tips */}
                  {!searchQuery && (
                    <div className="p-6 text-sm text-neutral-500">
                      <div className="font-medium text-neutral-700 mb-2">Quick search tips:</div>
                      <ul className="space-y-1 ml-4">
                        <li>• Search for policies, publications, or news articles</li>
                        <li>• Browse by focus area or country</li>
                        <li>• Use keywords to find specific topics</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Close hint */}
                <div className="text-center mt-4 text-neutral-400 text-sm">
                  Press ESC or click outside to close
                </div>
              </div>
            </div>
          )}
          
          {/* Top Bar */}
          <div className="bg-neutral-900 text-neutral-300 overflow-hidden">
            <div className="container-custom">
              <div className="flex h-10 justify-between items-center">
                <div className="flex items-center text-sm min-w-0 flex-1 overflow-hidden">
                  <span className="font-medium text-white flex-shrink-0 mr-2">Updates:</span>
                  <div className="relative flex-1 overflow-hidden h-5">
                    {updates.map((update, index) => (
                      <Link
                        key={index}
                        to={update.link}
                        className="absolute top-0 left-0 w-full whitespace-nowrap hover:text-white transition-all duration-500 ease-in-out overflow-hidden text-ellipsis"
                        style={{
                          transform: `translateY(${(index - currentUpdateIndex) * 100}%)`,
                          opacity: index === currentUpdateIndex ? 1 : 0,
                        }}
                      >
                        {update.text}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-3 flex-shrink-0 ml-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="text-neutral-400 hover:text-white transition-colors focus-ring rounded"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Header */}
          <div className="bg-white shadow-sm">
            <div className="container-custom">
            <div className="flex h-20 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center focus-ring rounded-md">
                  <span className="text-2xl md:text-3xl font-extrabold text-primary-600 tracking-tight">AICTiG</span>
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
                {/* Search Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors focus-ring"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
                
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
          </div>
          
          {/* Mobile menu */}
          <Disclosure.Panel className="lg:hidden border-t border-neutral-200 bg-white" onClick={() => close()}>
            <div className="space-y-1 px-4 pb-3 pt-2" onClick={(e) => e.stopPropagation()}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => close()}
                  className="block px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Social Media Icons - Mobile */}
              <div className="pt-4 mt-4 border-t border-neutral-200">
                <div className="flex items-center justify-center space-x-6 px-3 py-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="text-neutral-600 hover:text-primary-600 transition-colors focus-ring rounded"
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
