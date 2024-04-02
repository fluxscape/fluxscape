import { UnsafeStyleProps } from '@noodl-core-ui/types/global';
import classNames from 'classnames';
import React from 'react';
import css from './Logo.module.scss';

export enum LogoVariant {
  Default = 'default',
  Inverted = 'inverted',
  Grayscale = 'grayscale'
}

export enum LogoSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export interface LogoProps extends UnsafeStyleProps {
  variant?: LogoVariant;
  size?: LogoSize;

  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Logo({
  variant = LogoVariant.Default,
  size = LogoSize.Medium,
  onClick,
  UNSAFE_className,
  UNSAFE_style
}: LogoProps) {
  function VariantIcon(props: {}) {
    switch (variant) {
      default:
      case LogoVariant.Default:
        return <DefaultIcon />;
      case LogoVariant.Inverted:
        return <InvertedIcon />;
      case LogoVariant.Grayscale:
        return <GrayscaleIcon />;
    }
  }

  return (
    <div
      className={classNames([
        css['Root'],
        css[`is-variant-${variant}`],
        css[`is-size-${size}`],
        UNSAFE_className
      ])}
      onClick={onClick}
      style={UNSAFE_style}
    >
      <VariantIcon />
    </div>
  );
}

const DefaultIcon = React.memo(function () {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 13.3981C0 5.99852 5.99852 0 13.3981 0H46.6019C54.0015 0 60 5.99852 60 13.3981V46.6019C60 54.0015 54.0015 60 46.6019 60H13.3981C5.99852 60 0 54.0015 0 46.6019V13.3981Z" fill="url(#paint0_radial_568_4289)"/>
    <g filter="url(#filter0_i_568_4289)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M44.707 8.67749H29.1188C18.398 8.67751 9.70703 17.3685 9.70703 28.0893C9.70703 38.7937 18.3714 47.4744 29.0696 47.501L29.1188 47.5011L29.1188 19.854L29.1188 22.2039C29.1254 20.9049 30.1804 19.854 31.4809 19.854H44.707C47.7933 19.854 50.2953 17.352 50.2953 14.2657C50.2953 11.1794 47.7933 8.67749 44.707 8.67749ZM27.6482 36.0304C27.6482 36.8426 28.3066 37.501 29.1188 37.501V34.5598C28.3066 34.5598 27.6482 35.2183 27.6482 36.0304Z" fill="url(#paint1_linear_568_4289)"/>
    </g>
    <g filter="url(#filter1_i_568_4289)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1202 23.9717C22.6227 23.9717 17.3555 29.2389 17.3555 35.7364C17.3555 42.2339 22.6227 47.5011 29.1202 47.5011C29.9324 47.5011 30.5908 48.1595 30.5908 48.9717C30.5908 49.7839 29.9324 50.4423 29.1202 50.4423H26.7672C25.4677 50.4423 24.4143 51.4957 24.4143 52.7952C24.4143 54.0947 25.4677 55.1482 26.7672 55.1482H29.1202C33.9933 55.1482 37.9437 51.1978 37.9437 46.3247C37.9437 41.4516 33.9933 37.5011 29.1202 37.5011C28.308 37.5011 27.6496 36.8427 27.6496 36.0305C27.6496 35.2184 28.308 34.5599 29.1202 34.5599H35.5908C38.5146 34.5599 40.8849 32.1897 40.8849 29.2658C40.8849 26.342 38.5146 23.9717 35.5908 23.9717L29.1202 23.9717Z" fill="url(#paint2_radial_568_4289)"/>
    </g>
    <defs>
    <filter id="filter0_i_568_4289" x="9.70703" y="8.67749" width="40.5898" height="42.8235" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="8"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_568_4289"/>
    </filter>
    <filter id="filter1_i_568_4289" x="17.3555" y="23.9717" width="23.5312" height="35.1765" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="12"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_568_4289"/>
    </filter>
    <radialGradient id="paint0_radial_568_4289" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30 30) rotate(45) scale(42.4264)">
    <stop offset="0.555" stop-color="#111111"/>
    <stop offset="1"/>
    </radialGradient>
    <linearGradient id="paint1_linear_568_4289" x1="29.1188" y1="28.0893" x2="9.70703" y2="28.0893" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FF1818"/>
    <stop offset="0.835" stop-color="#FFC700"/>
    </linearGradient>
    <radialGradient id="paint2_radial_568_4289" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(41.0747 29.4037) rotate(125.991) scale(31.253 30.8202)">
    <stop stop-color="#FF0000"/>
    <stop offset="1" stop-color="#6732FF"/>
    </radialGradient>
    </defs>
    </svg>
    
  );
});

