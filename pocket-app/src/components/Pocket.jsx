import React, { useEffect, useState } from 'react';
import MobileView from './Mobileview.jsx';
import DesktopView from './Desktopview.jsx';

function Pocket() {

    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {isMobileView ? <MobileView /> : <DesktopView />}
        </div>
    );
}

export default Pocket;
