import {makeEnvPublic} from "next-runtime-env";

makeEnvPublic([
  'API_HOST',
  'API_REST_ENDPOINT',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
