const OSS = require('ali-oss')
const { Ak, Sk } = require('../config/alioss')
const STS = OSS.STS;
let sts = new STS({
  accessKeyId: Ak,
  accessKeySecret: Sk
})
async function assumeRole() {
  try {
    let token = await sts.assumeRole(
      'acs:ram::1529173705316727:role/smalltalk', '<policy>', '<expiration>', '<session-name>');
    let client = new OSS({
      region: '<region>',
      accessKeyId: token.credentials.AccessKeyId,
      accessKeySecret: token.credentials.AccessKeySecret,
      stsToken: token.credentials.SecurityToken,
      bucket: '<bucket-name>'
    });
  } catch (e) {
    console.log(e);
  }
}
assumeRole();