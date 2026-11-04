import { Text, View, StyleSheet } from "react-native";
import { getPasswordRequirements } from "../model";

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => (
  <View style={styles.container} accessibilityLiveRegion="polite">
    {getPasswordRequirements(password).map(({ key, label, met }) => (
      <Text key={key} style={[styles.requirement, met ? styles.met : styles.pending]}>
        {met ? "✓" : "○"} {label}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { gap:4, marginTop:-8 },
  requirement: { fontSize:12 },
  met: { color:"#059669" },
  pending: { color:"#64748B" },
});
