import { Alert } from 'react-native';
import { supabase } from './supabase'; // Ensure the path to your initialized Supabase client is correct

export const updateUserName = async (profileId: string, newName: string) => {
  const { data, error } = await supabase
    .from('Profiles') // Name of the table
    .update({ Name: newName }) // Column name for the user's name
    .match({ ProfileID: profileId }); // Column name for the user's ID

  if (error) {
    Alert.alert("Update Error", error.message);
    return null;
  }
  return data;
};
