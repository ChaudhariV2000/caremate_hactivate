import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID =1954584908;//1965630916;//1668608289;//1568069075;// 739996763;// 1122569529;
    const serverSecret ="cfafba2e877428f1448cd2566e974501";//"cddab2a9363398bee0621095de8af08c";//"f2516865b7bbf3c8906d230bf4294bcb";//"960c273d1f368c9f3f0451d485f01858";//"dce929ef61dd0e7156086609cfd98a27";//"c419d589f3561e8a702006e9ca297130";
    const userID = Date.now().toString();
    const userName = "Vedant";

    // Generate kit token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userID,
      userName

    );

    // Create instance and join room
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.origin}/room/${roomId}`,
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
    });
  };

  return (
    <div className='mt-2 mb-5'>
      <div ref={myMeeting} style={{ width: '100%', height: '100vh' }} />
    </div>
  )
}

export default Room
