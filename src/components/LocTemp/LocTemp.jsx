import { useEffect } from 'react';

export default function LocTemp() { 
    useEffect(() => { 
        console.log('page loaded');
     }, []);
    return '999';    
}