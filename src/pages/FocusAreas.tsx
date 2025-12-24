import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  CpuChipIcon,
  ShieldCheckIcon,
  SignalIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  BuildingLibraryIcon,
  RocketLaunchIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import Seo from '../components/Seo';

export default function FocusAreas() {
  const { t } = useTranslation(['common']);

  const focusAreas = [
    {
      id: 'artificial-intelligence',
      title: t('focusAreas.ai.title'),
      description: t('focusAreas.ai.description'),
      icon: CpuChipIcon,
      color: 'primary',
    },
    {
      id: 'autonomous-weapons',
      title: t('focusAreas.autonomousWeapons.title'),
      description: t('focusAreas.autonomousWeapons.description'),
      icon: ShieldCheckIcon,
      color: 'danger',
    },
    {
      id: 'broadband-policy',
      title: t('focusAreas.broadband.title'),
      description: t('focusAreas.broadband.description'),
      icon: SignalIcon,
      color: 'secondary',
    },
    {
      id: '5g',
      title: t('focusAreas.5g.title'),
      description: t('focusAreas.5g.description'),
      icon: SignalIcon,
      color: 'accent',
    },
    {
      id: 'cybersecurity',
      title: t('focusAreas.cybersecurity.title'),
      description: t('focusAreas.cybersecurity.description'),
      icon: ShieldCheckIcon,
      color: 'primary',
    },
    {
      id: 'critical-infrastructure',
      title: t('focusAreas.criticalInfrastructure.title'),
      description: t('focusAreas.criticalInfrastructure.description'),
      icon: BuildingLibraryIcon,
      color: 'danger',
    },
    {
      id: 'cyberwarfare',
      title: t('focusAreas.cyberwarfare.title'),
      description: t('focusAreas.cyberwarfare.description'),
      icon: ShieldCheckIcon,
      color: 'danger',
    },
    {
      id: 'child-protection',
      title: t('focusAreas.childProtection.title'),
      description: t('focusAreas.childProtection.description'),
      icon: UserGroupIcon,
      color: 'accent',
    },
    {
      id: 'cryptocurrencies',
      title: t('focusAreas.crypto.title'),
      description: t('focusAreas.crypto.description'),
      icon: CurrencyDollarIcon,
      color: 'accent',
    },
    {
      id: 'data-protection',
      title: t('focusAreas.dataProtection.title'),
      description: t('focusAreas.dataProtection.description'),
      icon: ShieldCheckIcon,
      color: 'primary',
    },
    {
      id: 'digital-sovereignty',
      title: t('focusAreas.digitalSovereignty.title'),
      description: t('focusAreas.digitalSovereignty.description'),
      icon: GlobeAltIcon,
      color: 'secondary',
    },
    {
      id: 'digital-identity',
      title: t('focusAreas.digitalIdentity.title'),
      description: t('focusAreas.digitalIdentity.description'),
      icon: UserGroupIcon,
      color: 'primary',
    },
    {
      id: 'digital-trade',
      title: t('focusAreas.digitalTrade.title'),
      description: t('focusAreas.digitalTrade.description'),
      icon: GlobeAltIcon,
      color: 'accent',
    },
    {
      id: 'ecommerce',
      title: t('focusAreas.ecommerce.title'),
      description: t('focusAreas.ecommerce.description'),
      icon: CurrencyDollarIcon,
      color: 'secondary',
    },
    {
      id: 'electronic-evidence',
      title: t('focusAreas.electronicEvidence.title'),
      description: t('focusAreas.electronicEvidence.description'),
      icon: DocumentTextIcon,
      color: 'primary',
    },
    {
      id: 'digital-taxation',
      title: t('focusAreas.digitalTaxation.title'),
      description: t('focusAreas.digitalTaxation.description'),
      icon: CurrencyDollarIcon,
      color: 'secondary',
    },
    {
      id: 'telecommunications',
      title: t('focusAreas.telecom.title'),
      description: t('focusAreas.telecom.description'),
      icon: SignalIcon,
      color: 'primary',
    },
    {
      id: 'tech-human-rights',
      title: t('focusAreas.techRights.title'),
      description: t('focusAreas.techRights.description'),
      icon: ScaleIcon,
      color: 'accent',
    },
    {
      id: 'space-policy',
      title: t('focusAreas.space.title'),
      description: t('focusAreas.space.description'),
      icon: RocketLaunchIcon,
      color: 'secondary',
    },
    {
      id: 'regional-integration',
      title: t('focusAreas.regionalIntegration.title'),
      description: t('focusAreas.regionalIntegration.description'),
      icon: LinkIcon,
      color: 'primary',
    },
    {
      id: 'international-cooperation',
      title: t('focusAreas.intlCooperation.title'),
      description: t('focusAreas.intlCooperation.description'),
      icon: GlobeAltIcon,
      color: 'secondary',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; icon: string; hover: string; border: string }> = {
      primary: {
        bg: 'bg-primary-50',
        icon: 'text-primary-600',
        hover: 'hover:border-primary-300',
        border: 'border-primary-200',
      },
      secondary: {
        bg: 'bg-secondary-50',
        icon: 'text-secondary-600',
        hover: 'hover:border-secondary-300',
        border: 'border-secondary-200',
      },
      accent: {
        bg: 'bg-accent-50',
        icon: 'text-accent-600',
        hover: 'hover:border-accent-300',
        border: 'border-accent-200',
      },
      danger: {
        bg: 'bg-danger-50',
        icon: 'text-danger-600',
        hover: 'hover:border-danger-300',
        border: 'border-danger-200',
      },
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <>
      <Seo
        title={t('focusAreas.meta.title')}
        description={t('focusAreas.meta.description')}
      />
      <main className="bg-neutral-50 min-h-screen">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('focusAreas.hero.title')}
            </h1>
            <p className="text-xl text-neutral-50 max-w-3xl leading-relaxed">
              {t('focusAreas.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Focus Areas Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.map((area) => {
                const colors = getColorClasses(area.color);
                return (
                  <Link
                    key={area.id}
                    to={`/focus-areas/${area.id}`}
                    className={`bg-white rounded-lg shadow-md p-6 border-2 ${colors.border} ${colors.hover} transition-all hover:shadow-lg group`}
                  >
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <area.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {area.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary-600 text-sm font-medium">
                      {t('focusAreas.learnMore')}
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              {t('focusAreas.cta.title')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              {t('focusAreas.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/publications"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                {t('focusAreas.cta.publications')}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors"
              >
                {t('focusAreas.cta.contact')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
