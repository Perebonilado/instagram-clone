
export const joinString = (username: string) => {
    let arr = []
    let newString:string = ''
    for (let i = 0; i < username?.length; i++) {

        if(username[i] !== ' ') arr.push(username[i])
        
    }
    
    if(arr.length){
        for (let i = 0; i < arr.length; i++) {
            newString += arr[i]  
        }
    }

    return newString.toLowerCase()
}