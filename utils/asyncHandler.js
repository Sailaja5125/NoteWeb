const asynchandler = (func)=>{
    return (req , res , next)=>{
        Promise.resolve(func(req,res,next)).catch((err)=>{next(err)})
    }
}
// function takes a function which returns a promise that is resolved in asynchandlerfunction
export default asynchandler