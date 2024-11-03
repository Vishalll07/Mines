"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  return (
    <div style={{  textAlign: 'center', padding: '2rem' , height: '37vh', marginTop:'150px' }}>
      <h2 style={{ color: 'black' }}>Hello, Welcome to Minesweeper</h2>
      <input
        type="text"
        placeholder="Enter your name"
        style={{
          marginBottom: '1rem',
          padding: '10px',
          fontSize: '16px',
          border: '2px solid black',
          borderRadius: '8px',
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <Link href={`/gamePage?name=${encodeURIComponent(name)}`}>
        <button
          style={{
            color: 'black',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            border: '2px solid black',
            borderRadius: '10px'
          }}
        >
          Join
        </button>
      </Link>
    </div>
  );
}
