// import React from 'react';
// import { HelmetProvider } from 'react-helmet-async';

// export function PageShell({ children }: { children: React.ReactNode }) {
//     return (
//         <HelmetProvider>
//             {children}
//         </HelmetProvider>
//     );
// }

// import React from 'react';
// import { HelmetProvider } from 'react-helmet-async';

// interface PageShellProps {
//     children: React.ReactNode;
//     pageContext?: any;
// }

// export function PageShell({ children, pageContext }: PageShellProps) {
//     return (
//         <HelmetProvider context={{}}>
//             {children}
//         </HelmetProvider>
//     );
// }

import React from 'react';
import { HeaderSection } from '../screens/3BookingCard/sections/1HeaderSection/HeaderSection';
import { Header } from '../screens/1Main/sections/1HeaderSection/Header';
import { FooterSection } from '../screens/1Main/sections/7FooterSection/footerSection';

export function PageShell({ children, pageContext }: {
    children: React.ReactNode;
    pageContext: any;
}) {
    return (
        <React.StrictMode>
            <Header />
            <main>
                {children}
            </main>
            <FooterSection />
        </React.StrictMode>
    );
}