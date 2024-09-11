const createErrorObject = (errorArray: {field: string; message: string;}[]) =>{
        const newErrorState = errorArray.reduce((acc: { [key: string]: string | undefined }, curr: { field: string; message: string }) => {
          acc[curr.field] = curr.message;
          return acc;
        }, { email: undefined, password: undefined });

        return newErrorState;
}

export {createErrorObject}