export interface INavigationData {
  id: number;
  name: string;
  link?: string;
  image?: string;
  description?: string;
  children?: INavigationData[];
  pages?: {
    name: string;
    href: string;
    current: boolean;
  }[];
}

const navigationData: INavigationData[] = [
  {
    id: 1,
    name: 'Foundations',
    link: '/foundations',
    children: [
      {
        id: 13,
        name: 'Design Tokens',
        link: '/foundations/design-tokens',
        image:
          'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/e352cd92-3205-46cd-22db-74d21331be00/public',
        pages: [
          {
            name: 'Foundations',
            href: '/foundations',
            current: false,
          },
          {
            name: 'Design Tokens',
            href: '/foundations/design-tokens',
            current: true,
          },
        ],
      },
      {
        id: 11,
        name: 'Colors',
        link: '/foundations/colors',
        image:
          'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/41fb2c5e-6b14-4fc2-ca95-95acde8f3a00/public',
        pages: [
          {
            name: 'Foundations',
            href: '/foundations',
            current: false,
          },
          {
            name: 'Colors',
            href: '/foundations/colors',
            current: true,
          },
        ],
      },
      {
        id: 12,
        name: 'Border Radius',
        link: '/foundations/border-radius',
        image:
          'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/55a9cc2a-aa3c-4ce2-88a7-ded977843900/public',
        pages: [
          {
            name: 'Foundations',
            href: '/foundations',
            current: false,
          },
          {
            name: 'Border Radius',
            href: '/foundations/border-radius',
            current: true,
          },
        ],
      },
      {
        id: 13,
        name: 'Spacing',
        link: '/foundations/spacing',
        image:
          'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/3413745c-f202-4188-8e91-b55c1850f000/public',
        pages: [
          {
            name: 'Foundations',
            href: '/foundations',
            current: false,
          },
          {
            name: 'Spacing',
            href: '/foundations/spacing',
            current: true,
          },
        ],
      },
      {
        id: 13,
        name: 'Dimensions',
        link: '/foundations/dimensions',
        image:
          'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/8828e05d-0c88-457e-da7b-7b3cc756e800/public',
        pages: [
          {
            name: 'Foundations',
            href: '/foundations',
            current: false,
          },
          {
            name: 'Dimensions',
            href: '/foundations/dimensions',
            current: true,
          },
        ],
      },
      {
        id: 14,
        name: 'Typography',
        link: '/foundations/typography',
        image:
          'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/bc608900-2deb-4c7c-ee67-52141cf12800/public',
        pages: [
          {
            name: 'Foundations',
            href: '/foundations',
            current: false,
          },
          {
            name: 'Typography',
            href: '/foundations/typography',
            current: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Components',
    link: '/components',
    children: [
      {
        id: 21,
        name: 'Data Display',
        children: [
          {
            id: 211,
            name: 'Tag',
            link: '/components/data-display/tag',
            description: '',
          },
          {
            id: 212,
            name: 'Table',
            link: '/components/data-display/table',
            description: '',
          },
          {
            id: 213,
            name: 'Divider',
            link: '/components/data-display/divider',
            description: '',
          },
          {
            id: 214,
            name: 'Subhead',
            link: '/components/data-display/subhead',
            description: '',
          },
          {
            id: 215,
            name: 'Text',
            link: '/components/data-display/text',
            description: '',
          },
        ],
      },
      {
        id: 22,
        name: 'Disclosure',
        children: [
          {
            id: 221,
            name: 'Tabs',
            image:
              'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/84633e96-2577-40b8-ffec-19f3b2bc0e00/public',
            link: '/components/disclosure/tabs',
            description: '',
          },
          {
            id: 222,
            name: 'Accordion',
            link: '/components/disclosure/accordion',
            description: '',
          },
          {
            id: 223,
            name: 'Segment Control',
            link: '/components/disclosure/segment',
            description: '',
          },
        ],
      },
      {
        id: 23,
        name: 'Feedback',
        children: [
          {
            id: 231,
            name: 'Alert',
            link: '/components/feedback/alert',
            description: '',
          },
          {
            id: 232, // Should this be 232?
            name: 'Toast',
            link: '/components/feedback/toast',
            description: '',
          },
          {
            id: 233, // Should this be 232?
            name: 'Progress',
            link: '/components/feedback/progress',
            description: '',
          },
        ],
      },
      {
        id: 24,
        name: 'Media & Icons',
        children: [
          {
            id: 241,
            name: 'Avatar',
            link: '/components/media/avatar',
            description: '',
          },
          {
            id: 242,
            name: 'Icons',
            link: '/components/media/icons',
            description: '',
          },
          {
            id: 243,
            name: 'Images',
            link: '/components/media/images',
            description: '',
          },
        ],
      },
      {
        id: 25,
        name: 'Overlay',
        children: [
          {
            id: 251,
            name: 'Modal',
            link: '/components/overlay/modal',
            description: '',
          },
          {
            id: 252,
            name: 'Drawer',
            link: '/components/overlay/drawer',
            description: '',
          },
          {
            id: 253,
            name: 'Popover',
            link: '/components/overlay/popover',
            description: '',
          },
          {
            id: 254,
            name: 'Tooltip',
            link: '/components/overlay/tooltip',
            description: '',
          },
        ],
      },
      {
        id: 26,
        name: 'Form',
        children: [
          {
            id: 261,
            name: 'Input',
            link: '/components/forms/input',
            description: '',
          },
          {
            id: 262,
            name: 'InputField',
            link: '/components/forms/inputfield',
            description: '',
          },
          {
            id: 263,
            name: 'Select',
            link: '/components/forms/select',
            description: '',
          },
          {
            id: 264,
            name: 'Input Label',
            link: '/components/forms/inputlabel',
            description: '',
          },
          {
            id: 265,
            name: 'Switch',
            link: '/components/forms/switch',
            description: '',
          },
          {
            id: 266,
            name: 'Checkbox',
            link: '/components/forms/checkbox',
            description: '',
          },
          {
            id: 267,
            name: 'Textarea',
            link: '/components/forms/textarea',
            description: '',
          },
          {
            id: 268,
            name: 'Button',
            link: '/components/forms/button',
            description: '',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Others',
    link: '/others',
    children: [
      {
        id: 31,
        name: 'Wallet Connect',
        link: '/others/wallet-connect',
        image:
          'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/e352cd92-3205-46cd-22db-74d21331be00/public',
        pages: [
          {
            name: 'Others',
            href: '/others',
            current: false,
          },
          {
            name: 'Wallet Connect',
            href: '/others/wallet-connect',
            current: true,
          },
        ],
      },
    ],
  },
];

export default navigationData;
