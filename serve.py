#!/usr/bin/env python3
"""Serve this extracted release; never open a different server already on the port."""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit
import argparse
import json
import os
import socket
import webbrowser

ROOT = Path(__file__).resolve().parent
BUILD = json.loads((ROOT / 'release.json').read_text(encoding='utf-8'))['build']
PREFIX = '/house-3d-' + BUILD + '/'

class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.js': 'text/javascript', '.mjs': 'text/javascript'}

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('X-House-3D-Build', BUILD)
        super().end_headers()

    def _release_path(self):
        if urlsplit(self.path).path in ('', '/'):
            self.send_response(302)
            self.send_header('Location', PREFIX)
            self.end_headers()
            return False
        if not self.path.startswith(PREFIX):
            self.send_error(404, 'This URL is not part of the running House 3D release.')
            return False
        self.path = '/' + self.path[len(PREFIX):]
        return True

    def do_GET(self):
        if self._release_path():
            super().do_GET()

    def do_HEAD(self):
        if self._release_path():
            super().do_HEAD()


class ReleaseServer(ThreadingHTTPServer):
    allow_reuse_address = False


def create_server(port):
    handler = partial(Handler, directory=str(ROOT))
    try:
        return ReleaseServer(('0.0.0.0', port), handler)
    except OSError:
        if port == 0:
            raise
        # Keep the existing service untouched. Bind a fresh available port first.
        server = ReleaseServer(('0.0.0.0', 0), handler)
        print(f'Port {port} is unavailable. Using port {server.server_port} for THIS copy.', flush=True)
        return server


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--no-browser', action='store_true', help='Start without opening a browser')
    args = parser.parse_args()
    port = int(os.environ.get('HOUSE_3D_PORT', '8080'))
    server = create_server(port)  # Successful binding MUST precede browser launch.
    url = f'http://localhost:{server.server_port}{PREFIX}'
    print(f'House 3D - {BUILD}\nFolder: {ROOT}\nOpen: {url}', flush=True)
    try:
        ip = socket.gethostbyname(socket.gethostname())
        print(f'Phone on the same Wi-Fi: http://{ip}:{server.server_port}{PREFIX}', flush=True)
    except OSError:
        pass
    if not args.no_browser:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
