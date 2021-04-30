import React from 'react';
import "./button.css";
import Button from '@material-ui/core/Button';

const STYLES = [
    "btn--primary--solid",
    "btn--warning--solid",
    "btn--danger--solid",
    "btn--success--solid",
    "btn--primary--outline",
    "btn--warming--outline",
    "btn--danger--outline",
    "btn--success--outline",
]

const SIZES = [
    "btn--medium",
    "btn--small"
];

export const OwnButton = ({
    children,
    type,
    onclick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize)
        ? buttonSize
        : SIZES[0];
    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                className={'btn ${checkButtonStyles} ${checkButtonSize}'}
                onClick={onclick}
            >
                {children}
            </Button>

        </div>
    );
};
