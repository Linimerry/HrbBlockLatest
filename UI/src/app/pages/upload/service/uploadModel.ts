export class UploadDetails{
    constructor(
        public Id:number,
        public ToolName:string,
        public ToolDescription:string,
        public ContactTo:string,
        public link:string,
        public XID:string,
        public file:FormData ,
        public IsApproved :Number         
    ){
    }
}
