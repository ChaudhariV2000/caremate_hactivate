import React from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const Participants = () => {
  const { useCallParticipants } = useCallStateHooks();
  const participants = useCallParticipants();

  return (
    <div className="participant-list">
      <h3>Participants</h3>
      <ul>
        {participants.map((participant) => (
          <li key={participant.user_id}>
            <img
              src={participant.image}
              alt={participant.name}
              className="participant-avatar"
            />
            <span>{participant.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;
