import * as fs from "node:fs";
import DATAFormat from "../DataFormat";
class Data{
    json:DATAFormat[]
    path:string;
    constructor(path:string){
        this.json = []
        this.path = path
        try{
            fs.readFile(path,'utf8',(err,data)=>{
                this.json = JSON.parse(data);
            })

        }catch (error){
            console.log("you have a error and the error is"+error);
        }
    }
    getDATA(){
        return this.json;
    }
    deleteData(index:number){
this.json.splice(index,1);
try{
    fs.writeFile(this.path ,JSON.stringify(this.json , null , 2),(err)=>{})
}catch (error){
    console.log(error);
}

    }
    postData(data:DATAFormat){
        this.json.push(data);
        fs.writeFile(this.path,JSON.stringify(this.json , null , 2),(err)=>{})
    }
    PATCHData(index:number,data:DATAFormat){
        this.json[index] = data;
        fs.writeFile(
            this.path,JSON.stringify(this.json , null , 2),(err)=>{})
    }
}
export default  Data;