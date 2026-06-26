import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const LayoutContext = createContext()

//component voor om de hele app mee zodat de hele app dit gebruikt
export const LayoutProvider = ({children}) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        loadLayout()
    }, [])

    //ophalen gegevens
    async function loadLayout() {
        try {
            const savedLayout = await AsyncStorage.getItem('@user_layout')

            if(savedLayout !== null){
                setIsDarkMode(savedLayout === 'darkmode')
            }

        } catch(error) {
            console.error("Er is een fout opgetreden", error);
        }
    }

    //veranderen van layout
   const changeLayout = async (value) => {
    try{ 
        setIsDarkMode(value);
        await AsyncStorage.setItem('@user_layout', value ? 'darkmode' : 'lightmode')

    } catch (error) {
         console.error("Er is een fout opgetreden", error);
    }
   }

   return (
    <LayoutContext.Provider value={{isDarkMode, changeLayout}}>
        {children}
    </LayoutContext.Provider>
   )
}

//hook om context te gebruiken
export const useLayout = () => useContext(LayoutContext)