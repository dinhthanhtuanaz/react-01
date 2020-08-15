import React, { useState, useEffect } from 'react';

function formatClock(date) {
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
}

function Clock() {
    const [clock, setClock] = useState('');
    let x = 1;
    let y = 1;
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            // HH:mm:ss
            const newClock = formatClock(now);
            setClock(newClock);
            //console.log('x=', x++);
        }, 1000);

        return () => {
            //componentWillUnmount
            console.log('componentWillUnmount OK');
            clearInterval(interval);
        }
    }, []);

    return (
        <div>
            <h2>Clock: {clock}</h2>
            {/* Chỗ này x mãi mãi bằng 1, bởi vì nó render lại, x thì 0 phải state nên 0 thể lưu lại giá trị trước đó */}
            <h3>x={x}, y={y}</h3>
        </div>
    );
}

export default Clock;