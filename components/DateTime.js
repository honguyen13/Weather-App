import React, {useEffect, useState} from 'react'
import {Text} from 'react-native';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DateTime = ({style}) => {
    const [date, setDate] = useState('')
    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const date = time.getDate();
            const month = time.getMonth();
            const year = time.getFullYear();
            setDate(months[month] + ' ' + date +', '+ year) 
        }, 1000);
    }, [date])
    return <Text style={style}>{date}</Text>
}

export default DateTime;