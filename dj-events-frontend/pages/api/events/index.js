const { events } = require('./data.json');
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(events);
  } else {
    /**
     *! res.setHeader() is a native method of Node.js
     *! res.setHeader() allows you only to set a singular header
     *! and res.header() will allow you to set multiple headers.
     **  e.g:
     **   res.setHeader('content-type', 'application/json');
     **   res.set({
     **    'content-type': 'application/json',
     **    'content-length': '100',
     **    'warning': "with content type charset encoding will be added by default"
     **   });
     */
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}
