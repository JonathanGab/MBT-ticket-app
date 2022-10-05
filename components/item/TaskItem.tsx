import { View, Text,} from "react-native";
import { stylesTaskItem } from "../style.js";

export const TaskItem = ({ id ,title, description, priority, difficulty, status }: any) => (
  <View style={stylesTaskItem.item}>
    <Text style={stylesTaskItem.title}>{title}</Text>
    <View style={stylesTaskItem.containerRow}>
      <Text style={stylesTaskItem.priority}>Priority : {priority}</Text>
      <Text style={stylesTaskItem.difficulty}>Difficulty :{difficulty}</Text>
    </View>
    <Text style={stylesTaskItem.status}>Status : {status}</Text>
    <Text style={stylesTaskItem.button}>More...</Text>
  </View>
);