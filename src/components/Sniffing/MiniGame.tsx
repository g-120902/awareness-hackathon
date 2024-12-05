import React, { useState, useEffect } from "react";
import Image from "next/image";

type Packet = {
  id: number;
  x: number;
  y: number;
  tampered: boolean;
};

const MiniGame: React.FC = () => {
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    // Add packets at regular intervals
    const interval = setInterval(() => {
      setPackets((prev) => [
        ...prev,
        { id: Date.now(), x: 100, y: 220, tampered: false },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const movePackets = () => {
    setPackets((prev) =>
      prev.map((packet) => {
        const isIntercepted = packet.x > 200 && packet.x < 300;


        return {
          ...packet,
          x: packet.x + 5,
          tampered: isIntercepted ? true : packet.tampered,
        };
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => movePackets(), 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex flex-col items-center py-8 transition-colors duration-200`}
    >
      <div className="relative md:w-[500px] w-[300px] h-[400px] bg-transparent overflow-hidden">
          

      <div className="flex w-full mt-44 justify-between">
      <Image src="/images/Sniffing/sender.png" className="md:w-24 z-10 w-16" alt="Sender" width={50} height={50} />

{/* Packets */}
{packets.map((packet) => (
  <div
    key={packet.id}
    className={`absolute w-[20px] h-[20px] rounded-full ${
      packet.tampered ? "bg-red-700" : "bg-gray-500"
    }`}
    style={{ left: `${packet.x}px`, top: `${packet.y}px` }}
  ></div>
))}
      <Image src="/images/Sniffing/intruder.png" className="md:w-24 z-10 w-16" alt="Intruder" width={50} height={50} />

<Image src="/images/Sniffing/receiver.png" className="md:w-24 z-10 w-16" alt="Receiver" width={50} height={50} />
        </div>
 
      </div>
    </div>
  );
};

export default MiniGame;
