export default function loggerMiddleware(req, res, next) {
  const { method, url, body, query } = req;
  console.log(`\n[${new Date().toISOString()}] ${method} ${url}`);
  if (Object.keys(query).length) console.log('Query:', query);
  if (Object.keys(body).length) console.log('Body:', body);
  next();
}