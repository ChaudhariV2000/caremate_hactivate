import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
  const {roomId} = useParams();

  const myMeeting = async (element) => {
    const appID = 1122569529;
    const ServerSecret = "c419d589f3561e8a702006e9ca297130";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,ServerSecret,roomId,Date.now().toString(),"Ocean");
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks:[ 
        {
            name: "Copy Link",
            url: `http://localhost:5173/room/${roomId}`,
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
      <div className='mt-2 mb-5'>
        <div ref={myMeeting}/>
      </div>
  )
}

export default Room
