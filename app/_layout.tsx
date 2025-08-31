import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ab63db', 
        }
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: '✮࣪⋆˙ ToDo App  ˙࣪⋆✮',
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
        }}
      />
    </Stack>
  );
}