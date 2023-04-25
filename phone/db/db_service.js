import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";


export async function openDatabase() {

    if (!(await 
        FileSystem.getInfoAsync(FileSystem.documentDirectory + 
        "SQLite")).exists
       ) 
           {
               await FileSystem.makeDirectoryAsync(
               FileSystem.documentDirectory + "SQLite" );
           }

    if (!(await 
        FileSystem.getInfoAsync(FileSystem.documentDirectory 
        +"SQLite/drugs.db")).exists
       )
        {
            await FileSystem.downloadAsync(
            Asset.fromModule(require("./assets/drugs.db"))
            .uri,
            FileSystem.documentDirectory + 
            "SQLite/drugs.db" );
        }

    return SQLite.openDatabase("drugs.db");
}