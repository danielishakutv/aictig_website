import { useTranslation } from 'react-i18next';
import {
  AcademicCapIcon,
  UsersIcon,
  GlobeAltIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Seo from '../components/Seo';

export default function About() {
  const { t } = useTranslation(['about', 'common']);

  const values = [
    {
      icon: ShieldCheckIcon,
      title: t('about:values.integrity.title'),
      description: t('about:values.integrity.description'),
    },
    {
      icon: AcademicCapIcon,
      title: t('about:values.excellence.title'),
      description: t('about:values.excellence.description'),
    },
    {
      icon: UsersIcon,
      title: t('about:values.collaboration.title'),
      description: t('about:values.collaboration.description'),
    },
    {
      icon: LightBulbIcon,
      title: t('about:values.innovation.title'),
      description: t('about:values.innovation.description'),
    },
  ];

  const impact = [
    {
      icon: GlobeAltIcon,
      stat: '15+',
      label: t('about:impact.countries'),
    },
    {
      icon: UsersIcon,
      stat: '50+',
      label: t('about:impact.partners'),
    },
    {
      icon: ChartBarIcon,
      stat: '100+',
      label: t('about:impact.policies'),
    },
    {
      icon: AcademicCapIcon,
      stat: '200+',
      label: t('about:impact.researchers'),
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
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about:hero.title')}
            </h1>
            <p className="text-xl text-primary-50 max-w-3xl">
              {t('about:hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <LightBulbIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  {t('about:mission.title')}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('about:mission.description')}
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <GlobeAltIcon className="w-6 h-6 text-accent-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  {t('about:vision.title')}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('about:vision.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              {t('about:values.title')}
            </h2>
            <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
              {t('about:values.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              {t('about:impact.title')}
            </h2>
            <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
              {t('about:impact.subtitle')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impact.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-lg shadow-md p-6 text-center"
                >
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {item.stat}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team section placeholder */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              {t('about:team.title')}
            </h2>
            <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
              {t('about:team.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-neutral-900">Team Member {i + 1}</h3>
                  <p className="text-sm text-neutral-600">Position</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              {t('about:partners.title')}
            </h2>
            <p className="text-lg text-neutral-600 text-center max-w-2xl mx-auto mb-12">
              {t('about:partners.subtitle')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center aspect-square"
                >
                  <div className="w-full h-full bg-neutral-100 rounded flex items-center justify-center text-neutral-400 text-xs">
                    Logo {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
