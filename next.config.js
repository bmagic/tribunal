module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|jpeg)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          }
        ],
      },
    ]
  },
}
