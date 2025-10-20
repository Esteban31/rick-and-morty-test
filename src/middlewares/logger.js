export default function loggerMiddleware(req, res, next) {
  const { method, url, body, query } = req;
  console.log(`\n[${new Date().toISOString()}] ${method} ${url}`);

  if (query && Object.keys(query).length > 0) {
    console.log('Query params:', query);
  }

  if (body && Object.keys(body).length > 0) {
    console.log('Body:', body);
  }

  next();
}
