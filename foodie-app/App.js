import StoreContextProvider from "./src/context/StoreContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <StoreContextProvider>
      <AppNavigator />
    </StoreContextProvider>
  );
}
