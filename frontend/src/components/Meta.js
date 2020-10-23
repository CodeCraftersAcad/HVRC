import React from 'react';
import {Helmet} from "react-helmet";

const Meta = (title, desc, keywords) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={desc}/>
            <meta name='keyword' content={keyword}/>
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome to High Voltage R/C',
    keywords: 'RC radio control radio-control lipo fast rc cars',
    desc: 'We are the best'
}

export default Meta;