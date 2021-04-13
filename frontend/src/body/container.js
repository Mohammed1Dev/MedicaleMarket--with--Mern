import React from 'react'

const Container = ({ title, description, className, children }) => {
    return (
        <div>
            <div className="text-center pt-5">

                <h1 className="display-4 mt-5">{title}</h1>
                <p className="lead mt-5">{description}</p>
            </div>
            
            
            <div className={className}>
                
                {children}
            </div>
        </div>
    )
}

export default Container