import React, { useState } from "react";
import { Camera } from "expo-camera";

import { StyledViewCamera, StyledToolCameraButtons, StyledTextCenter, StyledTakePhoto, StyledToolCameraLeft, StyledTakePhotoButton } from "../styles/styledComponents";

const CameraComponent = ({
  setCapturedImage,
  setPreviewVisible,
  setStartCamera,
}) => {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState('off');

  const __takePicture = async () => {
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode("auto");
    }
  };

  let camera = Camera;

  return (
    <Camera
      type={cameraType}
      flashMode={flashMode}
      style={{ width: '100%', flex: 1}}
      ref={(r) => {
        camera = r;
      }}
    >
      <StyledViewCamera>
        <StyledToolCameraLeft>
          <StyledToolCameraButtons
            onPress={__handleFlashMode}
            style={{
              backgroundColor:
                flashMode === 'off'
                  ? 'black'
                  : 'white',
            }}
          >
            <StyledTextCenter>⚡️</StyledTextCenter>
          </StyledToolCameraButtons>
          

          <StyledToolCameraButtons
            onPress={__switchCamera}
          >
            <StyledTextCenter>
              {cameraType === "front" ? "🤳" : "📷"}
            </StyledTextCenter>
          </StyledToolCameraButtons>
        </StyledToolCameraLeft>

        <StyledTakePhoto>
            <StyledTakePhotoButton
              onPress={__takePicture}
            />
        </StyledTakePhoto>
      </StyledViewCamera>
    </Camera>
  );
};

export default CameraComponent;
