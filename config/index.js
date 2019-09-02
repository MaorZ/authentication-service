const roles = process.env.ROELS ? process.env.ROELS.split(',') : ['user', 'admin'];
const privilegedRoles = process.env.PRIVILEGED_ROLES ? process.env.PRIVILEGED_ROLES.split(',') : ['admin'];

module.exports = {
	mongoUri: process.env.MONGO_URI || "mongodb://localhost/auth-service",
	jwtSecret: process.env.JWT_SECRET || "a secret phrase!!",
	refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "a secret 2 phrase!!",
	tokenExpiration: process.env.TOKEN_EXPIRATION || '1h',
	refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '14d',
	resetPasswordTokenExpiration: process.env.RESET_PASSWORD_TOKEN_EXPIRATION || '1h',
	mailProviderService: process.env.MAIL_PROVIDER_SERVICE,
	mailProviderEmail: process.env.MAIL_PROVIDER_EMAIL,
	mailProviderPassword: process.env.MAIL_PROVIDER_PW,
	adminPanelDomain: process.env.ADMIN_PANEL_DOMAIN || 'localhost:3000',
	roles,
	privilegedRoles,
	defaultRole: process.env.DEFAULT_ROLE ? process.env.DEFAULT_ROLE : roles[0],

};
