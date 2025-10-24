import Background from '../assets/Background.png';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Navbar />
    </div>
  );
}

export default LandingPage;
