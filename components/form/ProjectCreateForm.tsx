import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';


import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../hooks/mutations/useCreateProject';



interface IProject {
    id: number;
    title: string;
    description: string;
    start_time: Date;
    end_time?: Date;
    daysLeft?: string;
    status: string;
    user_id: [object];
    numUsers?: number;
    Tickets?:[
      {id:number}
    ] 
    nbTicket?: number;
    picture_id?: number;
}

export default function ProjectCreateForm(): JSX.Element {
    const dateFormat = 'yyyy-MM-DD';
    // State
    const [projectName, setProjectName] = useState<string>('');
    const [projectStatus, setProjectStatus] = useState<string>('');
    const [projectMembers, setProjectMembers] = useState<string>(''); // TODO: change to array of user ids
    const [startDate, setStartDate] = useState<Date>(
      new Date()
    );
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [desc, setDesc] = useState<string>('');
    const [addProject, { data, loading, error }] = useMutation(CREATE_PROJECT);
    
    const HandleProjectStatusChanges = (
        e: React.ChangeEvent<HTMLInputElement>
      ): void => {
        setProjectStatus(e.target.value);
      };
    
      const HandleProjectMembersChanges = (e: any): void => {
        setProjectMembers(e.target.value);
      };
      const [validation, setValidation] = useState('');
      const projectCrea = async (e: any): Promise<void> => {
        e.preventDefault();
        try {
          await addProject({
            variables: {
              projectName: projectName,
              startDate: startDate,
              endDate: endDate, 
              desc:desc,
              projectStatus:projectStatus,

            },
          });
        } catch (err) {
          setValidation('⚠️ Incomplete data, please try again.');
          console.error({ message: err });
          // setIsLogged(false);
        }
      };
    
    return (
       
      <View style={styles.cardStyle}>
        <View>
          <TextInput 
          placeholder="Project Name"
          style={styles.input}
          value={projectName}
          onChangeText={(text) => setProjectName(text)}
          />
        </View>
        
        <View {...HandleProjectMembersChanges}>
        </View> 
        <View>
          <TextInput  placeholder="Start Date"
                style={styles.input}
                onChange={setStartDate} 
                value={startDate}/>
        </View>
        <View>
          <TextInput
          placeholder="End Date Optional"
          style={styles.input}
           onChange={setEndDate} value={endDate}/>  
        </View>
        
        <View {...HandleProjectStatusChanges}> 
        </View>
        <View>
            <TextInput 
                placeholder="Description"
                style={styles.input}
                value={desc}
                onChangeText={(text) => setDesc(text)}
            />
        </View>
        <View>
            <TouchableOpacity onPress={(e) => addProject(e)} style={styles.submit}>
            <Text style={styles.textButton} >Submit</Text>
            </TouchableOpacity>
        </View>
      </View>
    
     
    );
  }
  const styles = StyleSheet.create({
    cardStyle: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#c5d5e4',
    },
   
    
    input: {
      height: 60,
      width: 300,
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      marginVertical: 10,
    },
    submit: {
      backgroundColor: 'orange',
      borderRadius: 10,
      marginTop: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      height: 35,
    },
    text: {
      fontWeight: 'bold',
      color: 'black',
    },
    textButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  

