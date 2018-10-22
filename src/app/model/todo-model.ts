// export class TodoModel {
//   //two data types accepted in the model due to people should be able to put undefined and string in.
//   title:string | null;
//   category:any | null;
//   isChecked:boolean;
// }


export interface Task {
    id: string;
    description: string;
    category: string;
    check: boolean;
}
