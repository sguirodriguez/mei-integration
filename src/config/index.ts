import dotenv from 'dotenv';

dotenv.config();

const config = {
    development: {
        BASE_URL: 'http://localhost:3000/v1',
    },
    production: {
        BASE_URL: process.env.BASE_URL as string,
    },
    projectName: '',
    links: {
        terms:
            '',
        privacy:
            '',
    },
};

export default config;
