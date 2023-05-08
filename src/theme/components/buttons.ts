import { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { isMobileSafari, isSafari } from 'react-device-detect';

export const Button = {
  baseStyles: {
    color: '#031513',
    backgroundColor: '#A8F0E6',
    outline: isMobileSafari ? '' : '1px solid #A8F0E6',
    height: 'full',
    width: { base: 'full', md: 'full' },
    padding: { base: '12px 32px 14px 32px', md: '14px 44px 14px 44px' },
    fontSize: { base: '14px', md: '16px' },
    letterSpacing: '-1%',
    fontWeight: '600',
    lineHeight: '22px',
    borderRadius: '12px',
    transition: 'all 0.6s',
    _hover: {
      color: '#14665B',
      backgroundColor: '#E0FFFD',
      outline: isMobileSafari ? '' : '1px solid #E0FFFD',
      shadow: '0px 4px 60px rgba(168, 240, 230, 0.4)',
      transition: 'all 0.6s',
    },
    _disabled: {
      color: '#031513',
      backgroundColor: '#A8F0E6',
    },
  },
  variants: {
    solid: (_props: StyleFunctionProps) => ({
      rounded: '12px',
      padding: '12px 22px',
      backgroundColor: 'red',
      borderColor: '1px dashed #0386CF  ',
      color: 'black',
      lineHeight: '10px',
      fontWeight: '500',
      transition: 'all 0.6s',
      fontSize: '14px',
      height: 'fit-content',
    }),
    outline: (_props: StyleFunctionProps) => ({
      rounded: '12px',
      padding: '8px 16px',
      h: '3rem',
      color: '#A8F0E6',
      border: 'none',
      backgroundColor: 'transparent',
      lineHeight: '10px',
      fontWeight: '600',
      transition: 'all 0.2s',
      fontSize: '16px',
      height: 'fit-content',
      _hover: {
        border: 'none',
        background: '#ffffff04',
        color: '#A8F0E6',
      },
      _active: {
        border: 'none',
        background: '#ffffff04',
        color: '#A8F0E6',
      },
    }),
    markdownIconButton: (_props: StyleFunctionProps) => ({
      borderRadius: '12px',
      border: 'none',
      background: 'red.800',
      transition: 'all 0.2s',
      height: '30px',
      maxW: '10px',
      color: '#ADB8B6',
      _hover: { height: '30px', maxW: '10px', background: '#ffffff30' },
    }),
    primary: (_props: StyleFunctionProps) => ({
      color: '#031513',
      backgroundColor: '#A8F0E6',
      outline: isMobileSafari ? '' : '1px solid #A8F0E6',
      height: 'full',
      width: { base: 'full', md: 'full' },
      padding: { base: '12px 32px 14px 32px', md: '14px 44px 14px 44px' },
      fontSize: { base: '14px', md: '16px' },
      letterSpacing: '-1%',
      fontWeight: '600',
      lineHeight: '22px',
      borderRadius: '12px',
      transition: 'all 0.6s',
      _hover: {
        color: '#14665B',
        backgroundColor: '#E0FFFD',
        outline: isMobileSafari ? '' : '1px solid #E0FFFD',
        shadow: '0px 4px 60px rgba(168, 240, 230, 0.4)',
        transition: 'all 0.6s',
      },
    }),
    secondary: (_props: StyleFunctionProps) => ({
      color: '#A8F0E6',
      backgroundColor: 'transparent',
      height: 'full',
      width: { base: 'full', md: 'full' },
      padding: { base: '12px 32px 14px 32px', md: '14px 44px 14px 44px' },
      outline: isMobileSafari ? '' : '1px solid #A8F0E6',
      border: isMobileSafari ? '1px solid #A8F0E6' : '',
      fontSize: { base: '14px', md: '16px' },
      fontWeight: '600',
      lineHeight: '22px',
      borderRadius: '12px',
      transition: 'all 0.6s',
      _hover: {
        color: '#031513',
        backgroundColor: '#E0FFFD',
        outline: '1px solid #E0FFFD',
        shadow: '0px 4px 60px rgba(168, 240, 230, 0.4)',
        transition: 'all 0.6s',
      },
    }),
    connect_wallet: (_props: StyleFunctionProps) => ({
      color: '#031513',
      backgroundColor: '#A8F0E6',
      padding: { base: '8px 20px 10px 20px', md: '8px 20px 10px 20px' },
      outline:
        isMobileSafari || isSafari
          ? '1px solid red'
          : '1px solid rgba(168, 240, 230, 0.6)',
      rounded: '12px',
      fontSize: { base: '12px', md: '14px' },
      fontWeight: '600',
      lineHeight: { base: '18px', md: '22px' },
      borderRadius: '12px',
      border: 'none',
      behavior: 'url(PIE.htc)',
      _hover: {
        color: '#14665B',
        backgroundColor: '#E0FFFD',
      },
      _active: {
        color: '#031513',
      },
      _disabled: {
        color: '#031513',
        backgroundColor: '#A8F0E6',
      },
    }),
    create_account: (_props: StyleFunctionProps) => ({
      color: '#031513',
      backgroundColor: '#A8F0E6',
      padding: { base: '8px 20px 10px 20px', md: '8px 20px 10px 20px' },
      outline: isMobileSafari ? 'none' : '1px solid rgba(168, 240, 230, 0.6)',
      rounded: '12px',
      fontSize: { base: '12px', md: '14px' },
      fontWeight: '600',
      lineHeight: { base: '18px', md: '22px' },
      borderRadius: '12px',
      border: 'none',
      behavior: 'url(PIE.htc)',
      _hover: {
        color: '#14665B',
        backgroundColor: '#E0FFFD',
        border: 'none',
        _disabled: {
          color: '#031513',
          backgroundColor: '#A8F0E6',
        },
      },
      _active: {
        color: '#031513',
        border: 'none',
      },
    }),
    apply_for_grant: (_props: StyleFunctionProps) => ({
      color: '#031513',
      backgroundColor: '#A8F0E6',
      padding: { base: '8px 20px 10px 20px', md: '8px 20px 10px 20px' },
      outline: isMobileSafari ? 'none' : '1px solid rgba(168, 240, 230, 0.6)',
      rounded: '8px',
      fontSize: { base: '12px', md: '14px' },
      fontWeight: '600',
      lineHeight: { base: '18px', md: '22px' },
      borderRadius: '8px',
      border: 'none',
      behavior: 'url(PIE.htc)',
      _hover: {
        color: '#14665B',
        backgroundColor: '#E0FFFD',
        border: 'none',
        _disabled: {
          color: '#031513',
          backgroundColor: '#A8F0E6',
        },
      },
      _active: {
        color: '#031513',
        border: 'none',
      },
    }),
    close_modal: (_props: StyleFunctionProps) => ({
      color: '#A8F0E6',
      backgroundColor: 'transparent',
      padding: { base: '8px 20px 10px 20px', md: '8px 20px 10px 20px' },
      outline: isMobileSafari ? '' : '1px solid #A8F0E6',
      border: isMobileSafari ? '1px solid #A8F0E6' : '',
      rounded: '8px',
      fontSize: { base: '12px', md: '14px' },
      fontWeight: '600',
      lineHeight: { base: '18px', md: '22px' },
      borderRadius: '8px',
      behavior: 'url(PIE.htc)',
      _hover: {
        color: '#031513',
        backgroundColor: '#E0FFFD',
        outline: '1px solid #E0FFFD',
        transition: 'all 0.6s',
      },
    }),
    primary_white: (_props: StyleFunctionProps) => ({
      color: '#00010A',
      backgroundColor: '#E0FFFD',
      padding: '14px 80px 16px 80px',
      stroke: '#A8F0E660',
      outline: '4px solid rgba(255, 255, 255, 0.16)',
      width: '250px',
      height: '52px',
      fontWeight: '600',
      letterSpacing: '-0.01em',
      fontSize: '16px',
      lineHeight: '22px',
      borderRadius: '12px',
      _hover: {
        color: '#001F1B',
        backgroundColor: '#A8F0E6',
        outline: '4px solid rgba(255, 255, 255, 0.16)',
      },
      _active: {
        color: '#031513',
      },
    }),
    connect_twitter: (_props: StyleFunctionProps) => ({
      color: '#031513',
      backgroundColor: '#E0FFFD',
      outline: isMobileSafari ? '' : '1px solid #A8F0E6',
      height: 'full',
      width: { base: 'full', md: 'full' },
      padding: { base: '11px 32px 14px 32px', md: '13px 44px 12px 44px' },
      fontSize: '16px',
      letterSpacing: '-1%',
      fontWeight: '700',
      lineHeight: '22px',
      borderRadius: '12px',
      transition: 'all 0.6s',
      _hover: {
        color: '#031513',
        backgroundColor: '#A8F0E6',
        outline: isMobileSafari ? '' : '1px solid #14665B',
      },
    }),
    project_button_primary: (_props: StyleFunctionProps) => ({
      color: '#001F1B',
      backgroundColor: '#A8F0E6',
      height: 'full',
      width: { base: 'full', md: '100%' },
      padding: { base: '12px 20px', md: '14px 20px' },
      fontSize: { base: '14px', md: '16px' },
      fontWeight: '700',
      lineHeight: '16px',
      borderRadius: '12px',
      transition: 'all 0.6s',
      _hover: {
        color: '#031513',
        backgroundColor: '#E0FFFD',
        outline: 'none',
        transition: 'all 0.6s',
      },
      _disabled: {
        color: '#031513',
        backgroundColor: '#E0FFFD !important',
        outline: 'none',
        transition: 'all 0.6s',
      },
      _visited: {
        color: '#031513',
        backgroundColor: '#E0FFFD !important',
        outline: 'none',
        transition: 'all 0.6s',
      },
      _active: {
        color: '#031513',
        backgroundColor: '#E0FFFD',
        outline: 'none',
        transition: 'all 0.6s',
      },
    }),
    project_button_secondary: (_props: StyleFunctionProps) => ({
      color: '#A8F0E6',
      backgroundColor: 'transparent',
      height: 'full',
      width: { base: 'full', md: '100%' },
      padding: { base: '8px 20px', md: '10px 20px' },
      outline: isMobileSafari ? '0px' : '1px solid #A8F0E6',
      border: isMobileSafari ? '1px solid #A8F0E6' : '0px',
      fontSize: { base: '14px', md: '16px' },
      fontWeight: '700',
      lineHeight: '16px',
      borderRadius: '12px',
      transition: 'all 0.6s',
      _disabled: {
        color: '#031513',
        backgroundColor: '#E0FFFD !important',
        outline: 'none',
        transition: 'all 0.6s',
      },
    }),
  },
  sizes: {
    md: {
      fontSize: '14px',
      //height: '3rem',
    },
    sm: {
      fontSize: '12px',
      height: '2.5rem',
      padding: '0.5rem 1rem',
    },
  },
};
