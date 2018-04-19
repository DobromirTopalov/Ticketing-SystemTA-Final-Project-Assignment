const config = (() => {
    /* eslint-disable */
    const PORT = process.env.PORT || 3200;
    /* eslint-enable */
    const JWT_SECRET = 'TelerikAcademy';
    const JWT_ISS = 'telerik';
    const JWT_EXPIRE_TIME = 60*60; // in seconds

    return {
        PORT,
        JWT_SECRET,
        JWT_ISS,
        JWT_EXPIRE_TIME,
    };
})();

module.exports = {
    PORT: config.PORT,
    JWT_SECRET: config.JWT_SECRET,
    JWT_ISS: config.JWT_ISS,
    JWT_EXPIRE_TIME: config.JWT_EXPIRE_TIME,
};
