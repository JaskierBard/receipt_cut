import { Text, TouchableOpacity } from "react-native";
import { buttonStyles } from "../../../styles/buttons";

export interface Props {
  text: string;
  buttonAction: () => void;
}

export const SimpleButton = ({ text, buttonAction }: Props) => (
  <TouchableOpacity style={buttonStyles.touchable} onPress={buttonAction}>
    <Text style={buttonStyles.text}>{text}</Text>
  </TouchableOpacity>
);
