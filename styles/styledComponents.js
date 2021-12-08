import styled from 'styled-components/native';

// Styles of Perfil

export const StyledTitleText = styled.Text`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
`;

export const StyledViewContainer = styled.View`
    width: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
`;

export const StyledContainerImage = styled.View`
    align-items: center;
    margin: 20px;
`;

export const StyledImage = styled.Image`
    width: 200px;
    height: 200px;
    border-radius: 200px;
`;

export const StyledViewButtons = styled.View`
    display: flex;
    width: 100%;
    align-items: center;
    align-content: center;
`;

export const StyledContainerButtons = styled.View`
    flex-direction: row;
`;

export const StyledTextButton = styled.Text`
    color: white;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`;

export const StyledContainerCamera = styled.View`
    width: 100%;
    height: 100%;
`;

export const StyledButtonBack = styled.TouchableOpacity`
    width: 100%;
    height: 7%;
    background-color: #CC74EC;
    justify-content: center;
`;

export const StyledViewCamera = styled.View`
    flex: 1;
    width: 100%;
    background-color: transparent;
    flex-direction: row;
`;

export const StyledToolCameraButtons = styled.TouchableOpacity`
    border-radius: 50px;   
    height: 25px;
    width: 25px;
    margin-bottom: 15px;
`;

export const StyledToolCameraLeft = styled.View`
    position: absolute;
    left: 5%;
    top: 10%;
    flex-direction: column;
    justify-content: space-between;
`;

export const StyledTakePhoto = styled.View`
    position: absolute;
    bottom: 0;
    flexDirection: row;
    flex: 1;
    width: 100%;
    padding: 20px;
    justify-content: center;
    align-items: center;
`;

export const StyledTakePhotoButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 40;
    width: 100;
    border-radius: 100;
    height: 100;
    background-color: white;
    shadow-color: black;
    hadow-offset: {
        width: 0;
        height: 6;
    };
    shadow-opacity: 0.37;
    shadow-radius: 7.49;
    elevation: 12;
`;

export const StyledTextCenter = styled.Text`
    text-align: center;
`;

export const StyledButtonOut = styled.TouchableOpacity`
    background-color: #D6231E;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-right: 20px;
`;
export const StyledTextOut = styled.TouchableOpacity`
    color: white;
    font-size: 14px;
    font-weight: bold;
`;

export const StyledInput = styled.TextInput`
    margin: 12px;
    border-width: 1px;
    padding: 10px;
`;

export const StyledInputsSmall = styled.TextInput`
    height: 40px;
    margin: 12px;
    border-width: 1px;
    padding: 10px;
    width: 40%;
`;

export const StyledButtonSave = styled.TouchableOpacity`
    padding: 12px;
    background: blue;
    width: 150px;
    margin-left: 6%;
    border-radius: 10px;
`;

export const StyledButtonCancel = styled.TouchableOpacity`
    padding: 12px;
    background: red;
    width: 150px;
    margin-right: 6%;
    border-radius:10px ;
    
`;

export const StyledListItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    border-bottom-width: 3px;
`;

export const StyledTestListItem = styled.Text`
    font-size: 20px;
`;
export const StyledTextButtonItem = styled.Text`
    font-size: 20px;
`;