const InvertedIcon = React.memo(function () {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 13.3981C0 5.99852 5.99852 0 13.3981 0H46.6019C54.0015 0 60 5.99852 60 13.3981V46.6019C60 54.0015 54.0015 60 46.6019 60H13.3981C5.99852 60 0 54.0015 0 46.6019V13.3981Z" fill="url(#paint0_linear_569_5866)"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.5856 25.4583L36.212 25.4583C38.5885 25.4583 40.515 27.3848 40.515 29.7613C40.515 32.1378 38.5885 34.0643 36.212 34.0643L29.5856 34.0643C28.1361 34.0643 26.9611 35.2394 26.9611 36.6889C26.9611 38.1383 28.1362 39.3134 29.5856 39.3134C33.9555 39.3134 37.4985 42.8535 37.5031 47.2222V47.2393C37.4985 51.608 33.9555 55.1482 29.5856 55.1482H27.1761C26.463 55.1482 25.885 54.5701 25.885 53.8571C25.885 53.1441 26.463 52.566 27.1761 52.566H29.5856C31.0351 52.566 32.2102 51.3911 32.2102 49.9416C32.2102 48.4921 31.0351 47.317 29.5856 47.317C23.5529 47.317 18.6617 42.4292 18.6562 36.3978V36.3775C18.6617 30.3461 23.5529 25.4583 29.5856 25.4583Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.5868 8.67749L45.5503 8.67749C48.7109 8.67749 51.2731 11.2397 51.2731 14.4002C51.2731 17.5608 48.7109 20.123 45.5503 20.123L31.9874 20.123C30.6594 20.1323 29.5857 21.2117 29.5857 22.5419V22.5419H29.5856V23.2213C22.3185 23.222 16.4268 29.1103 16.4206 36.3762V36.3993C16.4241 40.5418 18.3408 44.2365 21.3346 46.6476C14.4743 43.5135 9.70703 36.5918 9.70703 28.5567C9.70703 17.5779 18.6069 8.67784 29.5856 8.6776L29.5856 20.123H29.5868L29.5868 8.67749ZM29.5856 39.3135V47.3171C23.5535 47.3164 18.6631 42.4289 18.6576 36.3978V36.3776C18.6631 30.3466 23.5535 25.4591 29.5856 25.4583V34.0644C28.1368 34.0652 26.9625 35.2399 26.9625 36.6889C26.9625 38.138 28.1368 39.3127 29.5856 39.3135ZM29.5856 37.0764V36.3015C29.5852 36.3015 29.5847 36.3015 29.5842 36.3015V37.0764C29.5847 37.0764 29.5852 37.0764 29.5856 37.0764Z" fill="black"/>
    <defs>
    <linearGradient id="paint0_linear_569_5866" x1="9.6215e-06" y1="-4.68362e-06" x2="60" y2="60" gradientUnits="userSpaceOnUse">
    <stop stop-color="#EFBB07"/>
    <stop offset="0.0001" stop-color="#682BD8"/>
    <stop offset="0.505" stop-color="#FF0000"/>
    <stop offset="0.88" stop-color="#EFBB07"/>
    </linearGradient>
    </defs>
    </svg>
  );
});

const GrayscaleIcon = React.memo(function () {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.5856 25.4583L36.212 25.4583C38.5885 25.4583 40.515 27.3848 40.515 29.7613C40.515 32.1378 38.5885 34.0643 36.212 34.0643L29.5856 34.0643C28.1361 34.0643 26.9611 35.2394 26.9611 36.6889C26.9611 38.1383 28.1362 39.3134 29.5856 39.3134C33.9555 39.3134 37.4985 42.8535 37.5031 47.2222V47.2393C37.4985 51.608 33.9555 55.1482 29.5856 55.1482H27.1761C26.463 55.1482 25.885 54.5701 25.885 53.8571C25.885 53.1441 26.463 52.566 27.1761 52.566H29.5856C31.0351 52.566 32.2102 51.3911 32.2102 49.9416C32.2102 48.4921 31.0351 47.317 29.5856 47.317C23.5529 47.317 18.6617 42.4292 18.6562 36.3978V36.3775C18.6617 30.3461 23.5529 25.4583 29.5856 25.4583Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.5868 8.67749L45.5503 8.67749C48.7109 8.67749 51.2731 11.2397 51.2731 14.4002C51.2731 17.5608 48.7109 20.123 45.5503 20.123L31.9874 20.123C30.6594 20.1323 29.5857 21.2117 29.5857 22.5419V22.5419H29.5856V23.2213C22.3185 23.222 16.4268 29.1103 16.4206 36.3762V36.3993C16.4241 40.5418 18.3408 44.2365 21.3346 46.6476C14.4743 43.5135 9.70703 36.5918 9.70703 28.5567C9.70703 17.5779 18.6069 8.67784 29.5856 8.6776L29.5856 20.123H29.5868L29.5868 8.67749ZM29.5856 39.3135V47.3171C23.5535 47.3164 18.6631 42.4289 18.6576 36.3978V36.3776C18.6631 30.3466 23.5535 25.4591 29.5856 25.4583V34.0644C28.1368 34.0652 26.9625 35.2399 26.9625 36.6889C26.9625 38.138 28.1368 39.3127 29.5856 39.3135ZM29.5856 37.0764V36.3015C29.5852 36.3015 29.5847 36.3015 29.5842 36.3015V37.0764C29.5847 37.0764 29.5852 37.0764 29.5856 37.0764Z" fill="white"/>
    </svg>
  );
});
