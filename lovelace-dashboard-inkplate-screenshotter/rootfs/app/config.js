function getEnvironmentVariable(key, suffix, fallbackValue) {
  const value = process.env[key + suffix];
  if (value !== undefined) return value;
  return fallbackValue || process.env[key];
}

function getPagesConfig() {
  const pages = [];
  let i = 0;
  while (++i) {
    const suffix = i === 1 ? "" : `_${i}`;
    const screenShotUrl = process.env[`HA_SCREENSHOT_URL${suffix}`];
    if (!screenShotUrl) return pages;
    pages.push({
      screenShotUrl,
      outputPath: getEnvironmentVariable(
        "OUTPUT_PATH",
        suffix,
        `output/cover${suffix}.${process.env.IMAGE_FORMAT || "png"}`
      ),
      renderingDelay: getEnvironmentVariable("RENDERING_DELAY", suffix) || 0,
      renderingScreenSize: {
        height:
          getEnvironmentVariable("RENDERING_SCREEN_HEIGHT", suffix) || 448,
        width:
          getEnvironmentVariable("RENDERING_SCREEN_WIDTH", suffix) || 600,
      },
      rotation: getEnvironmentVariable("ROTATION", suffix) || 0,
      scaling: getEnvironmentVariable("SCALING", suffix) || 1,
    });
  }
  return pages;
}

module.exports = {
  baseUrl: process.env.HA_BASE_URL,
  accessToken: process.env.HA_ACCESS_TOKEN,
  cronJob: process.env.CRON_JOB || "* * * * *",
  useImageMagick: process.env.USE_IMAGE_MAGICK === "true",
  pages: getPagesConfig(),
  port: process.env.PORT || 5006,
  renderingTimeout: process.env.RENDERING_TIMEOUT || 10000,
  imageFormat: process.env.IMAGE_FORMAT || "png",
  language: process.env.LANGUAGE || "en",
  debug: process.env.DEBUG === "true",
  ignoreCertificateErrors:
    process.env.UNSAFE_IGNORE_CERTIFICATE_ERRORS === "true",
};