import React, { useState, useEffect } from 'react';
import './Button.css';

function Button({ count, setCount, totalPrice, eventData, setTotalPrice, totalQuantity, setTotalQuantity, ticketPrices }) {
    const [isAddMode, setIsAddMode] = useState(true);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        setIsAddMode(count === 0);
        const currentDate = new Date().toISOString();
        if (eventData.startdate < currentDate) {
            setDisable(true);
        }
    }, [count, eventData]);

    const incrementCount = () => {
        const newCount = count + 1;
        setCount(newCount);
        setTotalPrice(prevTotalPrice => prevTotalPrice + ticketPrices);
        setTotalQuantity(prevTotalQuantity => prevTotalQuantity + 1);
    };

    const decrementCount = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            setTotalPrice(prevTotalPrice => prevTotalPrice - ticketPrices);
            setTotalQuantity(prevTotalQuantity => prevTotalQuantity - 1);
            if (newCount === 0) {
                setIsAddMode(true);
            }
        }
    };

    const handleAddClick = () => {
        const newCount = 1;
        setCount(newCount);
        setTotalPrice(prevTotalPrice => prevTotalPrice + ticketPrices);
        setTotalQuantity(prevTotalQuantity => prevTotalQuantity + 1);
        setIsAddMode(false);
    };

    return (
        <div>
            {isAddMode ? (
                <button
                    onClick={handleAddClick}
                    className="add-button"
                    disabled={disable}
                >
                    ADD
                </button>
            ) : (
                <div className="add-button-group">
                    <button
                        onClick={decrementCount}
                        className="add-button-decrement"
                    >
                        –
                    </button>
                    <button
                        className="add-button-count"
                    >
                        {count}
                    </button>
                    <button
                        onClick={incrementCount}
                        className="add-button-increment"
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

export default Button;
