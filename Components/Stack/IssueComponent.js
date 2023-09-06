import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import {
  ToStringDateFormatter,
  capitalizeFirstLetter,
  getStatusStyle,
} from '../config';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const IssueDetailsComponent = ({issue}) => {
  const {created_on, description, title, status_name, resolved_on} = issue;

  const getColorForStatus = resolved_on => {
    switch (status_name) {
      case "resolved":
        return 'green'; // Change 'red' to the desired color for status_id 1
      case "pending":
        return 'orange'; // Change 'green' to the desired color for status_id 2
      // Change 'gray' to the default color when status_id is not matched
    }
  };
  const containerColor = getColorForStatus(resolved_on);
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>{capitalizeFirstLetter(title)}</Text>
      <View style={[styles.status, { backgroundColor: containerColor }]}>
        <Text style={styles.statusText}>
          {resolved_on === null ? 'Pending' : 'Resolved'}
        </Text>
      </View>
    </View>
    <Text style={styles.description}>{description}</Text>
    {resolved_on && (
      <Text style={styles.resolvedOn}>
        Resolved on: {ToStringDateFormatter(resolved_on)}
      </Text>
    )}
    <Text style={styles.createdOn}>
      Created on: {ToStringDateFormatter(created_on)}
    </Text>
  </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    width:width-10,
    color:'black',
    backgroundColor:"white"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
    color:'black'
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    
    
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color:'black',
    fontWeight:400,

    
  },
  resolvedOn: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    color:'black'
  },
  createdOn: {
    fontSize: 14,
    color: 'black',
    fontWeight:400,
    
  },
});


export default IssueDetailsComponent;
