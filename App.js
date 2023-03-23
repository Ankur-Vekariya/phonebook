import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

// type ItemProps = {title: string};

const Item = (item) => (
  <View style={styles.item}>
    <TouchableOpacity>
      <Text style={{ fontSize: 20 }}>{item.title.name}</Text>
      <Text style={{ fontSize: 20 }}>
        {item.title.phoneNumbers ? item.title.phoneNumbers[0].number : "Not"}
      </Text>
    </TouchableOpacity>
  </View>
);
export default function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  console.log(contacts);

  return (
    <>
      <View style={{ display: "flex", flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{"Name"}</Text>
            <Text style={{ fontSize: 20 }}>"Profile"</Text>
          </TouchableOpacity>
        </View>
        <View>
          <SafeAreaView>
            <FlatList
              data={contacts}
              renderItem={({ item }) => <Item title={item} />}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#3C4856",
    borderWidth: 2,
    // top: "5%",
    backgroundColor: "#A0ACBD",
    padding: 8,
    marginVertical: 30,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  item: {
    borderColor: "#2471AB",
    borderWidth: 2,
    top: "50%",
    backgroundColor: "#D8F3FF",
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
