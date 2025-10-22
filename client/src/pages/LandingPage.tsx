import Navbar from '../components/Navbar'

function LandingPage() {
  return (
    <div
      style={{
        backgroundImage: "url('/src/assets/Background.png')",
        height: '100vh',
        width : '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
    <Navbar />
    </div>
  );
}

export default LandingPage;
