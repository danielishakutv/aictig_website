import { useTranslation } from 'react-i18next';
import {
  AcademicCapIcon,
  UsersIcon,
  GlobeAltIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import Seo from '../components/Seo';

export default function About() {
  const { t } = useTranslation(['about', 'common']);

  const missionItems = [
    {
      icon: BeakerIcon,
      title: t('about:mission.research.title'),
      description: t('about:mission.research.description'),
    },
    {
      icon: BuildingLibraryIcon,
      title: t('about:mission.repository.title'),
      description: t('about:mission.repository.description'),
    },
    {
      icon: AcademicCapIcon,
      title: t('about:mission.capacity.title'),
      description: t('about:mission.capacity.description'),
    },
    {
      icon: BookOpenIcon,
      title: t('about:mission.publications.title'),
      description: t('about:mission.publications.description'),
    },
  ];

  return (
    <>
      <Seo
        title={t('about:meta.title')}
        description={t('about:meta.description')}
      />
      <main className="bg-neutral-50 min-h-screen">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about:hero.title')}
            </h1>
            <p className="text-xl text-neutral-50 max-w-3xl leading-relaxed">
              {t('about:hero.subtitle')}
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                {t('about:about.title')}
              </h2>
              <div className="prose prose-lg max-w-none text-neutral-700 space-y-4">
                <p className="leading-relaxed">
                  {t('about:about.paragraph1')}
                </p>
                <p className="leading-relaxed">
                  {t('about:about.paragraph2')}
                </p>
                <p className="leading-relaxed">
                  {t('about:about.paragraph3')}
                </p>
                <p className="leading-relaxed font-medium">
                  {t('about:about.incorporation')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Vision */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg shadow-md p-8 border border-primary-100">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                  <GlobeAltIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  {t('about:vision.title')}
                </h2>
                <p className="text-neutral-700 leading-relaxed text-lg">
                  {t('about:vision.description')}
                </p>
              </div>

              {/* Mission Header */}
              <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-lg shadow-md p-8 border border-secondary-100">
                <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center mb-4">
                  <LightBulbIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  {t('about:mission.title')}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('about:mission.intro')}
                </p>
              </div>
            </div>

            {/* Mission Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missionItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team section placeholder */}
        <section className="py-16 bg-neutral-100">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              {t('about:team.title')}
            </h2>
            <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
              {t('about:team.subtitle')}
            </p>
            <div className="text-center">
              <p className="text-neutral-600">{t('about:team.comingSoon')}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
