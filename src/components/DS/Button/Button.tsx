import React from "react";

import './Button.scss';

interface Props {
    color: string;
    children?: React.ReactNode;
    type?: string;
    disabled?: boolean;
    size?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export const Button: React.FC<Props> = ({
    color,
    children,
    type,
    disabled = false,
    size,
    onClick,
}) => {
    return (
        <button
            className={
            "btn" + (color ? " btn__" + color : "") + (size ? " " + size : "")
            }
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;