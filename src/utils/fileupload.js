import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});
AWS.config.region = process.env.REACT_APP_AWS_REGION;
const s3Obj = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_AWS_BUCKET },
});
const FileUpload = {
  fileUpload: (file, cb) => {
    if (file) {
      console.log('dataaaaa', file);
      //Update file name
      let fileName = file.name.split('.');
      const leftPart = fileName[0];
      const rightPart = fileName[1];
      const date = new Date();
      const time = date.getTime();
      fileName = `${leftPart}-${time}.${rightPart}`;
      //
      const params = {
        ACL: 'private',
        Key: fileName,
        ContentType: file.type,
        Body: file,
        ServerSideEncryption: 'AES256',
      };
      s3Obj.upload(params, function(err, data, hey) {
        if (err) {
          // There Was An Error With Your S3 Config
          // console.log('err.message', err.message)
          cb(err.message, null);
        } else {
          // console.log('data___(Summary)', data);
          cb(null, data.Location);
        }
      });
    }
  },
  thumbnailUpload: (thumbEncode, cb) => {
    if (thumbEncode) {
      const params = {
        body: {
          url: thumbEncode,
        },
      };
      if (!thumbEncode) {
        cb('Something goes wrong', null);
      } else {
        cb(null, thumbEncode);
      }
      // s3Obj.upload(params, function(err, data, hey) {
      //   if (err) {
      //     cb(err.message, null);
      //   } else {
      //     cb(null, data);
      //   }
      // });
    }
  },
};

export default FileUpload;
