export class ErrorHandler {

    static jsonSyntxError(err: any, req: any, res: any, next: any) {

        if ((err as any) instanceof SyntaxError && err.status === 400) { //We use again as any to prevent the IDE from flagging an error

            //If JSON Syntax are bad, we response with status 400 and personalized message
            res.status(400).json({ message: 'Sintaxis de JSON invalida' });

            return
        }

        //But JSON are ok continue to the next error, we do this because express have internal error handler
        //And express can receive other errors
        next(err)
    };
}