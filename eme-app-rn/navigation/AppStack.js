import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseSituation from '../screens/ChooseSituation';
import FaceScan from '../screens/faceScan';
import HealthRecordHistory from '../screens/HealthRecordHistory';
import HealthRecord from '../screens/HealthRecord';
import MedicalDetails from '../screens/MedicalDetails';
import MedicalReportUpload from '../screens/MedicalReportUpload';
import Biodata from '../screens/Biodata';
import EmergencyContact from '../screens/EmergencyContact';
import AccidentDetection from '../screens/AccidentDetection';
import Notification from '../screens/notification';
import Medication from '../screens/Medication';
import FoodRecommendation from '../screens/FoodRecommendation';


const Stack = createStackNavigator();



const options = {
  // This is for disabling the header at the top unComment it during writing the main UI code
 
  headerShown: false
}

export const AppStack = () => {
  return (
    <Stack.Navigator>
       
       {/* Import and test the screen that you want to test */}

       <Stack.Screen options={options} name='Choose' component={ChooseSituation} />
       <Stack.Screen options={options} name='HealthRecHis' component={HealthRecordHistory} />
       <Stack.Screen options={options} name='MedRepUpl' component={MedicalReportUpload} />
       <Stack.Screen options={options} name='HealthRec' component={HealthRecord} />
       <Stack.Screen options={options} name='Biodata' component={Biodata} />
       <Stack.Screen options={options} name='Face' component={FaceScan} />
       <Stack.Screen options={options} name='MedDet' component={MedicalDetails} />
       <Stack.Screen options={options} name='EmergencyContact' component={EmergencyContact} />
       <Stack.Screen options={options} name='Medication' component={Medication} />
       <Stack.Screen options={options} name='AccidentDetection' component={AccidentDetection} />
       <Stack.Screen options={options} name='Notification' component={Notification} />
       <Stack.Screen options={options} name='FoodRecommendation' component={FoodRecommendation} />

      {/* <Stack.Screen options={options} name='Home' component={HomeScreen} /> */}
    </Stack.Navigator>
  );
};