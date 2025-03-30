import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center p-4 bg-gray-100">
      <View className="bg-white p-6 rounded-xl shadow-lg">
        <Text className="text-2xl font-bold text-blue-600 mb-4">
          Welcome, Ravindrajangir007!
        </Text>
        <Text className="text-gray-600 text-lg">Current Time (UTC):</Text>
        <Text className="text-gray-800 text-xl font-medium">{currentTime}</Text>
      </View>
    </View>
  );
}

// Backup styles in case Tailwind fails
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    color: "#4b5563",
  },
  time: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1f2937",
  },
});
