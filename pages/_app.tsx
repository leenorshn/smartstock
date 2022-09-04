import SideBar from "../components/SideBar";
import { store } from "../store";
import { Provider } from "react-redux";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-w-full min-h-screen bg-slate-200">
      <Provider store={store}>
        <div className="flex items-start">
          <SideBar />

          <div className="flex-1 max-w-5xl mx-auto ">
            <Component {...pageProps} />
          </div>
        </div>
      </Provider>
    </div>
  );
}

export default MyApp;
