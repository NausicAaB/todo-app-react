import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ab63db', 
        },
        headerTitleStyle: {
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: '✮࣪⋆˙ ToDo App  ˙࣪⋆✮',
        }} 
      />
    </Stack>
  );
}