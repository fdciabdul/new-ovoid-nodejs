
# New Ovoid Nodejs

![ovoid-new](https://i.ibb.co/NtXsm0X/here.png)

a Node.js library for interacting with the  OVO (Indonesia Digital Wallet) API. It provides functionality for fetching user balance, order history, wallet transaction history, and notification status.


Updated and working  : 14/06/2023 

Click Star (⭐) if you like this

## Installation
You can install this library by running `npm install` in your terminal.

```bash
npm install ovoid-new
```
## Usage

Below are some examples of how to use this library:

```javascript
const {OTP,USER} = require('ovoid-new');

let otp = new OTP();

// send number must be in +62 format 
// example +628xxxxxxx
let number = "+628xxxxx";
otp.sendOTP(number)
    .then(data => console.log(data))
    .catch(error => console.error(error));
// will return 
{ 
  ref_id : "xxxxxx",
  device_id: "xxxxx"
}

// Sumbit OTP
otp.submitOTP(number,device_id,otp_code,otp,ref_id)
    .then(data => console.log(data))
    .catch(error => console.error(error));
// will return the otp token 

// loginSecurity
onst verif = await otp.loginSecurityCode(security_code,otp_token,number,device_id,otp_ref_id)
 .then(data => console.log(data))
    .catch(error => console.error(error));
```

## Methods

### getBalance(deviceId, otpToken)
This method is used to fetch the balance of the user. It requires the deviceId and otpToken.

### getOrderHistory(deviceId, otpToken, page, limit, productType)
This method fetches the order history of the user. It requires the deviceId and otpToken. You can also specify the page, limit, and productType parameters.

### getWalletTransaction(deviceId, otpToken, limit, transactionTypes)
This method fetches the wallet transaction history of the user. It requires the deviceId and otpToken. You can also specify the limit and transactionTypes parameters.

### getNotifications(deviceId, otpToken)
This method fetches the notification status for the user. It requires the deviceId and otpToken.

# License

[GPL-3.0 license](https://github.com/fdciabdul/new-ovoid-nodejs/LICENSE)

# [](https://github.com/fdciabdul/new-ovoid-nodejs#code-by)Code By

Abdul Muttaqin

# [](https://github.com/fdciabdul/new-ovoid-nodejs#cp)CP

 - [cp@imtaqin.id](mailto:cp@imtaqin.id)
 - [taqin2731@gmail.com](mailto:taqin2731@gmail.com)
