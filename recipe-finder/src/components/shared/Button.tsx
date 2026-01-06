import React from 'react';
import './Button.css'

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant: 'primary' | 'secondary';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    variant = 'primary',
    disabled = false
}) => {
    return (
        <button className={`button button-${variant}`}
            onClick={onClick}
            disabled={disabled}>
        {children}

        </button>
    );
};

export default Button;
