import { createGlobalStyle } from 'styled-components';

import EvilEmpire from '../assests/fonts/EvilEmpire.otf';

export default createGlobalStyle`
    @font-face {
        font-family: 'EvilEmpire';
        src: local('EvilEmpire'), url(${EvilEmpire}) format('opentype');
        /* font-weight: 300;
        font-style: normal; */
    }

    p {
        margin-bottom: 0;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: white;
        &:hover{ 
            color: white;
        }
    }

    button {
        border: none;
        padding: 0;

        &:disabled {
            opacity: 0.5;
        }
    }
`;