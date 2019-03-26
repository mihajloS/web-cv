export class Rpc {

    private static RESULT_METHOD = 'result';
    private static ERROR_METHOD = 'error';

    public method:string
    public params:any
    public id:number

    constructor({method, params, id}) {
        this.method = method;
        this.params = params;
        this.id = id;
    }

    get data():any {
        return this.params;
    }

    public isNotification():boolean {
        if (this.method === Rpc.RESULT_METHOD ||
            this.method === Rpc.ERROR_METHOD)
            return false;
        return true;
    }

    public isError():boolean {
        if (this.method === Rpc.ERROR_METHOD)
            return true;
        return false;
    }

    public isResult():boolean {
        if (this.method === Rpc.RESULT_METHOD)
            return true;
        return false;
    }
}
