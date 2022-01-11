import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div>
      <div className="transition duration-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white grid grid-cols-1 justify-items-center min-h-screen">
        <div className="flex flex-col w-full max-w-[1000px]">
          <div className="">
            <Header />
          </div>
          <div className="flex-1">
            <Body />
          </div>
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
