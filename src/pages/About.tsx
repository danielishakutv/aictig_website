import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom'; // Hidden until team thumbnails are restored
import {
  AcademicCapIcon,
  GlobeAltIcon,
  LightBulbIcon,
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

  /* Team members data - hidden until proper team info is available
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Anaya Okafor',
      role: 'Executive Director',
      bio: 'Leading cybersecurity policy research and African digital governance initiatives.',
    },
    {
      id: 2,
      name: 'Prof. Kwame Mensah',
      role: 'Head of Research',
      bio: 'Expert in AI governance and digital policy frameworks across Africa.',
    },
    {
      id: 3,
      name: 'Dr. Fatima Al-Rashid',
      role: 'Policy Lead',
      bio: 'Specializes in cybersecurity legislation and regulatory compliance.',
    },
    {
      id: 4,
      name: 'James Osei',
      role: 'Senior Research Fellow',
      bio: 'Focuses on data protection and privacy frameworks for African nations.',
    },
    {
      id: 5,
      name: 'Dr. Amina Hassan',
      role: 'Consultant - Capacity Building',
      bio: 'Leads training programs and stakeholder engagement initiatives.',
    },
    {
      id: 6,
      name: 'Marcus Juma',
      role: 'Communications Director',
      bio: 'Manages publications and knowledge dissemination across the continent.',
    },
  ];
  */

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

        {/* Team section */}
        <section className="py-16 bg-neutral-100">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              {t('about:team.title')}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12 max-w-3xl mx-auto text-center">
              <p className="text-lg text-neutral-700 leading-relaxed">
                Our team comprises seasoned professionals and experts from diverse industries including cybersecurity, telecommunications, law, public policy, academia, and technology. With deep expertise spanning research, regulatory affairs, capacity building, and digital governance, our multidisciplinary team is committed to advancing cybersecurity and ICT governance across Africa.
              </p>
            </div>
            {/* Team member thumbnails hidden until proper team info is available
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => {
                const initials = member.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase();
                
                return (
                  <Link
                    key={member.id}
                    to={`/experts/${member.id}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow focus-ring rounded"
                  >
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white opacity-90 group-hover:opacity-100 transition-opacity">
                        {initials}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-primary-600 font-semibold text-sm mb-3">
                        {member.role}
                      </p>
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            */}
          </div>
        </section>
      </main>
    </>
  );
}
