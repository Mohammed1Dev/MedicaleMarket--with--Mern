import React from 'react'
import CarouselPage  from "./Slides";

const Container = ({ title, description, className, children }) => {
    return (
        <div>
            <div className=" mt-5 text-center">
                <CarouselPage title={title} description={description}/>
                <h1 className="display-4">{title}</h1>
                <p className="lead">{description}</p>
            </div>
            
            
            <div className={className}>
                
                {children}
            </div>
        </div>
    )
}

export default Container