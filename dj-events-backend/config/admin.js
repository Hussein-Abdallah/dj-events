module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fa255a8332e2c90a3c9f46d49a170fe3'),
  },
});
