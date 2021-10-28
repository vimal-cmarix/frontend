import PresentationService from '@api/services/presentation';
import { cdn } from '@utils/general';
// import { PUBLISHED } from '@modules/consts';

export function getCoverImage(data) {
  if (data?.cover && data?.cover?.video) {
    return data?.cover.video.thumbnail || cdn('/static/img/thumb_temp.png');
  }
  return cdn('/static/img/thumb_sizigi.png');
}

export async function presentationSecurity() {
  // const {data, step, type} = option;
  const response = await PresentationService.getInfoCredits();
  const info = response.data;
  const available = info.limit - info.count;

  // switch(type) {
  //   case 'create':
  if (available <= 0) return false;
  return true;

  // case 'edit':
  //   if ((step === 1 || step === 2) && data.status === PUBLISHED) return false;
  //   return true;

  // default:
  // return true;
  // }
}
