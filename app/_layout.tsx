import { AuthenticationContextProvider } from "@/contexts/AuthenticationContext";
import { TodosContextProvider } from "@/contexts/TodosContext";
import { useAuth } from "@/hook/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function LayoutPrincipal() {
  const { isAuthenticated, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const publicPages = ["home", "create, login"];
  const isPublicPage = publicPages.includes(segments[0]);

  useEffect(() => {
    if (isAuthenticated === undefined) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)");
    }

    if (!isAuthenticated && !isPublicPage) {
      router.replace("/home");
    }
  }, [isAuthenticated]);

  if (isAuthenticated === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ab63db",
        },
        headerTitle: "✮࣪⋆˙ ToDo App of " + user?.firstName +" ˙࣪⋆✮",
        headerTitleAlign: "center",
      }}
    ></Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthenticationContextProvider>
      <TodosContextProvider>
        <LayoutPrincipal />
      </TodosContextProvider>
    </AuthenticationContextProvider>
  );
}
