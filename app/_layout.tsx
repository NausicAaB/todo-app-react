import { AuthenticationContextProvider } from "@/contexts/AuthenticationContext";
import { useAuth } from "@/hook/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function LayoutPrincipal() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const publicPages = ["login", "create"];
  const isPublicPage = publicPages.includes(segments[0]);


  useEffect(() => {
    if (isAuthenticated === undefined) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && !inAuthGroup ) {
      router.replace("/(auth)");
    }

    if (!isAuthenticated && !isPublicPage) {
      router.replace("/login");
    }
  }, [isAuthenticated, isPublicPage, router, segments]);



  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ab63db",
        },
        headerTitle: "✮࣪⋆˙ ToDo App  ˙࣪⋆✮",
        headerTitleAlign: "center",
      }}
    >
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthenticationContextProvider>
      <LayoutPrincipal />
    </AuthenticationContextProvider>
  );
}
