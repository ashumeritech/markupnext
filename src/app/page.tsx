import Image from "next/image";
import styles from "./page.module.css";
import { Bounce, ToastContainer } from 'react-toastify';
import Body from "@/shared/Body/Body";
import { StoreProvider } from "@/contexts/StoreProvider";
import { Suspense } from "react";


export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreProvider>
        <ToastContainer transition={Bounce} />
        <App />
      </StoreProvider>
    </Suspense>
  );
}

function App() {
  return (
    <div>
      <Body />
    </div>
  );
}

