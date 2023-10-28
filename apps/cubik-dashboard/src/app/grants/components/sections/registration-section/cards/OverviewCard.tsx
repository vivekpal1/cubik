import React from 'react';

import {
  AvatarLabelGroup,
  Button,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cubik/ui';

const OverviewCard = () => {
  return (
    <div className="bg-muted rounded-lg w-full h-fit">
      <div className="flex items-center justify-between p-4 pb-0">
        <h3 className="text-lg font-semibold">Overview</h3>
      </div>
      <Tabs defaultValue="owners" className="mt-6 rounded-b-lg">
        <TabsList className="bg-neutral-800  w-full overflow-x-auto whitespace-nowrap">
          <div className="w-full max-w-7xl border-b border-b-surface-neutral-800 ">
            <TabsTrigger className="text-sm font-normal" value="owners">
              Owners
            </TabsTrigger>
            <TabsTrigger value="threshold" className="text-sm font-normal">
              Threshold
            </TabsTrigger>
            <TabsTrigger value="assets" className="text-sm font-normal">
              Assets
            </TabsTrigger>
          </div>
        </TabsList>
        <div className="w-full max-w-7xl mx-auto bg-[#1F1F1F] p-4 rounded-b-lg">
          <TabsContent value="owners">
            <div className="space-y-3">
              <AvatarLabelGroup
                avatarSrc="/dhruvAvatar.jpeg"
                title="@leatha.Ritchie77"
                variant={1}
                size="sm"
              />
              <AvatarLabelGroup
                avatarSrc="/dhruvAvatar.jpeg"
                title="@margie17"
                variant={1}
                size="sm"
              />
              <AvatarLabelGroup
                avatarSrc="/dhruvAvatar.jpeg"
                title="@Leatha.Ritchie77"
                variant={1}
                size="sm"
              />
            </div>
          </TabsContent>
          <TabsContent value="threshold">asdfdsf</TabsContent>
          <TabsContent value="assets">asdffs</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default OverviewCard;