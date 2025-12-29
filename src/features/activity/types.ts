export interface Activity{
    id:string;
    message:string;
    timestamp:number;

}

export interface ActivityState {
 activities:Activity[];

}
