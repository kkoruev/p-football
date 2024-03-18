import {ReactNode} from "react";
import Header from "~/components/header/header";


type RootLayoutProps = {
   children: ReactNode;
};


export default function RootLayout({ children }: RootLayoutProps) {
   return (
      <div className="app-container">
         <Header />
         <main>{children}</main>
      </div>
   );
}