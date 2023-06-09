'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('Helper');
logger.setLevel('DEBUG');

var path = require('path');
var util = require('util');

var hfc = require('fabric-client');
hfc.setLogger(logger);

async function getClientForOrg(userorg, username) {
	logger.debug('getClientForOrg - ****** START %s %s', userorg, username)
	let config = '-connection-profile-path';
	let client = hfc.loadFromConfig(hfc.getConfigSetting('network' + config));
	client.loadFromConfig(hfc.getConfigSetting(userorg + config));
	await client.initCredentialStores();
	if (username) {
		let user = await client.getUserContext(username, true);
		if (!user) {
			throw new Error(util.format('User was not found :', username));
		} else {
			logger.debug('User %s was found to be registered and enrolled', username);
		}
	}
	logger.debug('getClientForOrg - ****** END %s %s \n\n', userorg, username)

	return client;
}

var getRegisteredUser = async function (username, password, userOrg, isJson) {
	try {
		var client = await getClientForOrg(userOrg);
		logger.debug('Successfully initialized the credential stores');
		var user = await client.getUserContext(username, true);
		var pass = await client.getUserContext(password, true);
		if ((user && user.isEnrolled()) && (pass && pass.isEnrolled())) {
			logger.info('Successfully loaded member from persistence');
		} else {
			logger.info('User %s was not enrolled, so we will need an admin user object to register', username);
			var admins = hfc.getConfigSetting('admins');
			let adminUserObj = await client.setUserContext({ username: admins[0].username, password: admins[0].secret });
			logger.debug('username of ADMIN %s password of ADMIN %s', admins[0].username, admins[0].secret);
			let caClient = client.getCertificateAuthority();
			let secret = await caClient.register({
				enrollmentID: username,
				affiliation: userOrg.toLowerCase() + '.department1',
				attrs: [{ name: 'role', value: 'approver', ecert: true }]
			}, adminUserObj);
			logger.debug('Successfully got the secret for user %s', secret);
			user = await client.setUserContext({ username: username, password: secret, attr_reqs: [{ name: 'role', optional: false }] });
			// user = await client.setUserContext({ username: username, password: secret });
			logger.debug('Successfully enrolled username %s  and setUserContext on the client object', username);
		}
		if (user && user.isEnrolled) {
			if (isJson && isJson === true) {
				var response = {
					success: true,
					secret: user._enrollmentSecret,
					message: username + ' enrolled Successfully',
				};
				return response;
			}
		} else {
			throw new Error('User was not enrolled ');
		}
	} catch (error) {
		logger.error('Failed to get registered user: %s with error: %s', username, error.toString());
		return 'failed ' + error.toString();
	}

};

var isUserRegistered = async function (username, password, userOrg, isJson) {
	try {
		var client = await getClientForOrg(userOrg);
		logger.debug('Successfully initialized the credential stores');
		var user = await client.getUserContext(username, true);
		var pass = await client.getUserContext(password, true);
		if(pass && pass.isEnrolled){
			if (user && user.isEnrolled) {
				if (isJson && isJson === true) {
					var response = {
						success: true,
						secret: user._enrollmentSecret,
						message: username + ' enrolled Successfully',
					};
					return response;
				}
			}
			else {
				throw new Error('User was not enrolled ');
			}
		} else {
			throw new Error('Password was not enrolled ');
		}
	} catch (error) {
		logger.error('Failed to get registered user: %s with error: %s', username, error.toString());
		return 'failed ' + error.toString();
	}

};

var setupChaincodeDeploy = function () {
	process.env.GOPATH = path.join(__dirname, hfc.getConfigSetting('CC_SRC_PATH'));
};

var getLogger = function (moduleName) {
	var logger = log4js.getLogger(moduleName);
	logger.setLevel('DEBUG');
	return logger;
};

exports.getClientForOrg = getClientForOrg;
exports.getLogger = getLogger;
exports.setupChaincodeDeploy = setupChaincodeDeploy;
exports.getRegisteredUser = getRegisteredUser;
exports.isUserRegistered = isUserRegistered;
