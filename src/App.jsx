import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <div className="transition duration-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col w-full max-w-[1000px]">
          <div className="min-h-[80px]">
            <Header />
          </div>
          <div className="min-h-[600px]">
            <Body />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
