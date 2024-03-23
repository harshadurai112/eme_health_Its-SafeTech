import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './AppStack';



export const RootNavigator = () => {



  return (
    <NavigationContainer>
      <AppStack /> 
    </NavigationContainer>
  );
};