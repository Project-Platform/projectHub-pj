
import Search from './Component/Search.jsx';
import Navbar from './Component/Navbar.jsx';

function Home() {
  return (
  <div className="flex-col m-2 ">
      <Navbar />
      <div className='m-2'><Search/></div>
    </div>
  );
}

export default Home;
