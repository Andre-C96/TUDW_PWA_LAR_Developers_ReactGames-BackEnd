const getHealthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API funcionando correctamente',
    db_url_exists: process.env.DATABASE_URL ? '✅ Vercel SÍ la ve' : '❌ Vercel NO la ve'
  });
};

module.exports = {
  getHealthCheck,
};