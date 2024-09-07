import ReactAudioPlayer from "react-audio-player";

export function Media({ media }) {
    return (
        <ReactAudioPlayer
            className="opacity-0 -z-20"
            src={media}
            autoPlay
            volume={0.5}
            loop
        />
    );
}
