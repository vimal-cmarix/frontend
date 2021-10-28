/* eslint-disable react/no-danger */
import React from 'react';

/**
 * Refer a friend modal
 */
const ReferFriendModal = () => {
  return (
    <>
      <span id="extole_zone_global_header" />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,b,f,k,a){c[b]=c[b]||{};for(c[b].q=c[b].q||[];a<k?.length;)f(k[a++],c[b])})(window,"extole",function (c,b){b[c]=b[c]||function (){b.q.push([c,arguments])}},["createZone"],0);
          extole.createZone({
            name: "global_header",
            element_id: 'extole_zone_global_header',
          })
        `,
        }}
      />
    </>
  );
};

export default ReferFriendModal;
