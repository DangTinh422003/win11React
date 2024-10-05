import React from "react";
import { useSelector } from "react-redux";
import { MdContentCopy } from "react-icons/md";
import { ToolBar } from "../../../utils/general";
import { IoIosSearch } from "react-icons/io";
import {
  FaCaretDown,
  FaChevronLeft,
  FaChevronRight,
  FaShare,
  FaTrashAlt,
} from "react-icons/fa";
import { useClickOutside } from "../../../hooks/useClickOutside";
import clsx from "clsx";

const mockData = [
  {
    name: "Test Environment",
    owner: {
      address: "qkwhjepoi1y2poi12yhioup",
      avatar: "https://github.com/shadcn.png",
      name: "John Doe",
      email: "ckjasb@gmail.com",
    },
    systems: [
      "Aws",
      "Ubuntu",
      "Mac OS",
      "Linux",
      "Nodejs",
      "React",
      "Vue",
      "DockerHehe",
      "Linux",
      "Nodejs",
      "React",
      "Vue",
      "DockerHehe",
    ],
  },
  {
    name: "Test Environment",
    owner: {
      address: "qw;klpeh;lkjqwhe;kjqwhbeklw",
      avatar: "https://github.com/shadcn.png",
      name: "John Doe",
      email: "djklbnsa@gmail.com",
    },
    systems: [
      "Aws",
      "Ubuntu",
      "Mac OS",
      "Linux",
      "Nodejs",
      "React",
      "Vue",
      "DockerHehe",
      "Linux",
      "Nodejs",
      "React",
      "Vue",
      "DockerHehe",
    ],
  },
  {
    name: "Test Environment",
    owner: {
      address: "qw;klpeh;12lkje;lk12nhel;k12ne;kjqwhbeklw",
      avatar: "https://github.com/shadcn.png",
      name: "John Doe",
      email: "dkns@gmail.com",
    },
    systems: [
      "Aws",
      "Ubuntu",
      "Mac OS",
      "Linux",
      "Nodejs",
      "React",
      "Linux",
      "Nodejs",
      "React",
      "Vue",
      "DockerHehe",
      "Vue",
      "DockerHehe",
    ],
  },
];

const ActivityPopup = () => {
  const [isShow, setIsShow] = React.useState(false);
  const buttonRef = React.useRef(null);

  useClickOutside(buttonRef, () => {
    setIsShow(false);
  });

  return (
    <div className="flex items-center gap-2 relative" ref={buttonRef}>
      <div className="flex rounded-full items-center justify-center hover:bg-gray-200 size-10">
        <FaTrashAlt className="text-red-500" />
      </div>
      <button
        className="flex items-center justify-center bg-white hover:bg-gray-200 rounded-md gap-2 px-4 py-2 border border-solid"
        onClick={(e) => {
          e.stopPropagation();
          setIsShow(true);
        }}
      >
        <span className="font-medium text-xs">Share</span>
        <FaCaretDown />
      </button>

      {isShow && (
        <div className="z-10 w-auto min-w-96 bg-white shadow-lg translate-y-full absolute right-0 bottom-0 border border-[#ddddde] rounded-md p-2">
          <div className="items-center flex border h-7">
            <p className="flex-1 p-2">flox pull DangTinh422003/test</p>
            <button className="size-7 border flex items-center justify-center">
              <MdContentCopy />
            </button>
          </div>

          <div className="flex p-2 justify-between text-gray-600 text-xs">
            <p>Use this environment in any other location.</p>
            <a href="/" className="flex gap-1 hover:underline items-center">
              <span>Sharing guide</span>
              <FaShare />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const BubbleHub = () => {
  const wnapp = useSelector((state) => state.apps.bubblehub);

  return (
    <div
      className="bg-gray-700 floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size === "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="Bubble Hub"
      />
      <div
        className="bg-white windowScreen flex flex-col min-w-full h-screen"
        data-dock="true"
      >
        <iframe
          className="w-full h-full"
          src="https://bubble-hub.vercel.app/"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
};
