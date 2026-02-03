import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Replaced image logo with text logo 'AICTiG'

export default function Header() {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);
  const navigate = useNavigate();
  
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
  
  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/aictig',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/company/aictig',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'X',
      url: 'https://x.com/aictig',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M18.244 2H21l-6.409 7.323L22 22h-6.828l-4.767-6.215L4.8 22H2l6.878-7.86L2 2h6.999l4.309 5.646L18.244 2Zm-1.196 18h1.802L7.057 4H5.13l11.918 16Z" />
        </svg>
      )
    },
    {
      name: 'Instagram', 
      url: 'https://instagram.com/aictig',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/0000000000',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.148-.669-1.611-.916-2.205-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.214 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M20.52 3.48A11.804 11.804 0 0012.013 0C5.375 0 .013 5.363.013 12c0 2.116.55 4.182 1.59 6.007L0 24l6.155-1.588A11.93 11.93 0 0012.013 24h.005c6.637 0 12-5.363 12-12 0-3.208-1.25-6.22-3.498-8.52zM12.013 22a9.96 9.96 0 01-5.083-1.393l-.363-.216-3.65.943.974-3.557-.236-.374A9.96 9.96 0 012.013 12c0-5.514 4.486-10 10-10 2.67 0 5.18 1.04 7.062 2.922A9.932 9.932 0 0122.013 12c0 5.514-4.486 10-10 10z" />
        </svg>
      )
    },
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
