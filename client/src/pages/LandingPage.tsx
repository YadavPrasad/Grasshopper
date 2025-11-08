import Background from '../assets/Background.png';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        height: '100vh',
        width: '100vw',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'contain',
        backgroundColor: '#e8e8e8',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
    </div>
  );
}

export default LandingPage;
