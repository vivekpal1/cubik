import React from 'react';
import { Alert, AlertColors, AlertTypes, AlertVariants } from '@cubik/ui/components/ui/Alert';
import PageHOC from '@/app/home-page-components/components/pageHOC';

const page = () => {
  const alertVariants = ["Info", "Loading", "Success", "Warning", "Error"];
  const alertTypes = ["Inline", "Text", "Border"];
  const alertColors = ["Purple", "Red", "Green", "Blue", "Yellow"];
  const alertSizes = ["small", "large"];

  return (
    <>
      <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Alert', href: '/component/alert', current: true },
      ]}
      heading={'Alert'}
      description={'Use the alert component to display important messages to users.'}
    >
      <div className="p-8">
        <h1 className="mb-6 text-2xl">Alert Variants Display</h1>
        <div className="p-8">
        <h1 className="mb-6 text-2xl">Alert Variants Display</h1>

        {alertColors.map(color => (
          <div key={color} className="mb-4">
            <h2 className="mb-4 text-xl">Color: {color}</h2>
            {alertTypes.map(type => (
              <div key={type} className="mb-2">
                <h3 className="mb-2 text-lg">Type: {type}</h3>
                {alertVariants.map(variant => (
                  <div key={variant} className="mb-2">
                    {alertSizes.map(size => (
                      <div key={size} className="mb-2">
                        <Alert
                          size={size}
                          color={color}
                          title={`Sample Title ${variant}`}
                          content={`This is a sample content (${size} size)`}
                          type={type}
                          variant={variant}
                          buttonText={variant === "Loading" ? "Retry" : "Click Me"} 
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      </div>
    </PageHOC>
    </>
  );
};

export default page;
