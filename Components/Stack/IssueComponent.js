import React from 'react';
import { View, Text } from 'react-native';
import { ToStringDateFormatter,capitalizeFirstLetter,getStatusStyle } from '../config';

const IssueDetailsComponent = ({ issue }) => {
  const { created_on, description, title, status_name, resolved_on } = issue;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{capitalizeFirstLetter(title)}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={[styles.status, getStatusStyle(styles,status_name)]}>

      <Text style={{
        color:'white',
        fontWeight:500,
      }}>{status_name==="Pending at admin"?"Pending":"Resolved"}</Text>
      </View>
      {resolved_on && <Text style={styles.resolvedOn}>Resolved on: {ToStringDateFormatter(resolved_on)}</Text>}
      <Text style={styles.createdOn}>Created on: {ToStringDateFormatter(created_on)}</Text>
    </View>
  );
};

const styles = {
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  status: {
   width:80,
   height:25,
   borderRadius:4,
  
   marginBottom:3,
   display:"flex",
   justifyContent:"center",
   alignItems:"center"
  
   

  },
  resolvedOn: {
   
    marginBottom: 8,
    color:'black'
  },
  createdOn: {
    color: 'black',
  },
  pending: {
backgroundColor:"orange",

  },
  resolved: {
   backgroundColor:"#50C878",
  
   
  },
};

export default IssueDetailsComponent;
