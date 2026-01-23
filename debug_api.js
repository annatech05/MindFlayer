const fetch = require('node-fetch'); // backend has node-fetch? no, it has axios? no, it has native fetch in newer node. 
// Let's use http module to be safe and dependency-free
const http = require('http');

const data = JSON.stringify({
    sessionHistory: [
        { question: "Q1", answer: "A1" }
    ]
});

const options = {
    hostname: 'localhost',
    port: 5001,
    path: '/api/final-judgment',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`BODY: ${body}`);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
