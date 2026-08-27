import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SubscribeModal } from './components/SubscribeModal';
import { AuthModal } from './components/AuthModal';
import { Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { PostDetail } from './pages/PostDetail';
import { Plans } from './pages/Plans';
import { Dashboard } from './pages/Dashboard';
import { NewPost } from './pages/NewPost';
import { DatabaseGuide } from './pages/DatabaseGuide';
import { Post } from './services/api';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);

  const handleSelectPost = (post: Post) => {
    setSelectedPostSlug(post.slug);
    setCurrentTab('post-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplorePosts = (categorySlug?: string) => {
    setInitialCategory(categorySlug);
    setCurrentTab('posts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToPlans = () => {
    setCurrentTab('plans');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <Header
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Main Content View */}
        <main style={{ flex: 1 }}>
          {currentTab === 'home' && (
            <Home
              onSelectPost={handleSelectPost}
              onExplorePosts={handleExplorePosts}
              onGoToPlans={handleGoToPlans}
            />
          )}

          {currentTab === 'posts' && (
            <Posts
              onSelectPost={handleSelectPost}
              initialCategory={initialCategory}
            />
          )}

          {currentTab === 'post-detail' && selectedPostSlug && (
            <PostDetail
              postSlug={selectedPostSlug}
              onBack={() => {
                setCurrentTab('posts');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentTab === 'plans' && <Plans />}

          {currentTab === 'dashboard' && (
            <Dashboard
              onSelectPost={handleSelectPost}
              onGoToPlans={handleGoToPlans}
            />
          )}

          {currentTab === 'new-post' && (
            <NewPost
              onPostCreated={() => {
                setCurrentTab('posts');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentTab === 'database' && <DatabaseGuide />}
        </main>

        {/* Modals */}
        <SubscribeModal />
        <AuthModal />

        {/* Footer */}
        <Footer
          onNavigate={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
