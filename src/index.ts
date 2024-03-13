import http from 'node:http';

export class HttpMock {
    private server: http.Server = http.createServer((req, res) => {});
    private port: number = 3000;
    public start() {
        this.server = http.createServer((req, res) => {
            // Parsing the URL
            const url = new URL(req.url!, `http://${req.headers.host}`);

            // Mock endpoint
            if (url.pathname === '/mock-endpoint') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'This is a mock response' }));
            } else {
                res.writeHead(404);
                res.end();
            }
        });

        this.server.listen(this.port, () => {
            console.log(`Mock server running at http://localhost:${this.port}`);
        });
    
    }

    public stop() {
        this.server.close();
    }
}