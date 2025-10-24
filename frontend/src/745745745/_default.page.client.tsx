import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PageShell } from './PageShell';
import { Header } from '@radix-ui/react-accordion';

export const clientRouting = true;
export const hydrationCanBeAborted = true;

export function render(pageContext: any) {
    const { Page, pageProps } = pageContext;
    const root = document.getElementById('app')!;

    ReactDOM.hydrateRoot(
        root,
        <BrowserRouter>
            <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
            </PageShell>
        </BrowserRouter>
    );
}