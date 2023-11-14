import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import PageHOC from '../home-page-components/components/pageHOC';
import navigationData from '../navigationData';

export default function ComponentPage() {
  return (
    <PageHOC
      pages={[{ name: 'Components', href: '/components', current: true }]}
      heading={'Components'}
      description={
        'Squares provides prebuilt components to help you build faster. Here is an overview of the component categories'
      }
    >
      <div className="flex flex-row flex-wrap gap-8">
        {navigationData.map(
          (component) =>
            component.name === 'Components' &&
            component.children?.map((subItem) => (
              <div key={subItem.id} className="flex flex-col gap-6">
                <div className={`block text-xl text-[#0D0D0D]`}>
                  {subItem.name}
                </div>
                {subItem.children && (
                  // this is a card
                  <ul className="flex list-none flex-row flex-wrap gap-6">
                    {subItem.children.map((thirdItem) => (
                      <Link
                        key={thirdItem.id}
                        href={thirdItem.link ? thirdItem.link : '#'}
                      >
                        <li className="flex flex-col gap-3">
                          {/*add a image here using next image */}

                          <div className="min-w-0 flex-1 overflow-hidden rounded-[8px] border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]">
                            <Image
                              src={thirdItem.image ? thirdItem.image : ''}
                              alt="My Image"
                              width={230}
                              height={180}
                            />
                          </div>
                          <span className=" text-md text-[var(--color-fg-primary)]">
                            {thirdItem.name}
                          </span>
                          {/* Implement logic for fourth level here if needed */}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            )),
        )}
      </div>
    </PageHOC>
  );
}
