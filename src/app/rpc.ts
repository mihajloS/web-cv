export class Rpc {

    method:String
    params:any
    id:number
    result: any
    error: object

    constructor(method, params, id, result, error) {
        this.method = method;
        this.params = params;
        this.id = id;
        this.result = result;
        this.error = error;
    }
}
