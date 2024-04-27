"use client"
import { useEffect, useState } from 'react';
export default function Test() {
    const [data, setData] = useState<any>(null);
    useEffect(() => { 
        fetch('/api/test')
        .then(response => response.json())
        .then(data => setData(data));
      }, []);
    return (
        <div>
      <div> Hello </div>
      <div> {data?.message} </div>
      </div>
       
    );
  }