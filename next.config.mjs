/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push(
          {
            test: /\.html$/,
            // This is the asset module.
            type: 'asset/source',
          }
        )
        return config
      },
};

export default nextConfig;
