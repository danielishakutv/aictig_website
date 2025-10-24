import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { useUi } from '../context/UiContext';

export default function Contact() {
  const { t } = useTranslation('contact');
  const { addToast } = useUi();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast('success', t('success.message'));
      setFormData({ name: '', email: '', topic: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <>
      <Seo title={t('title')} />
      <main className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-neutral-600 mb-12">{t('subtitle')}</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                {t('form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
                placeholder={t('form.namePlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                {t('form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
                placeholder={t('form.emailPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-neutral-700 mb-2">
                {t('form.topic')}
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">{t('form.topicPlaceholder')}</option>
                <option value="general">{t('topics.general')}</option>
                <option value="research">{t('topics.research')}</option>
                <option value="training">{t('topics.training')}</option>
                <option value="partnership">{t('topics.partnership')}</option>
                <option value="media">{t('topics.media')}</option>
                <option value="technical">{t('topics.technical')}</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                {t('form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="input"
                placeholder={t('form.messagePlaceholder')}
              />
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full"
            >
              {submitting ? t('form.submitting') : t('form.submit')}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
