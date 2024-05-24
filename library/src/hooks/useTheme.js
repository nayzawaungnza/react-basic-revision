import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {
    let contexts = useContext(ThemeContext);
    if (contexts === 'underfined') {
        new Error('Theme context should be only used in Theme Context Provider.')
    }
    return contexts;
}