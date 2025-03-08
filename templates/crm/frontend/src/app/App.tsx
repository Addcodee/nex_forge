import { Suspense } from "react";
import AppRouter from "./router/AppRouter";
import { Spin } from "antd";
import { FaSpinner } from "react-icons/fa";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="loader-suspense">
          <Spin>
            <FaSpinner />
          </Spin>
        </div>
      }
    >
      <AppRouter />
    </Suspense>
  );
};

export default App;
