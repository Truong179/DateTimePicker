import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker"
export default function App() {
  const [dayofbirth, setdayofbirth] = useState("")
  const [date, setdate] = useState(new Date());
  const [showPicker, setshowPicker] = useState(false)
  const toggleDatePiker = () => {
    setshowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setdate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatePiker();
        setdayofbirth(formatDate(currentDate));
      }
    } else {
      toggleDatePiker();
    }
  };
  const confirmIOSDate = () => {
    setdayofbirth(formatDate(date));
    toggleDatePiker();

  }
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}/${month}/${year}`
  }
  return (
    <View style={styles.container}>
      <Text>Date of birthday</Text>
      {
        showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            style={styles.datePiker}
          />
        )}
      {showPicker && Platform.OS === "ios" && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={{ backgroundColor: 'red', borderRadius: 10, padding: 10 }}
            onPress={toggleDatePiker}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: '#', borderRadius: 10, padding: 10 }}
            onPress={confirmIOSDate}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}


      {
        !showPicker && (
          <Pressable
            onPress={toggleDatePiker}
          >
            <TextInput
              placeholder='17/9/2003'
              style={{ width: 200, borderColor: "black", borderWidth: 1, padding: 10, borderRadius: 10 }}
              value={dayofbirth}
              onChangeText={setdayofbirth}
              editable={false}
              onPressIn={toggleDatePiker}

            />
          </Pressable>
        )
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePiker: {
    height: 140,
    marginTop: 10

  }
});
