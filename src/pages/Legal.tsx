import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import Markdown from '../components/Markdown';

export default function Legal() {
  const { page } = useParams<{ page: string }>();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/content/${page}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading content:', error);
        setContent('# Error\n\nContent not found.');
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [page]);
  
  const title = page === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  
  return (
    <>
      <Seo title={title} />
      <main className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : (
            <Markdown content={content} />
          )}
        </div>
      </main>
    </>
  );
}
