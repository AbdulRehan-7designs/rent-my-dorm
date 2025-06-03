
import LandingHero from '@/components/LandingHero';

const Index = () => {
  const handleLogin = () => {
    // This will be handled by the LandingHero component's navigation
    console.log('Login initiated from landing page');
  };

  return <LandingHero onLogin={handleLogin} />;
};

export default Index;
