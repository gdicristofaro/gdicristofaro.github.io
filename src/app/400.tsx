import Link from 'next/link';
import React from 'react'

/**
 * simple error page
 */
export default () => (
    <div style={{ marginBottom: "500px" }}>
        <h1>There was an error</h1>
        <p>Click <Link href="/">here</Link> to go back to the main page</p>
    </div>);