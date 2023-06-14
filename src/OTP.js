const BaseRequest = require('./BaseRequest');
const crypto = require('crypto');
const {
    v4: uuidv4
} = require('uuid');
const constants = require("constants");
class sendOTP extends BaseRequest {
    super() {
        this.deviceId = uuidv4();
    }
    async sendOTP(msisdn) {
        const data = {
            channel_code: 'ovo_android',
            device_id: this.deviceId,
            msisdn,
            otp: {
                channel: 'SMS',
                locale: 'ID',
                sms_hash: 'm9mj4ctIVR8'
            }
        };
        try {
            this.AGW_BASEURL.defaults.headers['device-id'] = this.deviceId;
            const response = await this.AGW_BASEURL.post('v4/api/oauth/otp/onboardingType', data);
            return {
                ref_id: response.data?.data.otp.otp_ref_id,
                deviceId: this.deviceId
            };
        } catch (error) {

            return error.message;
        }
    }
    async submitOTP(msisdn, deviceId, otp, otp_ref_id) {
        const data = {
            channel_code: 'ovo_android',
            device_id: deviceId,
            msisdn,
            otp: {
                otp,
                otp_ref_id,
                type: 'LOGIN'
            }
        };
        try {
            const response = await this.AGW_BASEURL.post('v3/user/accounts/otp/validation', data);
            return response.data;
        } catch (error) {
            return error.response?.data;
        }
    }

    async getPublicKeys(deviceId) {
        try {
            const response = await this.AGW_BASEURL.get('v3/user/public_keys');
            this.AGW_BASEURL.defaults.headers['device-id'] = deviceId;
            return response.data;
        } catch (error) {

            return error.message;
        }
    }

    async encryptRSA(securityCode, deviceId, phoneNumber, otpRefId) {
        const publicKey = (await this.getPublicKeys(deviceId)).data.keys[0].key;
        const d = new Date();
        const currentTimeMillies = d.getTime();
        const string = "LOGIN|" + securityCode + "|" + currentTimeMillies + "|" + deviceId + "|" + phoneNumber + "|" + deviceId + "|" + otpRefId;
        return crypto.publicEncrypt({
            key: publicKey,
            padding: constants.RSA_PKCS1_PADDING,
        }, Buffer.from(string, "utf8")).toString("base64");
    }

    async loginSecurityCode(securityCode, otp_token, mobilePhone, otpRefId, device_id, pushId = 'XXXXXXXXXX') {
        this.AGW_BASEURL.defaults.headers['device-id'] = device_id;
        let passwordValue = await this.encryptRSA(securityCode, device_id, mobilePhone, otpRefId);
        let data = {
            "channel_code": "ovo_android",
            "credentials": {
                "otp_token": otp_token,
                "password": {
                    "format": "rsa",
                    "value": passwordValue
                }
            },
            "device_id": device_id,
            "msisdn": mobilePhone,
            "push_notification_id": pushId
        };
        try {
            const response = await this.AGW_BASEURL.post('v3/user/accounts/login', data);
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = sendOTP;