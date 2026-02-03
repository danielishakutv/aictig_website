import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Seo from '../components/Seo';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  email?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Anaya Okafor',
    role: 'Executive Director',
    bio: 'Leading cybersecurity policy research and African digital governance initiatives. Dr. Okafor brings over 15 years of experience in policy analysis, research strategy, and institutional leadership across the African continent.',
    expertise: [
      'Cybersecurity Policy',
      'Digital Governance',
      'African ICT Regulation',
      'Research Strategy',
      'Institutional Leadership',
      'Policy Analysis'
    ],
    email: 'anaya@aictig.org',
    social: {
      linkedin: 'https://linkedin.com/in/anaya-okafor',
      twitter: 'https://x.com/anayaokafor'
    }
  },
  {
    id: 2,
    name: 'Prof. Kwame Mensah',
    role: 'Head of Research',
    bio: 'Expert in AI governance and digital policy frameworks across Africa. Prof. Mensah has published extensively on emerging technologies, regulatory innovation, and the governance of artificial intelligence in developing economies.',
    expertise: [
      'AI Governance',
      'Digital Policy',
      'Technology Regulation',
      'Research Methodology',
      'Technology Ethics',
      'African Innovation'
    ],
    email: 'kwame@aictig.org',
    social: {
      linkedin: 'https://linkedin.com/in/kwame-mensah',
      twitter: 'https://x.com/kmmensah'
    }
  },
  {
    id: 3,
    name: 'Dr. Fatima Al-Rashid',
    role: 'Policy Lead',
    bio: 'Specializes in cybersecurity legislation and regulatory compliance. Dr. Al-Rashid works closely with governments and international organizations to develop and implement effective cybersecurity frameworks.',
    expertise: [
      'Cybersecurity Legislation',
      'Regulatory Compliance',
      'Legal Frameworks',
      'Risk Assessment',
      'Standards Development',
      'Policy Implementation'
    ],
    email: 'fatima@aictig.org',
    social: {
      linkedin: 'https://linkedin.com/in/fatima-rashid',
      twitter: 'https://x.com/fatimaralrashid'
    }
  },
  {
    id: 4,
    name: 'James Osei',
    role: 'Senior Research Fellow',
    bio: 'Focuses on data protection and privacy frameworks for African nations. James conducts in-depth research on privacy regulations, data governance, and the rights of digital citizens across the continent.',
    expertise: [
      'Data Protection',
      'Privacy Frameworks',
      'Digital Rights',
      'Regulatory Analysis',
      'Stakeholder Engagement',
      'Research Analysis'
    ],
    email: 'james@aictig.org',
    social: {
      linkedin: 'https://linkedin.com/in/james-osei',
      twitter: 'https://x.com/jamesoseidata'
    }
  },
  {
    id: 5,
    name: 'Dr. Amina Hassan',
    role: 'Consultant - Capacity Building',
    bio: 'Leads training programs and stakeholder engagement initiatives. Dr. Hassan designs and delivers innovative capacity-building programs tailored to the needs of African governments and institutions.',
    expertise: [
      'Capacity Building',
      'Training Development',
      'Stakeholder Engagement',
      'Program Design',
      'Adult Learning',
      'Organizational Development'
    ],
    email: 'amina@aictig.org',
    social: {
      linkedin: 'https://linkedin.com/in/amina-hassan',
      twitter: 'https://x.com/aminahassan'
    }
  },
  {
    id: 6,
    name: 'Marcus Juma',
    role: 'Communications Director',
    bio: 'Manages publications and knowledge dissemination across the continent. Marcus oversees the institute\'s communications strategy, content creation, and public engagement initiatives.',
    expertise: [
      'Communications Strategy',
      'Knowledge Dissemination',
      'Content Creation',
      'Media Relations',
      'Digital Marketing',
      'Public Engagement'
    ],
    email: 'marcus@aictig.org',
    social: {
      linkedin: 'https://linkedin.com/in/marcus-juma',
      twitter: 'https://x.com/marcusjuma'
    }
  }
];

export default function Expert() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const expert = teamMembers.find(member => member.id === parseInt(id || '0'));
  
  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Expert not found</h1>
          <Link to="/about" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  const initials = expert.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <>
      <Seo title={expert.name} description={`${expert.role} at AICTiG`} />
      
      <main>
        {/* Back Button */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-custom py-4">
            <button
              onClick={() => navigate('/about')}
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium focus-ring rounded px-2 py-1"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Team
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 md:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Avatar */}
              <div className="flex justify-center md:justify-start">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-lg shadow-lg bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center overflow-hidden">
                  <span className="text-7xl md:text-8xl font-bold text-white opacity-90">
                    {initials}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
                  {expert.name}
                </h1>
                <p className="text-2xl text-primary-600 font-semibold mb-6">
                  {expert.role}
                </p>
                
                <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                  {expert.bio}
                </p>

                {/* Contact */}
                <div className="flex flex-wrap gap-4">
                  {expert.email && (
                    <a
                      href={`mailto:${expert.email}`}
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus-ring font-medium"
                    >
                      <EnvelopeIcon className="h-5 w-5 mr-2" />
                      Contact
                    </a>
                  )}
                  {expert.social?.linkedin && (
                    <a
                      href={expert.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors focus-ring font-medium"
                    >
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {expert.social?.twitter && (
                    <a
                      href={expert.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors focus-ring font-medium"
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                        <path d="M18.244 2H21l-6.409 7.323L22 22h-6.828l-4.767-6.215L4.8 22H2l6.878-7.86L2 2h6.999l4.309 5.646L18.244 2Zm-1.196 18h1.802L7.057 4H5.13l11.918 16Z" />
                      </svg>
                      X
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Areas of Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expert.expertise.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-primary-50 rounded-lg border border-primary-200"
                >
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0" />
                  <span className="text-neutral-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Experts Section */}
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-neutral-900 mb-12">Meet the Rest of Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers
                .filter(member => member.id !== expert.id)
                .map(member => {
                  const memberInitials = member.name
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
                      <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                        <span className="text-5xl font-bold text-white opacity-90">
                          {memberInitials}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-primary-600 font-semibold text-sm mb-3">
                          {member.role}
                        </p>
                        <p className="text-neutral-600 text-sm line-clamp-2">
                          {member.bio}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
