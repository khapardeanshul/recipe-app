import React from 'react';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, onClick}) => {
    return (
        <div className={`card ${onClick ? 'card-clickable' : ''}`}
            onClick={onClick}>
            {children}
        </div>
    );
}

export default Card;