import { NextPage } from 'next';
import { AppProps } from 'next/app';

const BorderRadiusPage: NextPage<AppProps> = ({ Component, pageProps }) => {
    return (
        <div>
            <h1>Welcome to my Next.js app!</h1>
            <Component {...pageProps} />
        </div>
    );
};

export default BorderRadiusPage;
 
