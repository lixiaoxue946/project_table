// pm stop
import React from 'react';
import PageTag from './pmStop.css';

const PmStop = props => {
    
    return <PageTag>
        <div className="pmStop_left" onClick={()=>window.location.hash = '/standard'}>STANDARD CONTROL</div>
        <div onClick={()=>window.location.hash = '/pm'}>FAB PM CONTROL</div>
        <div onClick={()=>window.location.hash = '/transferStation'}>审核清单</div>
    </PageTag> 
}
export default PmStop