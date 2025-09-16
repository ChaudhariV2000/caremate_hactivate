import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 739996763;// 1122569529;
    const serverSecret = "dce929ef61dd0e7156086609cfd98a27";//"c419d589f3561e8a702006e9ca297130";
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