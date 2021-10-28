import Icon from '@components/atoms/Icon';
import React from 'react';
import { BlurImage } from '@components/molecules/CardThumbnail/style';
import {
  CheckboxWrapper,
  CustomCheckboxIcon,
  ThumbItemWrapper,
  ThumbImg,
} from './style';

export default function ThumbItem({
  imageUrl,
  onClick,
  children,
  checked,
  onChange,
}) {
  return (
    <ThumbItemWrapper image={imageUrl} onClick={onClick}>
      {children}
      <BlurImage src={imageUrl} />
      <ThumbImg src={imageUrl} />
      <CheckboxWrapper>
        <input
          name="lorem1"
          type="checkbox"
          checked={checked}
          onChange={e => onChange && onChange(e)}
        />
        <CustomCheckboxIcon>
          <Icon name="check" />
        </CustomCheckboxIcon>
      </CheckboxWrapper>
    </ThumbItemWrapper>
  );
}
