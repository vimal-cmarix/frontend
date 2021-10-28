import axios from 'axios';
import FileUpload from 'src/utils/fileupload';
import API from '../index';

function dataURItoBlob(dataURI) {
  // Source https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  const ab = new ArrayBuffer(byteString?.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString?.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

class AssetService extends API {
  constructor() {
    super(API);
  }

  async getAuth() {
    return this.get(`/asset/authorization/upload`);
  }

  async createAsset(url) {
    // console.log('url....', url);
    return this.post(`/asset`, { url });
  }

  async parserLink(data) {
    const { url, width, accessToken } = data;
    return this.get(
      `/applicant/metadata?url=${url}${width > 0 ? `&width=${width}` : ''}${
        accessToken ? `&access_token=${accessToken}` : ''
      }`,
    );
  }

  async uploadVideoThumbnail(videoData) {
    const { id: videoId, thumbnail, thumbId, thumbCache } = videoData;
    if (!thumbnail) {
      return;
    }
    if (thumbCache[thumbId]) {
      // Thumbnail was already uploaded
      const thumbHandle = thumbCache[thumbId].handle;
      await this.setAssetThumbnail(
        videoId,
        thumbHandle?.handle || thumbHandle,
        thumbId,
      );
    } else if (thumbnail.startsWith('data:')) {
      // Thumbnail is generate from a frame, and need to be uploaded

      // FileStack API Calling
      // const { data } = await this.upload({
      //   dataURL: thumbnail,
      //   filename: `thumb_${Math.round(Math.random() * 1000)}`,
      // });
      // const thumbHandle = data.url.split('/').pop();
      // await this.setAssetThumbnail(videoId, thumbHandle, thumbId);

      const { data } = await this.upload({
        dataURL: thumbnail,
      });
      // console.log('__result', data);
    } else {
      // Thumbnail was uploaded (custom thumbnail)
      const thumbHandle = thumbnail.split('/').pop();
      await this.setAssetThumbnail(videoId, thumbHandle, thumbId);
    }
  }

  async upload({ dataURL }) {
    const uploadedImage = [];
    await this.uploadImage(dataURL, (err, result) => {
      if (err) {
        console.log('Error in cover image upload');
      } else {
        uploadedImage.push(result);
        // onSuccess(result);
        console.log('upload___', result);
        // addEditData(result);
      }
    });
  }

  // Old Upload Function
  // async upload({ dataURL, blob, filename }) {
  //   const file = blob || dataURItoBlob(dataURL);
  //   const { data } = await this.getAuth();
  //   const { key, policy, signature, path } = data.data.params;
  //   const form = new FormData();
  //   form.append('fileUpload', file, filename);
  //   return axios.post('https://www.filestackapi.com/api/store/S3', form, {
  //     params: {
  //       key,
  //       policy,
  //       signature,
  //       path,
  //     },
  //     headers: {
  //       'Content-Type': `multipart/form-data;`,
  //     },
  //   });
  // }

  async uploadImage(thumbEncode, cb) {
    FileUpload.thumbnailUpload(thumbEncode, (err, result) => {
      if (err) cb(err, null);
      else {
        cb(null, result);
      }
    });
  }

  async setAssetThumbnail(id, thumbHandle, thumbId) {
    return this.put(`/asset/${id}`, {
      thumbHandle,
      thumbId: thumbId || 'custom-1',
    });
  }
}

export default new AssetService();
