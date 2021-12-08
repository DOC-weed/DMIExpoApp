import React from "react";
import styled from "styled-components/native";

export const StyledView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const StyledViewIMenu= styled.View`
   width:300px;
   height:1000px;
   background-color:#111;
   top:0;
   left:0;
   z-index:999999;
   position: absolute;
   padding-top:50px;
`;

export const StyledViewStore = styled.View`
    width: 100%;
    height: 100%;
    padding:10px;
`;
export const StyledViewStore2 = styled.View`
    padding:30px;
    justify-content: center;
    align-items: center;
    width:100%;
`;
export const StyledViewBanner = styled.ScrollView`
    padding:0;
    margin:0;
`;
export const StyledViewStoreProducts = styled.ScrollView`
    padding:0;
    margin:0;
`;

export const StyledViewInputs = styled.View`
    justify-content: center;
    align-items: center;
`;

export const StyledViewInputsRow = styled.View`
    width: 50%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
`;

export const StyledViewImageAddProduct = styled.View`
    margin: auto;
    align-items: center;
`;
export const StyledViewButtonAction = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin-top: 50px;
`;

export const StyledViewTitleText = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 15px;
`;
export const StyledViewTextDetails = styled.View`
    margin-top: 20px;
    margin-bottom: 15px;
`;

export const StyledContainerCart = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 20px;
    align-content: center;
`;

export const StyledContainerInfoCart = styled.View`
    display: flex;
    width: 70%;
    justify-content: center;
    align-items: center;
`;

export const StyledContainerButtonCart = styled.View`
    flex-direction: row;
    width: 20%;
    justify-content: center;
    align-items: center;
`;

export const StyledContainerTotal = styled.View`
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const StyledViewStoreProductsCard = styled.View`
    width: 100%;
    justify-content: center;
    flex-direction: column;
`;
