import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LanguageIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 focus-ring">
          <LanguageIcon className="w-5 h-5 mr-2" aria-hidden="true" />
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
          <ChevronDownIcon className="w-4 h-4 ml-2" aria-hidden="true" />
        </Menu.Button>
      </div>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map((lang) => (
              <Menu.Item key={lang.code}>
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={() => changeLanguage(lang.code)}
                    className={`${
                      active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700'
                    } ${
                      lang.code === i18n.language ? 'bg-primary-50 text-primary-700 font-medium' : ''
                    } group flex w-full items-center px-4 py-2 text-sm`}
                  >
                    <span className="mr-3">{lang.nativeName}</span>
                    {lang.code === i18n.language && (
                      <span className="ml-auto text-primary-600">✓</span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
