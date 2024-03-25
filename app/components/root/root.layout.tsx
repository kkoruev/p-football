import {ReactNode} from "react";
import Header from "~/components/header/header";


type RootLayoutProps = {
   isLoggedIn: boolean;
   children: ReactNode;
};

export default function RootLayout({ isLoggedIn, children }: RootLayoutProps) {
   return (
      <div className="app-container">
         <Header isLoggedIn={isLoggedIn} />
         <main>{children}</main>
      </div>
   );
}