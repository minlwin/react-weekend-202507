/**
 * Greet Function Using Optional Parameter
 * @param name Your Name
 * @param age Your Age
 * @returns Greeting Message
 */
export function greet(name:string, age?:number):string {
    if(age) {
        return `Hello! I am ${name}, and ${age} years old.`
    }

    return `Hello! I am ${name}.`
} 

/**
 * Function using default parameter
 * 
 * @param message Message
 * @param times Size of Array
 * @returns Message Array
 */
export function getMessages(message:string, times = 1): string[] {
    const result:string[] = []
    
    for(let i = 0; i < times; i ++) {
        result.push(message)
    }
    
    return result
}

/**
 * Using Rest Parameter
 * 
 * @param name Data Name
 * @param values Number Array
 * @returns Record of Name and Sum Result
 */
export function sum(name: string, ...values:number[]):[string, number] {
    if(!values.length) {
        return [name, 0]
    }
    // 1, 2, 3, 4
    // 0 : (0, 1) => 0 + 1 => 1
    // 1 : (1, 2) => 1 + 2 => 3
    // 2 : (3, 3) => 3 + 3 => 6
    // 3 : (6, 4) => 6 + 4 => 10
    return [name, values.reduce((a, b) => a + b)]
}