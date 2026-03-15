export type auditsData = {
affectedTable: string,
actionType: 'INSERT' | 'UPDATE' | 'DELETE' | 'CREATE',
idUser: number,
previousValue?: any,
actuallyValue?: any,
};