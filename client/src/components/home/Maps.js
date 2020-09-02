import React from 'react'

const Maps = ({refProp}) => {
    return (
        <div >
            <h1 >MAPS</h1>
            <div className="map"></div>
            <div ref={refProp}></div>
        </div>
    )
}

export default Maps
