import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ScaleIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  MapIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Seo from '../components/Seo';

export default function Consultancy() {
  const { t } = useTranslation(['common']);

  const services = [
    {
      id: 'policy-development',
      title: t('consultancy.services.policyDevelopment.title'),
      description: t('consultancy.services.policyDevelopment.description'),
      icon: DocumentTextIcon,
      features: [
        t('consultancy.services.policyDevelopment.feature1'),
        t('consultancy.services.policyDevelopment.feature2'),
        t('consultancy.services.policyDevelopment.feature3'),
      ],
    },
    {
      id: 'legal-analysis',
      title: t('consultancy.services.legalAnalysis.title'),
      description: t('consultancy.services.legalAnalysis.description'),
      icon: ScaleIcon,
      features: [
        t('consultancy.services.legalAnalysis.feature1'),
        t('consultancy.services.legalAnalysis.feature2'),
        t('consultancy.services.legalAnalysis.feature3'),
      ],
    },
    {
      id: 'legal-drafting',
      title: t('consultancy.services.legalDrafting.title'),
      description: t('consultancy.services.legalDrafting.description'),
      icon: DocumentTextIcon,
      features: [
        t('consultancy.services.legalDrafting.feature1'),
        t('consultancy.services.legalDrafting.feature2'),
        t('consultancy.services.legalDrafting.feature3'),
      ],
    },
    {
      id: 'regulatory-compliance',
      title: t('consultancy.services.regulatoryCompliance.title'),
      description: t('consultancy.services.regulatoryCompliance.description'),
      icon: ClipboardDocumentCheckIcon,
      features: [
        t('consultancy.services.regulatoryCompliance.feature1'),
        t('consultancy.services.regulatoryCompliance.feature2'),
        t('consultancy.services.regulatoryCompliance.feature3'),
      ],
    },
    {
      id: 'data-protection-training',
      title: t('consultancy.services.dataProtectionTraining.title'),
      description: t('consultancy.services.dataProtectionTraining.description'),
      icon: ShieldCheckIcon,
      features: [
        t('consultancy.services.dataProtectionTraining.feature1'),
        t('consultancy.services.dataProtectionTraining.feature2'),
        t('consultancy.services.dataProtectionTraining.feature3'),
      ],
    },
    {
      id: 'mapping-studies',
      title: t('consultancy.services.mappingStudies.title'),
      description: t('consultancy.services.mappingStudies.description'),
      icon: MapIcon,
      features: [
        t('consultancy.services.mappingStudies.feature1'),
        t('consultancy.services.mappingStudies.feature2'),
        t('consultancy.services.mappingStudies.feature3'),
      ],
    },
    {
      id: 'policy-evaluation',
      title: t('consultancy.services.policyEvaluation.title'),
      description: t('consultancy.services.policyEvaluation.description'),
      icon: ChartBarIcon,
      features: [
        t('consultancy.services.policyEvaluation.feature1'),
        t('consultancy.services.policyEvaluation.feature2'),
        t('consultancy.services.policyEvaluation.feature3'),
      ],
    },
    {
      id: 'awareness-training',
      title: t('consultancy.services.awarenessTraining.title'),
      description: t('consultancy.services.awarenessTraining.description'),
      icon: AcademicCapIcon,
      features: [
        t('consultancy.services.awarenessTraining.feature1'),
        t('consultancy.services.awarenessTraining.feature2'),
        t('consultancy.services.awarenessTraining.feature3'),
      ],
    },
    {
      id: 'electronic-evidence',
      title: t('consultancy.services.electronicEvidence.title'),
      description: t('consultancy.services.electronicEvidence.description'),
      icon: DocumentTextIcon,
      features: [
        t('consultancy.services.electronicEvidence.feature1'),
        t('consultancy.services.electronicEvidence.feature2'),
        t('consultancy.services.electronicEvidence.feature3'),
      ],
    },
    {
      id: 'breach-management',
      title: t('consultancy.services.breachManagement.title'),
      description: t('consultancy.services.breachManagement.description'),
      icon: ExclamationTriangleIcon,
      features: [
        t('consultancy.services.breachManagement.feature1'),
        t('consultancy.services.breachManagement.feature2'),
        t('consultancy.services.breachManagement.feature3'),
      ],
    },
  ];

  return (
    <>
      <Seo
        title={t('consultancy.meta.title')}
        description={t('consultancy.meta.description')}
      />
      <main className="bg-neutral-50 min-h-screen">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-secondary-600 to-primary-600 text-white py-20">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('consultancy.hero.title')}
            </h1>
            <p className="text-xl text-neutral-50 max-w-3xl leading-relaxed">
              {t('consultancy.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                {t('consultancy.overview.title')}
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                {t('consultancy.overview.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md p-8 border border-neutral-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-neutral-600">
                            <svg
                              className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
              {t('consultancy.whyChoose.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {t('consultancy.whyChoose.expertise.title')}
                </h3>
                <p className="text-neutral-600">
                  {t('consultancy.whyChoose.expertise.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapIcon className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {t('consultancy.whyChoose.regional.title')}
                </h3>
                <p className="text-neutral-600">
                  {t('consultancy.whyChoose.regional.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartBarIcon className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {t('consultancy.whyChoose.evidenceBased.title')}
                </h3>
                <p className="text-neutral-600">
                  {t('consultancy.whyChoose.evidenceBased.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('consultancy.cta.title')}
            </h2>
            <p className="text-lg text-neutral-50 max-w-2xl mx-auto mb-8">
              {t('consultancy.cta.description')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-primary-600 transition-all"
            >
              {t('consultancy.cta.button')}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
