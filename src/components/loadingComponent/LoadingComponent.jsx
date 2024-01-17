import { waveform } from "ldrs";

// Default values shown

function LoadingComponent() {
  waveform.register();

  return (
    <div className="flex justify-center items-center h-[50vh]">
      <l-waveform size="64" stroke="6" speed="1" color="white"></l-waveform>
    </div>
  );
}

export default LoadingComponent;
