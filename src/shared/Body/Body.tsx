import React, { Suspense } from 'react';
import Posts from '@/modules/MainSection/Posts';

const Body: React.FC = () => {
    return (
        <Posts className="posts" />
    );
}

export default Body;