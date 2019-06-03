export default function getRootUrl() {
  // The optional request object `req` only exists server side, `window` is only client side
  // When in development mode, host is always http://localhost:3001
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3001';
  }
  return process.serverHost
    ? `https://${process.serverHost}`
    : `https://${window.location.host}`;
}
